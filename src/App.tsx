import { useEffect, useRef, useState} from 'react'
import { Loader } from '@googlemaps/js-api-loader'

import ProgressCar from './components/progressCar'

type Position = {
  lat: number
  lng: number
}

type RouteInfo = {
  distance: string;
  duration: string;
  showPopup: boolean;
}

function App() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [origin, setOrigin] = useState<Position | null>(null)
  const [destination, setDestination] = useState<Position | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null)
  const [markers, setMarkers] = useState<Map<string, google.maps.marker.AdvancedMarkerElement>>(new Map())
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null)
  const [showProgressBar, setShowProgressBar] = useState(false)

  useEffect(() => {
    if (!mapRef.current) return

    const initMap = async () => {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["places"]
      })

      const mapOptions = {
        center: {
          lat: 35.6812,
          lng: 139.7671
        },
        zoom: 13,
        mapId: "map"
      };

      try {
        const { Map } = await loader.importLibrary("maps") as google.maps.MapsLibrary;
        if (!mapRef.current) return;

        const newMap = new Map(mapRef.current, mapOptions);
        setMap(newMap);

        if (!navigator.geolocation) {
          console.log("Geolocation is not supported by this browser.");
          return;
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const userLocation: Position = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            // demoデータ
            // const userLocation: Position = {
            //   lat: 35.6812,
            //   lng: 139.7671
            // }
            setOrigin(userLocation)

            newMap.setCenter(userLocation)

            // マーカーのライブラリをインポート
            const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary

            const marker = new AdvancedMarkerElement({
              map: newMap,
              position: userLocation,
              title: 'origin',
            })
            setMarkers(markers.set("origin", marker))
          }
        )

        // クリックイベントを追加
        newMap.addListener('click', async (event: google.maps.MapMouseEvent) => {
          if (!event.latLng) return
          
          const clickPosition: Position = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          }
          setDestination(clickPosition)
        })

      } catch (error) {
        console.error("マップの読み込み中にエラーが発生しました", error);
      }
    }

    initMap()
  }, [mapRef, markers])

  // 現在地と目的地の入力を監視し、ルート情報を取得する
  useEffect(() => {
    if (!map) return
    if (!origin || !destination) return

    const fetchRouteInfo = async () => {
      try {
        const { DirectionsService, DirectionsRenderer } = await google.maps.importLibrary("routes") as google.maps.RoutesLibrary;
        const directionsService = new DirectionsService();
        const directionsRenderer = new DirectionsRenderer();
        
        directionsRenderer.setMap(map);
        setDirectionsRenderer(directionsRenderer)
        
        directionsService.route(
          {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsRenderer.setDirections(result);
              
              // ルート表示中はマーカーを非表示にする
              const marker = markers.get("origin")
              if (marker) {
                marker.map = null
              }

              const route = result?.routes[0];
              if (!route) return
              const leg = route.legs[0];
              
              const distance = leg.distance?.text;
              const duration = leg.duration?.text;
              
              // ルート情報をstateに保存
              setRouteInfo({
                distance: distance || '',
                duration: duration || '',
                showPopup: true
              });
            } else {
              console.error(`ルート検索に失敗しました: ${status}`);
            }
          }
        );
      } catch (error) {
        console.error("ルート情報の取得中にエラーが発生しました", error)
      }
    }

    fetchRouteInfo()
  }, [origin, destination, map, markers])

  // ポップアップを閉じる関数
  const handleClosePopup = async () => {
    setRouteInfo(prev => prev ? { ...prev, showPopup: false } : null);
    // マーカーを表示する
    const marker = markers.get("origin")
    if (marker) {
      marker.map = map
    }

    if (directionsRenderer) {
      directionsRenderer.setMap(null)
    }
  };

  const handleShowProgressBar = () => {
    if (mapRef.current) {
      mapRef.current.style.display = 'none';
    }

    handleClosePopup()
    setShowProgressBar(true)
  }

  return (
    <div className="relative h-screen w-full bg-gray-100">
      {/* progresBarが表示されている間はmapは非表示 */}
      {showProgressBar ? (
        null
      ) : (
        <div ref={mapRef} className="h-full w-full" />
      )}

      {routeInfo?.showPopup && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-72 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex justify-between items-center bg-blue-600 text-white p-3">
            <h3 className="font-bold text-lg">ルート情報</h3>
            <button 
              onClick={handleClosePopup}
              className="text-white hover:bg-blue-700 rounded-full h-8 w-8 flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </div>
          
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 p-2 bg-gray-50 rounded-lg">
              <div className="text-gray-600 font-medium">距離</div>
              <div className="text-blue-700 font-bold text-right">{routeInfo.distance}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 p-2 bg-gray-50 rounded-lg">
              <div className="text-gray-600 font-medium">時間</div>
              <div className="text-blue-700 font-bold text-right">{routeInfo.duration}</div>
            </div>
          </div>
          
          <div className="flex justify-between p-4 bg-gray-50 border-t border-gray-200">
            <button 
              onClick={handleShowProgressBar}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
            >
              スタート
            </button>
            <button 
              onClick={handleClosePopup}
              className="border border-gray-300 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-full transition-colors"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
      
      {showProgressBar && (
        <div className="h-full w-full">
          <ProgressCar
            distance={routeInfo?.distance || '0km'}
            duration={routeInfo?.duration || '0分'}
          />
        </div>
      )}
    </div>
  );
}

export default App

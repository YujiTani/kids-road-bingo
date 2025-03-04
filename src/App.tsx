import { useEffect, useRef, useState} from 'react'
import { Loader } from '@googlemaps/js-api-loader'

import ProgressCar from './components/progressCar'
import * as styles from './App.css'

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
    <>
    {/* progresBarが表示されている間はmapは非表示 */}
    {showProgressBar ? (
      null
    ) : (
      <div ref={mapRef} className={styles.MapContainer} />
    )}

      {routeInfo?.showPopup && (
        <div className={styles.RouteInfoPopup}>
          <div className={styles.PopupHeader}>
            <h3 className={styles.PopupTitle}>ルート情報</h3>
            <button 
              onClick={handleClosePopup}
              className={styles.CloseButton}
            >
              ×
            </button>
          </div>
          
          <div className={styles.InfoContainer}>
            <div>
              <div className={styles.InfoLabel}>距離</div>
              <div className={styles.InfoValue}>{routeInfo.distance}</div>
            </div>
            <div>
              <div className={styles.InfoLabel}>所要時間</div>
              <div className={styles.InfoValue}>{routeInfo.duration}</div>
            </div>
          </div>

          <div className={styles.ButtonContainer}>
            <button 
              onClick={handleShowProgressBar}
              className={styles.ConfirmButton}
            >
              このルートにする
            </button>
            <button 
              onClick={handleClosePopup}
              className={styles.CancelButton}
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
      {routeInfo?.distance && routeInfo?.duration && showProgressBar && (
        <ProgressCar distance={routeInfo.distance} duration={routeInfo.duration} />
      )}
    </>
  );
}

export default App

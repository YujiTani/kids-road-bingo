import { useEffect, useRef, useState} from 'react'
import { Loader } from '@googlemaps/js-api-loader'

import './App.css'

type Position = {
  lat: number
  lng: number
}

function App() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [origin, setOrigin] = useState<Position | null>(null)
  const [destination, setDestination] = useState<Position | null>(null)

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

        const map = new Map(mapRef.current, mapOptions);

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
            setOrigin(userLocation)

            map.setCenter(userLocation)

            // マーカーのライブラリをインポート
            const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary

            new AdvancedMarkerElement({
              map: map,
              position: userLocation,
            })
          }
        )

        // クリックイベントを追加
        map.addListener('click', async (event: google.maps.MapMouseEvent) => {
          const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary

          if (!event.latLng) return

          const clickPosition: Position = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          }
          setDestination(clickPosition)
          new AdvancedMarkerElement({
            map: map,
            position: clickPosition,
            title: "目的地"
          })
        })

      } catch (error) {
        console.error("マップの読み込み中にエラーが発生しました", error);
      }
    }

    initMap()
  }, [mapRef])

  // 現在地と目的地の入力を監視し、ルート情報を取得する
  useEffect(() => {
    if (!origin || !destination) {
      console.log("現在地もしくは目的地が設定されていません")
      return
    }

    const fetchRouteInfo = async () => {
      try {
        const { DirectionsService } = await google.maps.importLibrary("routes") as google.maps.RoutesLibrary;

        const directionsService = new DirectionsService();
        
        directionsService.route(
          {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              console.log(result);
            } else {
              console.error(`ルート検索に失敗しました: ${status}`);
            }
          }
        );
      } catch (error) {
        console.error("ルート情報の取得中にエラーが発生しました", error)
      }
    }

    if (origin && destination) {
      fetchRouteInfo()
    }
  }, [origin, destination])

  return <div ref={mapRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />;
}

export default App

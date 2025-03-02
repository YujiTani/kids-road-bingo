import { useEffect, useRef} from 'react'
import { Loader } from '@googlemaps/js-api-loader'

import './App.css'

function App() {
  const mapRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!mapRef.current) return

    const initMap = async () => {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY,
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
            const  userLocation ={
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }

            map.setCenter(userLocation)

                  // マーカーのライブラリをインポート
            const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary

            new AdvancedMarkerElement({
              map: map,
              position: userLocation,
              title: "Your Location"
            })

          }
        )

        //   const position = navigator.geolocation.getCurrentPosition
        //   console.log("c=========🚀 ~ initMap ~ position:", position)
        // }

      } catch (error) {
        console.error("マップの読み込み中にエラーが発生しました", error);
      }
    }

    initMap()
  }, [mapRef])

  return <div ref={mapRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />;
}

export default App

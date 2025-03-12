import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"

// import ProgressCar from './components/progressCar'
import RouteInfo from "./components/routeInfo"
// import useRenderRoute from './hooks/useRendarRoute'

export type LatLngLiteral = {
  lat: google.maps.LatLngLiteral["lat"]
  lng: google.maps.LatLngLiteral["lng"]
}

export type RouteInfo = {
  distance: string
  duration: string
  showPopup: boolean
}

function App() {
  const mapRef = useRef<HTMLDivElement>(null)
  // const [origin, setOrigin] = useState<LatLngLiteral | null>(null)
  // const [destination, setDestination] = useState<LatLngLiteral | null>(null)
  // const [map, setMap] = useState<google.maps.Map | null>(null)
  // const [markers, setMarkers] = useState<Map<string, google.maps.marker.AdvancedMarkerElement>>(new Map())
  // const [showProgressBar, setShowProgressBar] = useState(false)

  // const { routeInfo, clearRoute } = useRenderRoute({
  //   map,
  //   origin,
  //   destination,
  //   markers
  // })
  
  const loader = useMemo(() => new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: "weekly",
    libraries: ["places"],
  }), [])

  const mapOptions = useMemo(() => ({
    center: {
      lat: 35.6812,
      lng: 139.7671,
    },
    zoom: 13,
      mapId: "map",
    }), [])

  const initMap = useCallback(async () => {
    try {
      if (!mapRef.current) return
      
      const { Map: GoogleMap } = (await loader.importLibrary("maps")) as google.maps.MapsLibrary
      new GoogleMap(mapRef.current, mapOptions)
    } catch (error) {
      console.error("マップの読み込み中にエラーが発生しました", error)
    }
  }, [loader, mapOptions])
  
  useEffect(() => {
    initMap()
  }, [initMap])
  
  // const getCurrentPosition = async () => {
  //   if (!navigator.geolocation) {
  //     console.log("Geolocation is not supported by this browser.")
  //     return
  //   }
  //   navigator.geolocation.getCurrentPosition(
  //     async (position) => {
  //       const userLocation: LatLngLiteral = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       }
  //       console.log(userLocation)
  //     },
  //     (error) => {
  //       console.error("Geolocation error:", error)
  //     }
  //   )
  // }
  // getCurrentPosition()

  // useEffect(() => {
  //       navigator.geolocation.getCurrentPosition(
  //         async (position) => {
  //           const userLocation: LatLngLiteral = {
  //             lat: position.coords.latitude,
  //             lng: position.coords.longitude
  //           }
  //           // demoデータ
  //           // const userLocation: Position = {
  //           //   lat: 35.6812,
  //           //   lng: 139.7671
  //           // }
  //           setOrigin(userLocation)

  //           newMap.setCenter(userLocation)

  //           // マーカーのライブラリをインポート
  //           const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary

  //           const marker = new AdvancedMarkerElement({
  //             map: newMap,
  //             position: userLocation,
  //             title: 'origin',
  //           })
  //           setMarkers(markers.set("origin", marker))
  //         }
  //       )

  //       // クリックイベントを追加
  //       newMap.addListener('click', async (event: google.maps.MapMouseEvent) => {
  //         if (!event.latLng) return

  //         const clickPosition: LatLngLiteral = {
  //           lat: event.latLng.lat(),
  //           lng: event.latLng.lng(),
  //         }
  //         setDestination(clickPosition)
  //       })

  //     } catch (error) {
  //       console.error("マップの読み込み中にエラーが発生しました", error);
  //     }
  //   }

  //   initMap()
  // }, [mapRef, markers])

  // const handleClosePopup = async () => {
  //   clearRoute();
  //   const marker = markers.get("origin")
  //   if (marker) {
  //     marker.map = map
  //   }
  // };

  // const handleShowProgressBar = () => {
  //   if (mapRef.current) {
  //     mapRef.current.style.display = 'none';
  //   }

  //   handleClosePopup()
  //   setShowProgressBar(true)
  // }

  return (
    <div className="relative h-screen w-full bg-gray-100">
      <div ref={mapRef} className="h-full w-full" />
      {/* {showProgressBar && ( */}
      {/* <div className="h-full w-full">
          <ProgressCar
            distance={routeInfo?.distance || '0km'}
            duration={routeInfo?.duration || '0分'}
          />
        </div> */}
      {/* )} */}

      {/* {routeInfo?.showPopup && ( */}
      {/* <RouteInfo 
          handleClosePopup={handleClosePopup}
          handleShowProgressBar={handleShowProgressBar}
          distance={routeInfo?.distance || '0km'}
          duration={routeInfo?.duration || '0分'}
        /> */}
      {/* )} */}
    </div>
  )
}

export default App

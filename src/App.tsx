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
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [origin, setOrigin] = useState<LatLngLiteral | null>(null)
  const [markers, setMarkers] = useState<Map<string, google.maps.marker.AdvancedMarkerElement>>(new Map())
  const [destination, setDestination] = useState<LatLngLiteral | null>(null)
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

  // マップを初期化
  const initMap = useCallback(async () => {
    try {
      if (!mapRef.current) return
      
      const { Map: GoogleMap } = (await loader.importLibrary("maps")) as google.maps.MapsLibrary
      const newMap = new GoogleMap(mapRef.current, mapOptions)
      setMap(newMap)
    } catch (error) {
      console.error("マップの読み込み中にエラーが発生しました", error)
    }
  }, [loader, mapOptions])
  
  // ユーザーの現在地を取得
  const getCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.")
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation: LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        setOrigin(userLocation)
      },
      (error) => {
        console.error("Geolocation error:", error)
      }
    )
  }, [])

// マーカーを描画する
const renderMarker = useCallback( async () => {
  const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary
  return new AdvancedMarkerElement({
    map,
    position: origin,
    title: 'originMaker',
  })
}, [map, origin])

useEffect(() => {
  initMap()
  getCurrentPosition()
}, [initMap, getCurrentPosition])

// ユーザーの現在地をマップに表示
const setupOriginMarker = useCallback(async () => {
  if (!map || !origin) {
    return
  }
  
  map.setCenter(origin)
  const marker = await renderMarker()
  if (marker) {
    setMarkers(markers.set("originMarker", marker))
  }
}, [map, origin, renderMarker, markers])
setupOriginMarker()

// Mapにクリックイベントを追加
const addMapClickEvent = useCallback(() => {
  if (!map) return
  
  map.addListener('click', async (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return
  
    const clickPosition: LatLngLiteral = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    }
    setDestination(clickPosition)
  })
}, [map])
addMapClickEvent()

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

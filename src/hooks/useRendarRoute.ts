import { useEffect, useState } from "react"
import type { LatLngLiteral } from "@/App"

export type RouteInfo = {
  distance: string
  duration: string
  showPopup: boolean
}

interface UseRenderRouteProps {
  map: google.maps.Map | null
  origin: LatLngLiteral | null
  destination: LatLngLiteral | null
  markers: Map<string, google.maps.marker.AdvancedMarkerElement>
}

function useRenderRoute({ map, origin, destination, markers }: UseRenderRouteProps) {
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null)
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null)

  useEffect(() => {
    if (!map || !origin || !destination) return

    const renderRoute = async () => {
      try {
        const { DirectionsService, DirectionsRenderer } = (await google.maps.importLibrary(
          "routes",
        )) as google.maps.RoutesLibrary
        const directionsService = new DirectionsService()
        const directionsRenderer = new DirectionsRenderer()

        directionsRenderer.setMap(map)
        setDirectionsRenderer(directionsRenderer)

        directionsService.route(
          {
            origin,
            destination,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsRenderer.setDirections(result)

              // マーカーを非表示
              const marker = markers.get("origin")
              if (marker) {
                marker.map = null
              }

              const route = result?.routes[0]
              if (!route) return
              const leg = route.legs[0]

              setRouteInfo({
                distance: leg.distance?.text || "",
                duration: leg.duration?.text || "",
                showPopup: true,
              })
            } else {
              console.error(`ルート検索に失敗しました: ${status}`)
            }
          },
        )
      } catch (error) {
        console.error("ルート情報の取得中にエラーが発生しました", error)
      }
    }

    renderRoute()
  }, [map, origin, destination, markers])

  const clearRoute = () => {
    if (directionsRenderer) {
      directionsRenderer.setMap(null)
    }
    setRouteInfo((prev) => (prev ? { ...prev, showPopup: false } : null))
  }

  return {
    routeInfo,
    clearRoute,
  }
}

export default useRenderRoute

import { Loader } from "@googlemaps/js-api-loader";
import { css } from "@/styled-system/css";
import { useEffect, useRef, useState } from "react";

import ProgressCar from "./components/progressCar";

type Position = {
  lat: number;
  lng: number;
};

type RouteInfo = {
  distance: string;
  duration: string;
  showPopup: boolean;
};

function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState<Position | null>(null);
  const [destination, setDestination] = useState<Position | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [markers, setMarkers] = useState<
    Map<string, google.maps.marker.AdvancedMarkerElement>
  >(new Map());
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);
  const [showProgressBar, setShowProgressBar] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = async () => {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["places"],
      });

      const mapOptions = {
        center: {
          lat: 35.6812,
          lng: 139.7671,
        },
        zoom: 13,
        mapId: "map",
      };

      try {
        const { Map } = (await loader.importLibrary(
          "maps",
        )) as google.maps.MapsLibrary;
        if (!mapRef.current) return;

        const newMap = new Map(mapRef.current, mapOptions);
        setMap(newMap);

        if (!navigator.geolocation) {
          console.log("Geolocation is not supported by this browser.");
          return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
          const userLocation: Position = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // demoデータ
          // const userLocation: Position = {
          //   lat: 35.6812,
          //   lng: 139.7671
          // }
          setOrigin(userLocation);

          newMap.setCenter(userLocation);

          // マーカーのライブラリをインポート
          const { AdvancedMarkerElement } = (await google.maps.importLibrary(
            "marker",
          )) as google.maps.MarkerLibrary;

          const marker = new AdvancedMarkerElement({
            map: newMap,
            position: userLocation,
            title: "origin",
          });
          setMarkers(markers.set("origin", marker));
        });

        // クリックイベントを追加
        newMap.addListener(
          "click",
          async (event: google.maps.MapMouseEvent) => {
            if (!event.latLng) return;

            const clickPosition: Position = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            };
            setDestination(clickPosition);
          },
        );
      } catch (error) {
        console.error("マップの読み込み中にエラーが発生しました", error);
      }
    };

    initMap();
  }, [mapRef, markers]);

  // 現在地と目的地の入力を監視し、ルート情報を取得する
  useEffect(() => {
    if (!map) return;
    if (!origin || !destination) return;

    const fetchRouteInfo = async () => {
      try {
        const { DirectionsService, DirectionsRenderer } =
          (await google.maps.importLibrary(
            "routes",
          )) as google.maps.RoutesLibrary;
        const directionsService = new DirectionsService();
        const directionsRenderer = new DirectionsRenderer();

        directionsRenderer.setMap(map);
        setDirectionsRenderer(directionsRenderer);

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
              const marker = markers.get("origin");
              if (marker) {
                marker.map = null;
              }

              const route = result?.routes[0];
              if (!route) return;
              const leg = route.legs[0];

              const distance = leg.distance?.text;
              const duration = leg.duration?.text;

              // ルート情報をstateに保存
              setRouteInfo({
                distance: distance || "",
                duration: duration || "",
                showPopup: true,
              });
            } else {
              console.error(`ルート検索に失敗しました: ${status}`);
            }
          },
        );
      } catch (error) {
        console.error("ルート情報の取得中にエラーが発生しました", error);
      }
    };

    fetchRouteInfo();
  }, [origin, destination, map, markers]);

  // ポップアップを閉じる関数
  const handleClosePopup = async () => {
    setRouteInfo((prev) => (prev ? { ...prev, showPopup: false } : null));
    // マーカーを表示する
    const marker = markers.get("origin");
    if (marker) {
      marker.map = map;
    }

    if (directionsRenderer) {
      directionsRenderer.setMap(null);
    }
  };

  const handleShowProgressBar = () => {
    if (mapRef.current) {
      mapRef.current.style.display = "none";
    }

    handleClosePopup();
    setShowProgressBar(true);
  };

  return (
    <main className={styles.main}>
      {showProgressBar ? null : (
        <section ref={mapRef} className={styles.progressBar} />
      )}

      {routeInfo?.showPopup && (
        <dialog open className={styles.routeInfo}>
          <header className={styles.routeInfoHeader}>
            <h3 className={styles.routeTitle}>ルート情報</h3>
            <button
              onClick={handleClosePopup}
              className={styles.closeButton}
              aria-label="閉じる"
            >
              ×
            </button>
          </header>

          <section className={styles.routeInfoContent}>
            <dl className={styles.infoItem}>
              <dt className={styles.infoLabel}>距離</dt>
              <dd className={styles.infoValue}>
                {routeInfo.distance}
              </dd>
            </dl>
            <dl className={styles.infoItem}>
              <dt className={styles.infoLabel}>時間</dt>
              <dd className={styles.infoValue}>
                {routeInfo.duration}
              </dd>
            </dl>
          </section>

          <footer className={styles.routeInfoFooter}>
            <button
              onClick={handleShowProgressBar}
              className={styles.startButton}
            >
              スタート
            </button>
            <button
              onClick={handleClosePopup}
              className={styles.cancelButton}
            >
              キャンセル
            </button>
          </footer>
        </dialog>
      )}

      {showProgressBar && (
        <section className={styles.progressSection}>
          <ProgressCar
            distance={routeInfo?.distance || "0km"}
            duration={routeInfo?.duration || "0分"}
          />
        </section>
      )}
    </main>
  );
}

const styles = {
  main: css({
    position: "relative",
    height: "100vh",
    width: "100%",
    backgroundColor: "var(--colors-gray-50)",
  }),
  progressBar: css({
    height: "100%",
    width: "100%",
  }),
  routeInfo: css({
    position: "absolute",
    bottom: "16px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "90%",
    maxWidth: "400px",
    backgroundColor: "white",
    borderRadius: "1rem",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    border: "none",
    transition: "all 0.3s ease",
  }),
  routeInfoHeader: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "var(--colors-blue-600)",
    color: "white",
    padding: "1rem",
    borderBottom: "1px solid var(--colors-blue-700)",
  }),
  routeTitle: css({
    fontWeight: "700",
    fontSize: "1.25rem",
    letterSpacing: "0.025em",
  }),
  closeButton: css({
    color: "white",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    _hover: { 
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      transform: "scale(1.05)" 
    },
    borderRadius: "9999px",
    height: "2.5rem",
    width: "2.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    border: "none",
    cursor: "pointer",
    fontSize: "1.25rem",
  }),
  routeInfoContent: css({
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  }),
  infoItem: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "var(--colors-gray-50)",
    borderRadius: "0.75rem",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  }),
  infoLabel: css({
    color: "var(--colors-gray-700)",
    fontWeight: "600",
    fontSize: "1rem",
  }),
  infoValue: css({
    color: "var(--colors-blue-700)",
    fontWeight: "700",
    textAlign: "right",
    fontSize: "1.125rem",
  }),
  routeInfoFooter: css({
    display: "flex",
    justifyContent: "space-between",
    padding: "1.25rem",
    backgroundColor: "var(--colors-gray-50)",
    borderTop: "1px solid var(--colors-gray-200)",
  }),
  startButton: css({
    backgroundColor: "var(--colors-blue-600)",
    _hover: { 
      backgroundColor: "var(--colors-blue-700)",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    },
    color: "white",
    fontWeight: "700",
    paddingY: "0.75rem",
    paddingX: "2rem",
    borderRadius: "0.75rem",
    transition: "all 0.2s ease",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  }),
  cancelButton: css({
    border: "1px solid var(--colors-gray-300)",
    _hover: { 
      backgroundColor: "var(--colors-gray-200)",
      transform: "translateY(-2px)" 
    },
    color: "var(--colors-gray-700)",
    fontWeight: "600",
    paddingY: "0.75rem",
    paddingX: "2rem",
    borderRadius: "0.75rem",
    transition: "all 0.2s ease",
    backgroundColor: "white",
    cursor: "pointer",
  }),
  progressSection: css({
    height: "100%",
    width: "100%",
    backgroundColor: "var(--colors-gray-50)",
  }),
};

export default App;

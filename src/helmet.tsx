import { Helmet } from "react-helmet-async"
import { DriveBingoOgp } from "./assets/img"

const HelmetComponent: React.FC = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const currentPath = window.location.pathname
  const fullUrl = `${BASE_URL}${currentPath}`
  const fullImageUrl = DriveBingoOgp.startsWith("http") ? DriveBingoOgp : `${BASE_URL}${DriveBingoOgp}`

  return (
    <Helmet>
      <title>ドライブ・ビンゴ</title>
      <meta name="description" content="ドライブを楽しむビンゴゲームアプリ" />

      {/* OGP設定 */}
      <meta property="og:title" content="ドライブ・ビンゴ" />
      <meta property="og:description" content="ドライブを楽しむビンゴゲームアプリ" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="ドライブ・ビンゴ" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={fullImageUrl} />
    </Helmet>
  )
}

export default HelmetComponent

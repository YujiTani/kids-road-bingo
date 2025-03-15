import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { HelmetProvider } from "react-helmet-async"
import "./global.css"
import App from "./App.tsx"
import HelmetComponent from "./helmet.tsx"

// OGP用のデフォルト設定
const helmetContext = {}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
    <HelmetComponent />
      <App />
    </HelmetProvider>
  </StrictMode>
)

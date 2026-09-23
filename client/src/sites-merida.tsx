import { createRoot } from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary";
import { courseCampaigns } from "./config/courseCampaigns";
import MeridaLanding from "./pages/MeridaLanding";
import "./index.css";

// This isolated Sites entry does not include other campaigns or their API client.
const isMerida = window.location.pathname.replace(/\/$/, "") === courseCampaigns.merida.path;

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    {isMerida ? <MeridaLanding /> : <main>Página no encontrada.</main>}
  </ErrorBoundary>,
);

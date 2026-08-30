import { trpc } from "@/lib/trpc";
import { createRoot } from "react-dom/client";
import App from "./App";
import { scheduleMetaPixel } from "./lib/metaPixel";
import "./index.css";

// El píxel se descarga fuera de la ruta crítica. Si el usuario convierte antes,
// trackMetaLead lo inicializa de inmediato para conservar el evento Lead.
scheduleMetaPixel();

createRoot(document.getElementById("root")!).render(
  <App />
);

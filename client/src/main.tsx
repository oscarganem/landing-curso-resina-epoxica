import { trpc } from "@/lib/trpc";
import { createRoot } from "react-dom/client";
import App from "./App";
import { scheduleMetaPixel } from "./lib/metaPixel";
import "./index.css";

// El píxel se descarga fuera de la ruta crítica y se inicializa una sola vez.
// La página de gracias espera a que la función real esté lista antes de enviar Lead.
scheduleMetaPixel();

createRoot(document.getElementById("root")!).render(
  <App />
);

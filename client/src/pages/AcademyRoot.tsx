import { isAcademyRootHostname } from "@/lib/campaignRoutes";
import Home from "./Home";

export default function AcademyRoot() {
  if (!isAcademyRootHostname(window.location.hostname)) return <Home />;

  return (
    <main className="academy-root academy-root-not-found" aria-labelledby="academy-root-title">
      <img
        className="academy-root-logo"
        src="/manus-storage/ocares-academy-logo_cf81a218.png"
        alt="Ocares Academy"
        width="217"
        height="72"
      />
      <p className="academy-root-code" aria-hidden="true">404</p>
      <h1 id="academy-root-title">Página no encontrada.</h1>
      <p>El enlace que buscas no está disponible.</p>
    </main>
  );
}

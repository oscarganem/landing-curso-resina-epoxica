import { isAcademyRootHostname, playaDelCarmenCampaignPath } from "@/lib/campaignRoutes";
import Home from "./Home";

export default function AcademyRoot() {
  if (!isAcademyRootHostname(window.location.hostname)) return <Home />;

  return (
    <main className="academy-root" aria-labelledby="academy-root-title">
      <img
        className="academy-root-logo"
        src="/manus-storage/ocares-academy-logo_cf81a218.png"
        alt="Ocares Academy"
        width="217"
        height="72"
      />
      <div className="academy-root-rule" aria-hidden="true" />
      <p className="academy-root-eyebrow">CURSOS PRESENCIALES</p>
      <h1 id="academy-root-title">Consulta tu curso desde el enlace oficial.</h1>
      <p>Recibiste un enlace directo de campaña. Ábrelo para conocer fecha, sede y disponibilidad.</p>
      <a href={playaDelCarmenCampaignPath}>Ver curso disponible</a>
    </main>
  );
}

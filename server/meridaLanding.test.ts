import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const appSource = readFileSync(new URL("../client/src/App.tsx", import.meta.url), "utf8");
const landingSource = readFileSync(new URL("../client/src/pages/MeridaLanding.tsx", import.meta.url), "utf8");
const stylesSource = readFileSync(new URL("../client/src/index.css", import.meta.url), "utf8");

describe("landing de Mérida", () => {
  it("registra una ruta independiente dentro del mismo dominio", () => {
    expect(appSource).toContain('meridaCampaignPath');
    expect(appSource).toContain('path={meridaCampaignPath}');
  });

  it("no incorpora formulario, persistencia ni página de gracias", () => {
    expect(landingSource).not.toContain("WaitlistModal");
    expect(landingSource).not.toContain("trpc.");
    expect(landingSource).not.toContain("getThankYouPathForLanding");
  });

  it("muestra la oferta directa y la logística confirmada de Mérida", () => {
    expect(landingSource).toContain("QUIERO INSCRIBIRME");
    expect(landingSource).toContain("VER TODA LA INFORMACIÓN");
    expect(landingSource).toContain('href="#informacion"');
    expect(landingSource).toContain('id="informacion"');
    expect(landingSource).toContain("Domingo 20 de septiembre");
    expect(landingSource).toContain("CANACINTRA");
    expect(landingSource).toContain("CANACINTRA Mérida");
    expect(landingSource).toContain("Aprenderás crear acabados: flake, granito antiderrapante, marmoleados, metálicos y 3D.");
    expect(landingSource).toContain("Manual del Aplicador PRO + Calculadora Epóxica para calcular tus materiales paso a paso.");
    expect(landingSource).toContain('title: "Manual del aplicador PRO"');
    expect(landingSource).toContain('title: "Soporte de por vida"');
    expect(landingSource).not.toContain('title: "Manual del aplicador"');
    expect(landingSource).not.toContain('title: "Soporte posterior al curso"');
    expect(landingSource).not.toContain('Building2 aria-hidden="true" /> CANACINTRA');
    expect(landingSource).not.toContain('<span className="placeholder-index" aria-hidden="true">01</span>');
    expect(landingSource).not.toContain("Cancún");
    expect(landingSource).not.toContain("WaitlistModal");
  });

  it("muestra el copy institucional aprobado de Grupo Ocares", () => {
    expect(landingSource).toContain("¿Quiénes somos?");
    expect(landingSource).toContain("Somos <strong>Oscar Cárdenas y Oscar Ganem</strong>, fundadores de <strong>Grupo Ocares</strong>.");
    expect(landingSource).toContain("Desde hace años trabajamos directamente en construcción, remodelación y aplicación de acabados, enfrentándonos en obra a los mismos retos que cualquier profesional del sector.");
    expect(landingSource).toContain("Esa experiencia nos llevó a crear nuestros cursos presenciales, donde enseñamos de forma práctica lo que hemos aprendido trabajando en campo.");
    expect(landingSource).toContain("Hoy hemos capacitado a cientos de alumnos en distintas ciudades de México, ayudándolos a aplicar estos conocimientos en sus proyectos, su trabajo e incluso en sus propios negocios.");
    expect(landingSource).toContain("Porque si vas a aprender una nueva técnica, es importante saber quién te está enseñando y de dónde viene su experiencia.");
  });

  it("mantiene el CTA secundario a la derecha en escritorio y lo apila solo en móvil", () => {
    expect(stylesSource).toContain(".hero-cta-group {\n  display: flex;\n  flex-wrap: nowrap;");
    expect(stylesSource).toContain(".hero-cta-group { display: grid;");
    expect(stylesSource).toContain("transform: translateY(-28px);");
    expect(stylesSource).toContain("min-height: 52px;");
  });

  it("elimina el bloque de paquetes y conserva comunidad, sección institucional y recursos en el orden solicitado", () => {
    const communityIndex = landingSource.indexOf('className="community-section"');
    const aboutIndex = landingSource.indexOf('className="about-section"');
    const includedIndex = landingSource.indexOf('className="included-section"');

    expect(landingSource).not.toContain('className="process-section"');
    expect(landingSource).not.toContain('className="process-cta"');
    expect(landingSource).not.toContain("const purchaseSteps");
    expect(communityIndex).toBeGreaterThan(-1);
    expect(aboutIndex).toBeGreaterThan(communityIndex);
    expect(includedIndex).toBeGreaterThan(aboutIndex);
  });

  it("mantiene en blanco el fondo de la sección de comunidad", () => {
    expect(stylesSource).toContain(".community-section { position: relative; overflow: hidden; background: #fff; color: #161616; }");
  });

  it("agrega la oferta de preventa, pago regular y equipos después de los recursos", () => {
    const includedIndex = landingSource.indexOf('className="included-section"');
    const pricingIndex = landingSource.indexOf('className="pricing-section"');
    const venueIndex = landingSource.indexOf('className="venue-section"');

    expect(landingSource).toContain("Elige cómo quieres");
    expect(landingSource).toContain("asegurar tu lugar");
    expect(landingSource).toContain("Todos los paquetes incluyen los materiales, recursos y beneficios mostrados arriba.");
    expect(landingSource).toContain("$1,999");
    expect(landingSource).toContain("REGISTRARME POR WHATSAPP");
    expect(landingSource).not.toContain("APARTAR CON $100 POR WHATSAPP");
    expect(landingSource).toContain("REGISTRARME SIN ANTICIPO");
    expect(landingSource).toContain("¿Vienes acompañado?");
    expect(landingSource).toContain("INSCRIBIR A MI EQUIPO POR WHATSAPP");
    expect(landingSource).toContain("Todo esto incluye tu entrada al curso");
    expect(landingSource).not.toContain("Todo lo que necesitas para aprender, practicar y empezar a aplicar");
    expect(includedIndex).toBeGreaterThan(-1);
    expect(pricingIndex).toBeGreaterThan(includedIndex);
    expect(venueIndex).toBeGreaterThan(pricingIndex);
  });

  it("dirige los CTA de inscripción y paquetes a la sección de precios", () => {
    expect(landingSource).toContain('className="pricing-section" id="precios"');
    expect(landingSource).toContain('className="waitlist-cta" href="#precios"');
    expect(landingSource.match(/className="(?:community-cta|proof-cta|final-cta-button)" href="#precios"/g)).toHaveLength(3);
  });

  it("recompone la referencia de cobro con precio dominante, ejemplo e imagen adaptada a móvil", () => {
    expect(landingSource).toContain("Esto es lo que");
    expect(landingSource).toContain("podrías cobrar");
    expect(landingSource).toContain('$1,000 a $1,500 <span>MXN por m²</span>');
    expect(landingSource).toContain("Un proyecto de 100 m² puede cotizarse entre $100,000 y $150,000 MXN.");
    expect(stylesSource).toContain(".earning-card { display: grid; grid-template-columns: minmax(0, 1fr) minmax(355px, 1fr);");
    expect(stylesSource).toContain(".earning-photo { order: -1; min-height: 250px; }");
  });

  it("activa los paquetes con WhatsApp y el mensaje predeterminado correspondiente", () => {
    expect(landingSource).toContain('const whatsAppNumber = "5219617848718"');
    expect(landingSource).toContain("Hola, quiero información sobre la preventa de $1,999 para el Curso de Resina Epóxica en Mérida.");
    expect(landingSource).toContain("Hola, quiero registrarme con la opción de pago al llegar de $2,499 para el Curso de Resina Epóxica en Mérida.");
    expect(landingSource).toContain("Hola, quiero información sobre los paquetes para parejas y equipos del Curso de Resina Epóxica en Mérida.");
    expect(landingSource.match(/href=\{getWhatsAppHref\([^)]*WhatsAppMessage\)\}/g)).toHaveLength(3);
  });

  it("espera antes de redirigir a WhatsApp y registra Lead solo si el píxel está disponible", () => {
    expect(landingSource).toContain("const handleWhatsAppClick");
    expect(landingSource.match(/onClick=\{\(event\) => handleWhatsAppClick\(event, getWhatsAppHref\([^)]*WhatsAppMessage\)\)\}/g)).toHaveLength(3);
    expect(landingSource).toContain('if (typeof window.fbq === "function")');
    expect(landingSource).toContain('window.fbq("track", "Lead")');
    expect(landingSource).toContain("}, 1500)");
    expect(landingSource).toContain("}, 5000)");
    expect(landingSource).toContain("window.location.href = url;");
    expect(landingSource).not.toContain("window.open");
    expect(landingSource).not.toContain("popupWindowRef");
    expect(landingSource).not.toContain("Tú puedes ser el siguiente.");
    expect(stylesSource).toContain(".whatsapp-redirect-overlay { position: fixed;");
    expect(stylesSource).toContain(".whatsapp-redirect-spinner");
  });
});

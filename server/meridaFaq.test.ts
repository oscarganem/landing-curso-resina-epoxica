import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const faqSource = readFileSync(new URL("../client/src/pages/MeridaFaqList.tsx", import.meta.url), "utf8");

describe("preguntas frecuentes de Mérida", () => {
  it("incluye técnicas, precios, logística y el proceso de inscripción confirmados", () => {
    expect(faqSource).toContain("¿Qué técnicas aprenderé?");
    expect(faqSource).toContain("pisos flake, granito antiderrapante");
    expect(faqSource).toContain("¿Cuál es el precio del curso?");
    expect(faqSource).toContain("La opción de <strong>preventa cuesta $1,999</strong>");
    expect(faqSource).toContain("2 personas por $3,800");
    expect(faqSource).toContain("3 personas por $4,999");
    expect(faqSource).toContain("¿Dónde, cuándo y a qué hora será el curso?");
    expect(faqSource).toContain("CANACINTRA Mérida");
    expect(faqSource).toContain("Domingo 20 de septiembre");
    expect(faqSource).toContain("10:00 am a 5:00 pm");
  });

  it("explica el acompañamiento por WhatsApp y enlaza las decisiones de compra a precios", () => {
    expect(faqSource).toContain("Después de elegir tu paquete, presiona el botón correspondiente");
    expect(faqSource).toContain("un asesor te ayudará");
    expect(faqSource.match(/className="faq-price-link" href="#precios"/g)).toHaveLength(2);
  });
});

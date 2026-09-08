import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const faqSource = readFileSync(new URL("../client/src/pages/CancunFaqList.tsx", import.meta.url), "utf8");

describe("preguntas frecuentes de Cancún", () => {
  it("mantiene las opciones de precios y adapta la información de logística confirmada", () => {
    expect(faqSource).toContain("La opción de <strong>preventa cuesta $1,999</strong>");
    expect(faqSource).toContain("<strong>precio regular de $2,499</strong>");
    expect(faqSource).toContain("<strong>2 personas por $3,800</strong>");
    expect(faqSource).toContain("<strong>3 personas por $4,999</strong>");
    expect(faqSource).toContain("<strong>Salón Alianza Desafío</strong>");
    expect(faqSource).toContain("Av. Xel-Ha LT 56 y 57, MZ 28, Edificio Siglo XXI, tercer nivel, Supermanzana 24, 77509 Cancún, Q.R.");
    expect(faqSource).toContain("10:00 am a 5:00 pm");
    expect(faqSource).toContain("El curso es impartido exclusivamente por <strong>Ocares Academy</strong>");
    expect(faqSource).toContain("Salón Alianza Desafío es el espacio que rentamos para realizar el evento");
    expect(faqSource).toContain("Ver ubicación en Google Maps");
    expect(faqSource).not.toContain("La sede, dirección, horario y mapa se anunciarán en cuanto estén confirmados.");
    expect(faqSource).not.toContain("Mérida");
  });

  it("conserva el enlace interno hacia precios para elegir y asegurar un paquete", () => {
    expect(faqSource.match(/href="#precios"/g)).toHaveLength(2);
    expect(faqSource).toContain("Después de elegir tu paquete, presiona el botón correspondiente para continuar tu registro por WhatsApp.");
  });
});

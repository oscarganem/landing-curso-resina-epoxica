import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { createElement, type PropsWithChildren } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import CourseFaqList from "../client/src/components/course/CourseFaqList";
import CourseLanding from "../client/src/components/course/CourseLanding";
import { courseCampaigns, type CourseCampaignConfig } from "../client/src/config/courseCampaigns";

// Render every answer here; browser validation covers the real accordion interaction.
vi.mock("@/components/ui/accordion", () => {
  const children = ({ children }: PropsWithChildren) => children;
  return { Accordion: children, AccordionItem: children, AccordionTrigger: children, AccordionContent: children };
});

const faqSource = renderToStaticMarkup(createElement(CourseFaqList, { campaign: courseCampaigns.merida }));

describe("preguntas frecuentes de Mérida", () => {
  it("reutiliza la plantilla y el FAQ con otros datos sin conservar información de Mérida", () => {
    const campaign: CourseCampaignConfig = {
      path: "/campana-de-prueba",
      city: "Ciudad de prueba",
      state: "Estado de prueba",
      date: { dayOfWeek: "Sábado", label: "8 de mayo" },
      schedule: "9:00 am a 4:00 pm",
      venue: { name: "Salón de prueba", label: "Sede de prueba", addressLines: ["Calle de prueba 123", "CP 00000"], mapEmbedUrl: "https://example.com/mapa" },
      whatsapp: { number: "5210000000000", messages: { presale: "Preventa de prueba", regular: "Registro de prueba", team: "Equipo de prueba" } },
      pricing: { regular: "$8,000", presale: "$7,000", deposit: "$500", remaining: "$6,500", presaleEnds: "1 de mayo", teams: [{ people: 4, total: "$24,000", perPerson: "$6,000", approximate: false }] },
      faqIdPrefix: "prueba-faq",
    };
    const landing = renderToStaticMarkup(createElement(CourseLanding, { campaign }));
    const faq = renderToStaticMarkup(createElement(CourseFaqList, { campaign }));
    for (const html of [landing, faq]) {
      for (const value of ["Sábado 8 de mayo", campaign.schedule, campaign.venue.label, ...campaign.venue.addressLines, "$8,000", "$7,000", "$500", "$6,500", "$24,000"]) {
        expect(html).toContain(value);
      }
      for (const original of ["Mérida", "Yucatán", "CANACINTRA", "septiembre", "$1,999", "$2,499", "5219617848718"]) {
        expect(html).not.toContain(original);
      }
    }
    for (const value of [campaign.city, campaign.state, campaign.venue.name, campaign.venue.mapEmbedUrl, campaign.pricing.presaleEnds, "$6,000"]) {
      expect(landing).toContain(value);
    }
    for (const message of Object.values(campaign.whatsapp.messages)) {
      expect(landing).toContain(`https://wa.me/${campaign.whatsapp.number}?text=${encodeURIComponent(message)}`);
    }
  });

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
    expect(faqSource.match(/class="faq-price-link" href="#precios"/g)).toHaveLength(2);
  });
});

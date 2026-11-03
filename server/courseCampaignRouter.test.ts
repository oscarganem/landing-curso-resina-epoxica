import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import { describe, expect, it } from "vitest";
import CourseCampaignRouter from "../client/src/components/course/CourseCampaignRouter";
import { courseCampaigns, type CourseCampaignConfig } from "../client/src/config/courseCampaigns";

const render = (path: string, campaigns: Record<string, CourseCampaignConfig> = courseCampaigns) => renderToStaticMarkup(
  createElement(Router, { ssrPath: path }, createElement(CourseCampaignRouter, { campaigns })),
);

describe("Sites campaign routing", () => {
  it("has no active past campaigns", () => {
    expect(courseCampaigns).toEqual({});
  });

  it.each([
    "/", "/desconocida",
    "/curso-merida-sep26", "/curso-merida-sep26/", "/curso-merida-sep26?utm_source=test",
    "/curso-pachuca-oct26", "/curso-pachuca-oct26/",
    "/curso-ecatepec-oct26", "/curso-ecatepec-oct26/",
    "/curso-iztapalapa-oct26", "/curso-iztapalapa-oct26/",
  ])("shows not found at %s", path => {
    expect(render(path)).toBe("<main>Página no encontrada.</main>");
  });

  it("keeps the shared landing available for a future configured campaign", () => {
    const campaign: CourseCampaignConfig = {
      path: "/campana-de-prueba",
      city: "Ciudad de prueba",
      state: "Estado de prueba",
      date: { dayOfWeek: "Sábado", label: "8 de mayo" },
      schedule: "9:00 am a 4:00 pm",
      venue: { name: "Salón de prueba", label: "Sede de prueba", addressLines: ["Calle de prueba 123"] },
      whatsapp: { number: "5210000000000", messages: { presale: "Preventa de prueba", regular: "Registro de prueba", team: "Equipo de prueba" } },
      pricing: { regular: "$8,000", presale: "$7,000", deposit: "$500", remaining: "$6,500", teams: [] },
      faqIdPrefix: "prueba-faq",
    };
    const campaigns = { prueba: campaign };
    expect(render(campaign.path, campaigns)).toContain("Ciudad de prueba, Estado de prueba");
    expect(render("/curso-merida-sep26", campaigns)).toBe("<main>Página no encontrada.</main>");
  });
});

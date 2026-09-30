import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import { describe, expect, it } from "vitest";
import CourseCampaignRouter from "../client/src/components/course/CourseCampaignRouter";
import MeridaLanding from "../client/src/pages/MeridaLanding";
import { courseCampaigns, type CourseCampaignConfig } from "../client/src/config/courseCampaigns";

const render = (path: string, campaigns: Record<string, CourseCampaignConfig> = courseCampaigns) => renderToStaticMarkup(
  createElement(Router, { ssrPath: path }, createElement(CourseCampaignRouter, { campaigns })),
);

describe("Sites campaign routing", () => {
  it("keeps Mérida and Pachuca active with unique campaign paths", () => {
    expect(Object.keys(courseCampaigns)).toEqual(["merida", "pachuca"]);
    const paths = Object.values(courseCampaigns).map(campaign => campaign.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it.each(["/curso-merida-sep26", "/curso-merida-sep26/", "/curso-merida-sep26?utm_source=test"])(
    "preserves the exact Mérida markup at %s", path => {
      expect(render(path)).toBe(renderToStaticMarkup(createElement(MeridaLanding)));
    },
  );

  it.each(["/curso-pachuca-oct26", "/curso-pachuca-oct26/", "/curso-pachuca-oct26?utm_source=test"])(
    "renders Pachuca at %s without inheriting Mérida venue data", path => {
      const html = render(path);
      expect(html).toContain("Pachuca, Hidalgo");
      expect(html).toContain("Viernes 16 de octubre");
      expect(html).toContain("Sede por confirmar");
      expect(html).toContain("Dirección por confirmar");
      expect(html).toContain("Mapa disponible próximamente");
      expect(html).toContain(encodeURIComponent("Curso de Resina Epóxica en Pachuca."));
      expect(html).not.toContain("CANACINTRA Mérida");
      expect(html).not.toContain("17 de septiembre");
    },
  );

  it.each(["/", "/desconocida", "/curso-merida-sep26/extra", "/curso-pachuca-oct26/extra", "/curso-playadelcarmen-sep26", "/curso-cancun-sep26"])(
    "shows not found at %s", path => {
      expect(render(path)).toBe("<main>Página no encontrada.</main>");
    },
  );

  it("resolves a campaign from its configured path without a city-specific route", () => {
    const campaigns = { merida: { ...courseCampaigns.merida, path: "/campana-de-prueba" as const } };
    expect(render("/campana-de-prueba", campaigns)).toBe(renderToStaticMarkup(createElement(MeridaLanding)));
    expect(render("/curso-merida-sep26", campaigns)).toBe("<main>Página no encontrada.</main>");
  });
});


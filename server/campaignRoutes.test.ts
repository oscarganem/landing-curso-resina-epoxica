import { describe, expect, it } from "vitest";
import {
  getThankYouPathForLanding,
  isAcademyRootHostname,
  playaDelCarmenCampaignPath,
  playaDelCarmenThankYouPath,
} from "../client/src/lib/campaignRoutes";

describe("Rutas de campaña", () => {
  it("mantiene la landing de Playa del Carmen en su URL de campaña", () => {
    expect(playaDelCarmenCampaignPath).toBe("/curso-playadelcarmen-sep26");
    expect(getThankYouPathForLanding(playaDelCarmenCampaignPath)).toBe(playaDelCarmenThankYouPath);
  });

  it("siempre dirige a la página de gracias exclusiva de la campaña", () => {
    expect(getThankYouPathForLanding("/")).toBe(playaDelCarmenThankYouPath);
  });

  it("identifica la raíz del subdominio academia para no mostrar una campaña de ciudad", () => {
    expect(isAcademyRootHostname("academia.ocares.mx")).toBe(true);
    expect(isAcademyRootHostname("preview.example.com")).toBe(false);
  });
});

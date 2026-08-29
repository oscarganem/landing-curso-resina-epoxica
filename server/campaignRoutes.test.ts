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

  it("conserva la página de gracias original para la landing raíz", () => {
    expect(getThankYouPathForLanding("/")).toBe("/gracias");
  });

  it("identifica la raíz del subdominio academia para no mostrar una campaña de ciudad", () => {
    expect(isAcademyRootHostname("academia.ocares.mx")).toBe(true);
    expect(isAcademyRootHostname("3000-izopczgfj2x3lll3ygzs3-40e07970.us2.manus.computer")).toBe(false);
  });
});

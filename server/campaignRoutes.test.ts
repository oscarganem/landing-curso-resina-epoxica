import { describe, expect, it } from "vitest";
import {
  getThankYouPathForLanding,
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
});

import { describe, expect, it, vi } from "vitest";
import { isMetaPixelId, trackMetaLead } from "../client/src/lib/metaPixel";

describe("Configuración de Meta Pixel", () => {
  it("expone un identificador numérico de píxel válido", () => {
    const pixelId = process.env.VITE_META_PIXEL_ID;

    expect(isMetaPixelId(pixelId)).toBe(true);
  });

  it("emite Lead solo cuando el píxel está disponible en el navegador", () => {
    const fbq = vi.fn();
    vi.stubGlobal("window", { fbq });

    expect(trackMetaLead()).toBe(true);
    expect(fbq).toHaveBeenCalledWith("track", "Lead");

    vi.unstubAllGlobals();
  });
});

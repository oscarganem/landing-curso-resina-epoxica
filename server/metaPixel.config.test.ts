import { describe, expect, it, vi } from "vitest";
import { isMetaPixelId, scheduleMetaPixel, trackMetaLead } from "../client/src/lib/metaPixel";

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

  it("inicializa el píxel y conserva Lead si el registro ocurre antes de la carga diferida", () => {
    const appendChild = vi.fn();
    const createElement = vi.fn(() => ({ async: false, src: "" }));
    vi.stubGlobal("window", {});
    vi.stubGlobal("document", { createElement, head: { appendChild } });

    expect(trackMetaLead()).toBe(true);
    expect(createElement).toHaveBeenCalledWith("script");
    expect(appendChild).toHaveBeenCalledTimes(1);
    expect(window.fbq?.queue).toContainEqual(["track", "Lead"]);

    vi.unstubAllGlobals();
  });

  it("difere la descarga del píxel hasta terminar la carga inicial", () => {
    const addEventListener = vi.fn();
    vi.stubGlobal("window", { addEventListener });
    vi.stubGlobal("document", { readyState: "loading" });

    expect(scheduleMetaPixel()).toBe(true);
    expect(addEventListener).toHaveBeenCalledWith("load", expect.any(Function), { once: true });

    vi.unstubAllGlobals();
  });
});

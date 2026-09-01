import { describe, expect, it, vi } from "vitest";
import { consumePendingMetaLead, isMetaPixelId, markMetaLeadPending, scheduleMetaPixel, trackMetaLead, trackMetaLeadWhenReady } from "../client/src/lib/metaPixel";

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

  it("espera a que el píxel real esté listo antes de enviar Lead", async () => {
    const fbq = Object.assign(vi.fn(), { callMethod: vi.fn() });
    vi.stubGlobal("window", { fbq });

    await expect(trackMetaLeadWhenReady()).resolves.toBe(true);
    expect(fbq).toHaveBeenCalledWith("track", "Lead");

    vi.unstubAllGlobals();
  });

  it("no emite Lead si el píxel real nunca queda listo", async () => {
    const fbq = vi.fn();
    vi.stubGlobal("window", { fbq });
    vi.useFakeTimers();

    try {
      const leadPromise = trackMetaLeadWhenReady();
      await vi.advanceTimersByTimeAsync(10_050);
      await expect(leadPromise).resolves.toBe(false);
      expect(fbq).not.toHaveBeenCalledWith("track", "Lead");
    } finally {
      vi.useRealTimers();
      vi.unstubAllGlobals();
    }
  });

  it("consume la señal de Lead una sola vez y protege visitas directas o recargas", () => {
    const values = new Map<string, string>();
    vi.stubGlobal("window", {
      sessionStorage: {
        getItem: (key: string) => values.get(key) ?? null,
        setItem: (key: string, value: string) => values.set(key, value),
        removeItem: (key: string) => values.delete(key),
      },
    });

    expect(consumePendingMetaLead()).toBe(false);
    expect(markMetaLeadPending()).toBe(true);
    expect(consumePendingMetaLead()).toBe(true);
    expect(consumePendingMetaLead()).toBe(false);

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

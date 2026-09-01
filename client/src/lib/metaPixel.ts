type MetaPixelFunction = ((...args: unknown[]) => void) & { queue?: unknown[][]; loaded?: boolean; version?: string };

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
  }
}

export const isMetaPixelId = (pixelId: string | undefined): pixelId is string => /^\d{10,20}$/.test(pixelId ?? "");

const getPixelId = () => import.meta.env.VITE_META_PIXEL_ID?.trim();

export const loadMetaPixel = () => {
  const pixelId = getPixelId();

  if (typeof window === "undefined" || !isMetaPixelId(pixelId) || window.fbq) return false;

  const fbq = ((...args: unknown[]) => {
    fbq.queue?.push(args);
  }) as MetaPixelFunction;

  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", pixelId);
  fbq("track", "PageView");
  return true;
};

export const scheduleMetaPixel = () => {
  if (typeof window === "undefined" || !isMetaPixelId(getPixelId())) return false;

  const loadWhenIdle = () => {
    const requestIdleCallback = (window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
    }).requestIdleCallback;

    if (requestIdleCallback) {
      requestIdleCallback(() => loadMetaPixel(), { timeout: 2_500 });
      return;
    }

    globalThis.setTimeout(loadMetaPixel, 1_200);
  };

  if (document.readyState === "complete") {
    loadWhenIdle();
  } else {
    window.addEventListener("load", loadWhenIdle, { once: true });
  }

  return true;
};

export const trackMetaLead = () => {
  const pixelId = getPixelId();

  if (typeof window === "undefined" || !isMetaPixelId(pixelId)) return false;

  // Si el usuario completa el formulario antes de la ventana inactiva,
  // inicializamos el píxel en ese momento para no perder una conversión real.
  if (!window.fbq) loadMetaPixel();
  if (!window.fbq) return false;

  window.fbq("track", "Lead");
  return true;
};

const isMetaPixelReady = () => Boolean(window.fbq && "callMethod" in window.fbq);

export const trackMetaLeadWhenReady = () => {
  const pixelId = getPixelId();

  if (typeof window === "undefined" || !isMetaPixelId(pixelId)) return Promise.resolve(false);

  if (!window.fbq) loadMetaPixel();

  return new Promise<boolean>((resolve) => {
    const startedAt = Date.now();
    const sendLead = () => resolve(trackMetaLead());

    const waitForPixel = () => {
      if (isMetaPixelReady()) {
        sendLead();
        return;
      }

      // Si Meta no termina de cargar, no emitimos un Lead prematuro.
      if (Date.now() - startedAt >= 10_000) {
        resolve(false);
        return;
      }

      globalThis.setTimeout(waitForPixel, 50);
    };

    waitForPixel();
  });
};


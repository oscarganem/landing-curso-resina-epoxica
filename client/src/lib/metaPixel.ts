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

export const trackMetaLead = () => {
  const pixelId = getPixelId();

  if (typeof window === "undefined" || !isMetaPixelId(pixelId) || !window.fbq) return false;

  window.fbq("track", "Lead");
  return true;
};

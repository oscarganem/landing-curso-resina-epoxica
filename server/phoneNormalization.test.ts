import { describe, expect, it } from "vitest";
import { getMexicanWhatsAppParts, normalizeMexicanWhatsApp } from "../shared/phone";

describe("normalizeMexicanWhatsApp", () => {
  it("antepone +52 a los diez dígitos capturados", () => {
    expect(normalizeMexicanWhatsApp("961 784 8718")).toBe("+529617848718");
  });

  it("evita duplicar el prefijo si se pega con 52", () => {
    expect(normalizeMexicanWhatsApp("52 961 784 8718")).toBe("+529617848718");
  });

  it("separa el código de país y el número nacional para las integraciones", () => {
    expect(getMexicanWhatsAppParts("52 5580 608254")).toEqual({
      countryCode: "+52",
      nationalNumber: "5580608254",
      fullNumber: "+525580608254",
    });
  });
});

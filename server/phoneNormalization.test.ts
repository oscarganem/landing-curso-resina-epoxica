import { describe, expect, it } from "vitest";
import { normalizeMexicanWhatsApp } from "../shared/phone";

describe("normalizeMexicanWhatsApp", () => {
  it("antepone +52 a los diez dígitos capturados", () => {
    expect(normalizeMexicanWhatsApp("961 784 8718")).toBe("+529617848718");
  });

  it("evita duplicar el prefijo si se pega con 52", () => {
    expect(normalizeMexicanWhatsApp("52 961 784 8718")).toBe("+529617848718");
  });
});

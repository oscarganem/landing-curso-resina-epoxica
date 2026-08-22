import { describe, expect, it } from "vitest";
import { waitlistSignupSchema } from "./routers";

describe("waitlistSignupSchema", () => {
  it("acepta un registro de lista de espera válido", () => {
    const result = waitlistSignupSchema.parse({
      fullName: "María López",
      email: "MARIA@EXAMPLE.COM",
      whatsapp: "+52 984 123 4567",
    });

    expect(result).toEqual({
      fullName: "María López",
      email: "maria@example.com",
      whatsapp: "+52 984 123 4567",
    });
  });

  it("rechaza un correo inválido", () => {
    expect(() => waitlistSignupSchema.parse({
      fullName: "María López",
      email: "correo-invalido",
      whatsapp: "+52 984 123 4567",
    })).toThrow();
  });
});

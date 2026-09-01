import { describe, expect, it, vi } from "vitest";

import { handleSuccessfulWaitlistSignup } from "../client/src/lib/waitlistConversion";

describe("Conversión de lista de espera", () => {
  it("tras un registro exitoso solo cierra, limpia y redirige", () => {
    const closeForm = vi.fn();
    const clearError = vi.fn();
    const redirectToThankYou = vi.fn();

    handleSuccessfulWaitlistSignup({ closeForm, clearError, redirectToThankYou });

    expect(closeForm).toHaveBeenCalledTimes(1);
    expect(clearError).toHaveBeenCalledTimes(1);
    expect(redirectToThankYou).toHaveBeenCalledTimes(1);
  });
});

import { describe, expect, it, vi } from "vitest";

vi.mock("../client/src/lib/metaPixel", () => ({
  trackMetaLead: vi.fn(),
}));

import { trackMetaLead } from "../client/src/lib/metaPixel";
import { handleSuccessfulWaitlistSignup } from "../client/src/lib/waitlistConversion";

describe("Conversión de lista de espera", () => {
  it("registra Lead únicamente al confirmarse el registro exitoso", () => {
    const closeForm = vi.fn();
    const clearError = vi.fn();
    const redirectToThankYou = vi.fn();

    expect(trackMetaLead).not.toHaveBeenCalled();

    handleSuccessfulWaitlistSignup({ closeForm, clearError, redirectToThankYou });

    expect(trackMetaLead).toHaveBeenCalledTimes(1);
    expect(closeForm).toHaveBeenCalledTimes(1);
    expect(clearError).toHaveBeenCalledTimes(1);
    expect(redirectToThankYou).toHaveBeenCalledTimes(1);
  });
});

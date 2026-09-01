import { describe, expect, it, vi } from "vitest";

import { handleSuccessfulWaitlistSignup } from "../client/src/lib/waitlistConversion";

describe("Conversión de lista de espera", () => {
  it("marca Lead para la página de gracias únicamente al confirmarse el registro exitoso", () => {
    const markLeadPending = vi.fn();
    const closeForm = vi.fn();
    const clearError = vi.fn();
    const redirectToThankYou = vi.fn();

    expect(markLeadPending).not.toHaveBeenCalled();

    handleSuccessfulWaitlistSignup({ markLeadPending, closeForm, clearError, redirectToThankYou });

    expect(markLeadPending).toHaveBeenCalledTimes(1);
    expect(closeForm).toHaveBeenCalledTimes(1);
    expect(clearError).toHaveBeenCalledTimes(1);
    expect(redirectToThankYou).toHaveBeenCalledTimes(1);
  });
});

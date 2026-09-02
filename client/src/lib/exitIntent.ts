export function isExitIntent(event: Pick<MouseEvent, "clientY" | "relatedTarget">) {
  return event.clientY <= 0 && event.relatedTarget === null;
}

export function supportsExitIntent() {
  return window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? false;
}

export function createExitIntentGate() {
  let hasBeenShown = false;

  return {
    claim() {
      if (hasBeenShown) return false;
      hasBeenShown = true;
      return true;
    },
  };
}

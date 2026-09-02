import { describe, expect, it } from "vitest";
import { createExitIntentGate, isExitIntent } from "../client/src/lib/exitIntent";

describe("intención de salida", () => {
  it("detecta únicamente la salida superior real de la ventana", () => {
    expect(isExitIntent({ clientY: 0, relatedTarget: null })).toBe(true);
    expect(isExitIntent({ clientY: -4, relatedTarget: null })).toBe(true);
    expect(isExitIntent({ clientY: 8, relatedTarget: null })).toBe(false);
  });

  it("ignora movimientos entre elementos dentro de la página", () => {
    expect(isExitIntent({ clientY: 0, relatedTarget: {} as EventTarget })).toBe(false);
  });

  it("solo concede una aparición aunque haya varios intentos de salida", () => {
    const gate = createExitIntentGate();

    expect(gate.claim()).toBe(true);
    expect(gate.claim()).toBe(false);
    expect(gate.claim()).toBe(false);
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";
import { createContext, type TrpcContext } from "./_core/context";
import { appRouter } from "./routers";

afterEach(() => vi.unstubAllGlobals());

describe("public landing API without an identity provider", () => {
  it.each([undefined, "app_session_id=obsolete-session"])(
    "serves health and anonymous identity without external requests (cookie: %s)",
    async cookie => {
      const fetchSpy = vi.fn(() => { throw new Error("Unexpected external request"); });
      vi.stubGlobal("fetch", fetchSpy);
      const ctx = await createContext({
        req: { headers: { cookie } } as TrpcContext["req"],
        res: {} as TrpcContext["res"],
        info: {} as never,
      });
      const caller = appRouter.createCaller(ctx);
      expect(await caller.auth.me()).toBeNull();
      expect(await caller.system.health({ timestamp: 0 })).toEqual({ ok: true });
      expect(fetchSpy).not.toHaveBeenCalled();
    }
  );
});

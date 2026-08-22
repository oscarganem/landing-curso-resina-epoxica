import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { upsertWaitlistSignup } from "./db";

export const waitlistSignupSchema = z.object({
  fullName: z.string().trim().min(2, "Ingresa tu nombre completo.").max(160),
  email: z.string().trim().toLowerCase().email("Ingresa un correo válido.").max(320),
  whatsapp: z.string().trim().min(7, "Ingresa un número de WhatsApp válido.").max(32),
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  waitlist: router({
    signup: publicProcedure.input(waitlistSignupSchema).mutation(async ({ input }) => {
      await upsertWaitlistSignup(input);
      return { success: true } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;

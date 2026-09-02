import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { markWaitlistSignupSentToMake, upsertWaitlistSignup } from "./db";
import { sendWaitlistSignupToMake } from "./make";
import { syncWaitlistSignupToSender } from "./sender";
import { getMexicanWhatsAppParts } from "../shared/phone";

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
      const phoneParts = getMexicanWhatsAppParts(input.whatsapp);
      const normalizedSignup = {
        ...input,
        whatsapp: phoneParts.fullNumber,
        whatsappCountryCode: phoneParts.countryCode,
        whatsappNationalNumber: phoneParts.nationalNumber,
      };
      const { isNew, signup } = await upsertWaitlistSignup(normalizedSignup);
      await syncWaitlistSignupToSender(normalizedSignup, { triggerAutomation: isNew });

      // Solo las altas nuevas se entregan a Make; los contactos históricos y los
      // reintentos permanecen silenciosos para evitar automatizaciones duplicadas.
      if (isNew && !signup.makeWebhookSentAt) {
        try {
          const makeResult = await sendWaitlistSignupToMake(signup);
          if (makeResult.synced) {
            await markWaitlistSignupSentToMake(signup.id);
          }
        } catch (error) {
          console.error("[Make] No fue posible entregar el nuevo registro:", error);
        }
      }

      return { success: true } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;

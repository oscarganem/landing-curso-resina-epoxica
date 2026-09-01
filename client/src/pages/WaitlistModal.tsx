import { type FormEvent, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { Check, MoveUpRight, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { handleSuccessfulWaitlistSignup } from "@/lib/waitlistConversion";
import { markMetaLeadPending } from "@/lib/metaPixel";
import { getThankYouPathForLanding } from "@/lib/campaignRoutes";
import { normalizeMexicanWhatsApp } from "@shared/phone";
import { useLocation } from "wouter";

type WaitlistFormValues = {
  fullName: string;
  email: string;
  whatsapp: string;
};

type WaitlistField = keyof WaitlistFormValues;

type WaitlistModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function WaitlistModalContent({ open, onOpenChange }: WaitlistModalProps) {
  const [location, setLocation] = useLocation();
  const [formError, setFormError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<WaitlistFormValues>({ fullName: "", email: "", whatsapp: "" });
  const waitlistMutation = trpc.waitlist.signup.useMutation({
    onSuccess: () => {
      handleSuccessfulWaitlistSignup({
        markLeadPending: markMetaLeadPending,
        closeForm: () => onOpenChange(false),
        clearError: () => setFormError(null),
        redirectToThankYou: () => setLocation(getThankYouPathForLanding(location)),
      });
    },
    onError: (error) => setFormError(error.message || "No pudimos guardar tu registro. Inténtalo de nuevo."),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    waitlistMutation.mutate({ ...formValues, whatsapp: normalizeMexicanWhatsApp(formValues.whatsapp) });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="waitlist-modal" showCloseButton={false}>
        <DialogClose className="waitlist-close" aria-label="Cerrar formulario"><X aria-hidden="true" /></DialogClose>
        <div className="waitlist-modal-copy">
          <DialogTitle>Únete <strong>GRATIS</strong> a la lista de espera del <strong>Curso de Resina Epóxica</strong></DialogTitle>
          <DialogDescription>
            Las inscripciones para nuestro curso presencial en Playa del Carmen todavía no están abiertas.
          </DialogDescription>
          <p>Al registrarte <strong>GRATIS</strong> obtendrás:</p>
          <ul className="waitlist-benefits">
            <li><Check aria-hidden="true" strokeWidth={3} /><span><strong>Acceso prioritario para reservar tu lugar</strong> antes de abrir las inscripciones al público general.</span></li>
            <li><Check aria-hidden="true" strokeWidth={3} /><span><strong>Acceso a nuestra clase online gratuita</strong>, donde aprenderás las 5 capas de un piso epóxico y verás una demostración en vivo.</span></li>
            <li><Check aria-hidden="true" strokeWidth={3} /><span><strong>Un descuento exclusivo de preventa</strong>, que revelaremos durante la clase.</span></li>
          </ul>
        </div>
        <form className="waitlist-form" onSubmit={handleSubmit}>
          <h3>Regístrate aquí</h3>
          <label><span className="sr-only">Introduce tu nombre</span><input required autoComplete="name" placeholder="Introduce tu nombre" value={formValues.fullName} onChange={(event) => setFormValues((values) => ({ ...values, fullName: event.target.value }))} /></label>
          <label><span className="sr-only">Tu mejor correo</span><input required type="email" autoComplete="email" placeholder="Tu mejor correo" value={formValues.email} onChange={(event) => setFormValues((values) => ({ ...values, email: event.target.value }))} /></label>
          <label className="waitlist-whatsapp-field"><span className="sr-only">WhatsApp, diez dígitos después del prefijo +52</span><span className="waitlist-phone-prefix" aria-hidden="true">+52</span><input required type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="WhatsApp a 10 dígitos" value={formValues.whatsapp} onChange={(event) => setFormValues((values) => ({ ...values, whatsapp: event.target.value.replace(/\D/g, "").slice(-10) }))} /></label>
          {formError && <p className="waitlist-form-error" role="alert">{formError}</p>}
          <button type="submit" disabled={waitlistMutation.isPending}>{waitlistMutation.isPending ? "Guardando tu registro…" : <>Sí, quiero unirme GRATIS a la lista de espera <MoveUpRight aria-hidden="true" /></>}</button>
          <p className="waitlist-form-trust">Registro gratuito · Sin compromiso · No estás comprando el curso</p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function WaitlistModal(props: WaitlistModalProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => trpc.createClient({
    links: [
      httpBatchLink({
        url: "/api/trpc",
        transformer: superjson,
        fetch(input, init) {
          return globalThis.fetch(input, { ...(init ?? {}), credentials: "include" });
        },
      }),
    ],
  }));

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <WaitlistModalContent {...props} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

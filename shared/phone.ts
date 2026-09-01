export function normalizeMexicanWhatsApp(localDigits: string) {
  const digits = localDigits.replace(/\D/g, "").replace(/^52(?=\d{10}$)/, "");
  return `+52${digits}`;
}

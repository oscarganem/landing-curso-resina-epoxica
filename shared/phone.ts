export function normalizeMexicanWhatsApp(localDigits: string) {
  return getMexicanWhatsAppParts(localDigits).fullNumber;
}

export function getMexicanWhatsAppParts(value: string) {
  const nationalNumber = value.replace(/\D/g, "").replace(/^52(?=\d{10}$)/, "").slice(-10);
  return {
    countryCode: "+52",
    nationalNumber,
    fullNumber: `+52${nationalNumber}`,
  };
}

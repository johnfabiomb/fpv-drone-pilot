const SYMBOLS: Record<string, string> = { EUR: '€', USD: '$', GBP: '£' };

/** Symbol for an ISO currency code (falls back to the code itself, then €). */
export function currencySymbol(code: string | null | undefined): string {
  if (!code) return '€';
  return SYMBOLS[code] ?? code;
}

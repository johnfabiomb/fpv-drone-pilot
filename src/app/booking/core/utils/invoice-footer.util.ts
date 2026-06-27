// Replaces template keys in an org's invoice footer with a booking's real figures, so the
// payment-terms note (deposit / balance) is always correct for that booking's deposit %.
// Supported keys (documented in Settings):
//   {depositPercent} {deposit} {balancePercent} {balance} {total}
// ({restOfPayment} is an alias for {balance}.)

export const INVOICE_FOOTER_KEYS =
  ['{depositPercent}', '{deposit}', '{balancePercent}', '{balance}', '{total}'] as const;

export function renderInvoiceFooter(
  template: string | null | undefined,
  opts: { total: number; depositPercent: number | null; currency: string },
): string {
  if (!template) return '';
  const pct = Math.max(0, Math.min(100, opts.depositPercent ?? 0));
  const deposit = Math.round(opts.total * pct) / 100;            // pct is whole (e.g. 50 → 50%)
  const balance = Math.round((opts.total - deposit) * 100) / 100;
  const money = (n: number) => {
    try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: opts.currency }).format(n); }
    catch { return `${opts.currency} ${n.toFixed(2)}`; }
  };
  const map: Record<string, string> = {
    '{deposit}': money(deposit),
    '{balance}': money(balance),
    '{restOfPayment}': money(balance),
    '{depositPercent}': `${pct}%`,
    '{balancePercent}': `${100 - pct}%`,
    '{total}': money(opts.total),
  };
  return template.replace(
    /\{deposit\}|\{balance\}|\{restOfPayment\}|\{depositPercent\}|\{balancePercent\}|\{total\}/g,
    m => map[m] ?? m,
  );
}

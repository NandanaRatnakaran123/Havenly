/** Monthly instalment (EMI) for a reducing-balance loan. */
export function calcEmi(principal: number, annualRatePct: number, years: number) {
  const n = Math.round(years * 12);
  if (principal <= 0 || n <= 0) return 0;
  const r = annualRatePct / 12 / 100;
  if (r === 0) return principal / n;
  const f = Math.pow(1 + r, n);
  return (principal * r * f) / (f - 1);
}

/** Largest loan whose EMI fits within `foir` (default 50%) of income after existing EMIs. */
export function maxEligibleLoan(opts: {
  monthlyIncome: number;
  existingEmi: number;
  annualRatePct: number;
  years: number;
  foir?: number;
}) {
  const { monthlyIncome, existingEmi, annualRatePct, years, foir = 0.5 } = opts;
  const emiCap = Math.max(0, monthlyIncome * foir - existingEmi);
  const n = Math.round(years * 12);
  const r = annualRatePct / 12 / 100;
  if (emiCap === 0 || n <= 0) return 0;
  if (r === 0) return emiCap * n;
  const f = Math.pow(1 + r, n);
  return (emiCap * (f - 1)) / (r * f);
}

export const DEFAULT_RATE = 8.5;
export const DEFAULT_YEARS = 20;

/** Quick indicative EMI for a property price, assuming an 80% loan. */
export function estimateEmi(price: number) {
  return calcEmi(price * 0.8, DEFAULT_RATE, DEFAULT_YEARS);
}

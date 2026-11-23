"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { calcEmi, DEFAULT_RATE, DEFAULT_YEARS, maxEligibleLoan } from "@/lib/finance";
import { cn, formatPrice } from "@/lib/utils";

const card =
  "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900";

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-sm font-semibold">
        {label}
        <span className="text-base font-bold text-emerald-600">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-emerald-600"
      />
      <span className="flex justify-between text-xs text-slate-400">
        <span>{min.toLocaleString("en-IN")}</span>
        <span>{max.toLocaleString("en-IN")}</span>
      </span>
    </label>
  );
}

function EmiCalculator() {
  const sp = useSearchParams();
  const fromUrl = Number(sp.get("amount"));
  // Prefilled from a property page: assume an 80% loan on the listed price.
  const initial =
    fromUrl > 0
      ? Math.min(100_000_000, Math.max(500_000, Math.round((fromUrl * 0.8) / 100_000) * 100_000))
      : 5_000_000;

  const [amount, setAmount] = useState(initial);
  const [rate, setRate] = useState(DEFAULT_RATE);
  const [years, setYears] = useState(DEFAULT_YEARS);

  const emi = calcEmi(amount, rate, years);
  const total = emi * years * 12;
  const interest = Math.max(0, total - amount);
  const principalPct = total > 0 ? (amount / total) * 100 : 100;

  return (
    <section id="emi" className={card} aria-labelledby="emi-title">
      <h2 id="emi-title" className="text-xl font-bold">
        Home loan EMI calculator
      </h2>
      <div className="mt-5 grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <Slider
            label="Loan amount"
            value={amount}
            min={500_000}
            max={100_000_000}
            step={100_000}
            onChange={setAmount}
            display={formatPrice(amount)}
          />
          <Slider
            label="Interest rate (p.a.)"
            value={rate}
            min={6}
            max={15}
            step={0.05}
            onChange={setRate}
            display={`${rate.toFixed(2)}%`}
          />
          <Slider
            label="Tenure"
            value={years}
            min={1}
            max={30}
            step={1}
            onChange={setYears}
            display={`${years} yrs`}
          />
        </div>
        <div className="flex flex-col justify-center rounded-xl bg-emerald-50 p-6 dark:bg-emerald-950/40">
          <p className="text-sm text-slate-600 dark:text-slate-300">Your monthly EMI</p>
          <p
            className="text-4xl font-extrabold text-emerald-700 dark:text-emerald-400"
            aria-live="polite"
          >
            {formatPrice(Math.round(emi))}
          </p>
          <div
            className="mt-5 flex h-3 overflow-hidden rounded-full bg-amber-300"
            role="img"
            aria-label={`Principal ${Math.round(principalPct)} percent, interest ${Math.round(100 - principalPct)} percent`}
          >
            <div className="bg-emerald-600" style={{ width: `${principalPct}%` }} />
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-emerald-600" /> Principal
              </dt>
              <dd className="font-semibold">{formatPrice(amount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-amber-300" /> Total interest
              </dt>
              <dd className="font-semibold">{formatPrice(Math.round(interest))}</dd>
            </div>
            <div className="flex justify-between border-t border-emerald-200 pt-2 dark:border-emerald-900">
              <dt>Total payable</dt>
              <dd className="font-bold">{formatPrice(Math.round(total))}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function EligibilityCalculator() {
  const [income, setIncome] = useState(100_000);
  const [existing, setExisting] = useState(0);
  const [rate, setRate] = useState(DEFAULT_RATE);
  const [years, setYears] = useState(DEFAULT_YEARS);

  const loan = maxEligibleLoan({
    monthlyIncome: income,
    existingEmi: existing,
    annualRatePct: rate,
    years,
  });
  const emi = calcEmi(loan, rate, years);

  return (
    <section id="eligibility" className={card} aria-labelledby="elig-title">
      <h2 id="elig-title" className="text-xl font-bold">
        Loan eligibility calculator
      </h2>
      <div className="mt-5 grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <Slider
            label="Monthly income"
            value={income}
            min={20_000}
            max={1_000_000}
            step={5_000}
            onChange={setIncome}
            display={formatPrice(income)}
          />
          <Slider
            label="Existing EMIs"
            value={existing}
            min={0}
            max={300_000}
            step={1_000}
            onChange={setExisting}
            display={formatPrice(existing)}
          />
          <Slider
            label="Interest rate (p.a.)"
            value={rate}
            min={6}
            max={15}
            step={0.05}
            onChange={setRate}
            display={`${rate.toFixed(2)}%`}
          />
          <Slider
            label="Tenure"
            value={years}
            min={1}
            max={30}
            step={1}
            onChange={setYears}
            display={`${years} yrs`}
          />
        </div>
        <div className="flex flex-col justify-center rounded-xl bg-slate-50 p-6 dark:bg-slate-800/60">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            You may be eligible for up to
          </p>
          <p
            className={cn(
              "text-4xl font-extrabold",
              loan > 0 ? "text-emerald-700 dark:text-emerald-400" : "text-slate-400",
            )}
            aria-live="polite"
          >
            {loan > 0 ? formatPrice(Math.round(loan)) : "—"}
          </p>
          {loan > 0 ? (
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              with an EMI of about {formatPrice(Math.round(emi))} a month.
            </p>
          ) : (
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Your existing EMIs already use up the usual repayment limit.
            </p>
          )}
          <p className="mt-4 text-xs text-slate-500">
            Assumes your total EMIs stay within 50% of income. Actual eligibility depends on your
            lender, credit score and property.
          </p>
        </div>
      </div>
    </section>
  );
}

export function FinanceTools() {
  return (
    <div className="space-y-8">
      <EmiCalculator />
      <EligibilityCalculator />
    </div>
  );
}

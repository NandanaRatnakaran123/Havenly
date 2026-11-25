import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlanId } from "@/data/plans";

export interface PlanPurchase {
  id: string;
  plan: PlanId;
  amount: number;
  /** ISO timestamp. */
  date: string;
}

interface PlanState {
  /** True once the persisted state has been read from localStorage. */
  hydrated: boolean;
  plan: PlanId;
  /** Listings posted from this browser (frontend-only until a backend exists). */
  postedCount: number;
  purchases: PlanPurchase[];
  takePlan: (plan: PlanId, amount: number) => void;
  recordPost: () => void;
}

// TODO: replace with the backend's account/plan data once auth and payments exist.
export const usePlan = create<PlanState>()(
  persist(
    (set) => ({
      hydrated: false,
      plan: "basic",
      postedCount: 0,
      purchases: [],
      takePlan: (plan, amount) =>
        set((s) => ({
          plan,
          purchases: [
            { id: crypto.randomUUID(), plan, amount, date: new Date().toISOString() },
            ...s.purchases,
          ],
        })),
      recordPost: () => set((s) => ({ postedCount: s.postedCount + 1 })),
    }),
    {
      name: "havenly-plan",
      skipHydration: true,
      partialize: ({ plan, postedCount, purchases }) => ({ plan, postedCount, purchases }),
      onRehydrateStorage: () => () => usePlan.setState({ hydrated: true }),
    },
  ),
);

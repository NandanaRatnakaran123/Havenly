"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/store/favorites";

export function FavoriteButton({ id, className }: { id: string; className?: string }) {
  const active = useFavorites((s) => s.ids.includes(id));
  const toggle = useFavorites((s) => s.toggle);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Remove from saved" : "Save property"}
      onClick={() => toggle(id)}
      className={cn(
        "grid size-9 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-110 dark:bg-slate-900/90",
        className,
      )}
    >
      <Heart
        className={cn(
          "size-5",
          active ? "fill-rose-500 text-rose-500" : "text-slate-600 dark:text-slate-300",
        )}
      />
    </button>
  );
}

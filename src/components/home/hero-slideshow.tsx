"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { categoryImages, categoryLabels } from "@/config/site";
import { cn } from "@/lib/utils";
import type { PropertyCategory } from "@/types/property";

const slides = (Object.keys(categoryImages) as PropertyCategory[]).map((k) => ({
  key: k,
  src: categoryImages[k],
  label: categoryLabels[k],
}));

const INTERVAL_MS = 5000;

/**
 * Decorative crossfading background for the hero (right side on desktop,
 * full-bleed and tinted on mobile). A gradient in the hero's own green sits on
 * top of the photos, so they dissolve into the left side with no visible seam.
 */
export function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div className="absolute inset-y-0 right-0 w-full overflow-hidden lg:w-[72%]">
      {slides.map((s, i) => (
        <Image
          key={s.key}
          src={s.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 72vw, 100vw"
          priority={i === 0}
          className={cn(
            "object-cover transition-[opacity,transform] ease-in-out motion-reduce:transition-none",
            i === active ? "scale-110 opacity-100" : "scale-100 opacity-0",
          )}
          style={{ transitionDuration: i === active ? "1600ms, 9000ms" : "1600ms, 1600ms" }}
        />
      ))}

      {/* Blend layer: solid hero green on the left edge -> mostly clear on the right.
          On mobile it is a flat tint so the text stays readable. */}
      <div className="absolute inset-0 bg-emerald-700/70 lg:bg-transparent lg:bg-linear-to-r lg:from-emerald-700 lg:from-0% lg:via-emerald-700/75 lg:via-30% lg:to-emerald-700/10 lg:to-100%" />

      <div className="absolute right-4 bottom-4 z-10 hidden items-center gap-3 rounded-full bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur lg:flex">
        <span aria-live="off">{slides[active].label}</span>
        <div className="flex gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.key}
              type="button"
              aria-label={`Show ${s.label}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === active ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

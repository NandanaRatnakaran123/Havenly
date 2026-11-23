"use client";

import Link from "next/link";
import { Heart, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { useFavorites } from "@/store/favorites";

const iconBtn =
  "relative grid size-10 place-items-center rounded-full text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800";

export function HeaderActions() {
  const { resolvedTheme, setTheme } = useTheme();
  const saved = useFavorites((s) => s.ids.length);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Link href="/saved" className={iconBtn} aria-label={`Saved properties (${saved})`}>
        <Heart className="size-5" />
        {saved > 0 && (
          <span className="absolute -top-0.5 -right-0.5 grid size-5 place-items-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
            {saved}
          </span>
        )}
      </Link>
      <button
        type="button"
        className={iconBtn}
        aria-label="Toggle dark mode"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        <Sun className="hidden size-5 dark:block" />
        <Moon className="size-5 dark:hidden" />
      </button>
      <button
        type="button"
        className={`${iconBtn} lg:hidden`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open && (
        <nav
          aria-label="Mobile"
          className="absolute inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-slate-200 bg-white p-4 shadow-lg lg:hidden dark:border-slate-800 dark:bg-slate-950"
        >
          <ul className="grid gap-1">
            {siteConfig.nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2.5 font-medium hover:bg-emerald-50 dark:hover:bg-slate-800"
                >
                  {n.label}
                </Link>
                {n.children && (
                  <ul className="mb-1 ml-4 border-l border-slate-200 pl-2 dark:border-slate-700">
                    {n.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-emerald-50 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li>
              <Link
                href="/post-property"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-md bg-emerald-600 px-3 py-2.5 text-center font-semibold text-white"
              >
                Post property — it&apos;s free
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

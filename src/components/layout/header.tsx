import Link from "next/link";
import { ChevronDown, Home, PlusCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { HeaderActions } from "@/components/layout/header-actions";

const linkCls =
  "rounded-md px-3 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-emerald-600 text-white">
            <Home className="size-4" />
          </span>
          {siteConfig.name}
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-0.5 text-sm font-medium lg:flex">
          {siteConfig.nav.map((n) =>
            n.children ? (
              <div key={n.href} className="group relative">
                <Link href={n.href} className={`${linkCls} inline-flex items-center gap-1`}>
                  {n.label}
                  <ChevronDown className="size-3.5 transition group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute top-full left-0 z-50 w-64 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                    {n.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="block rounded-lg px-3 py-2 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link key={n.href} href={n.href} className={linkCls}>
                {n.label}
              </Link>
            ),
          )}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/post-property"
            className="hidden items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 sm:inline-flex"
          >
            <PlusCircle className="size-4" />
            Post property
            <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-bold uppercase">
              Free
            </span>
          </Link>
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}

# CLAUDE.md — Havenly (Frontend)

Havenly is a real estate website (browse, search, and view homes for sale and rent). This folder, `Havenly-frontned`, is the Next.js frontend. (The folder name is spelled "frontned" on purpose; do not rename it without asking.)

## Next.js version warning

This project uses a recent Next.js (16.x) with Cache Components behaviour. APIs may differ from older versions. Before using a Next.js API, read the matching guide in `node_modules/next/dist/docs/`. See also [AGENTS.md](AGENTS.md).

Things already learned the hard way:
- `new Date()` / other non-deterministic values in server components break prerendering. Keep them out of server components (the footer year is hardcoded for this reason).
- Dynamic routes (`[id]`) need `generateStaticParams` or a `<Suspense>` boundary around runtime data.
- `params` is a `Promise` — `await` it.

## Tech stack

| Area | Tool |
| --- | --- |
| Framework | Next.js (App Router), React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` in `globals.css`), `clsx` + `tailwind-merge` via `cn()` |
| Icons | `lucide-react` |
| Forms / validation | `react-hook-form` + `zod` + `@hookform/resolvers` |
| Server state | `@tanstack/react-query` |
| Client state | `zustand` (see `src/store`) |
| Theming | `next-themes` (class-based dark mode) |
| Testing | Vitest + Testing Library + jsdom |
| Lint / format | ESLint (`eslint-config-next`), Prettier + `prettier-plugin-tailwindcss` |

## Commands

Run from this folder (`Havenly-frontned`):

```bash
npm run dev         # dev server on http://localhost:3000
npm run build       # production build (run before declaring work done)
npm run start       # serve production build
npm run lint        # ESLint
npm run lint:fix    # ESLint with autofix
npm run typecheck   # tsc --noEmit
npm run format      # Prettier write
npm test            # Vitest, single run
npm run test:watch  # Vitest watch
```

Known issue: `npm test` currently fails on this machine with `TypeError: Cannot read properties of undefined (reading 'config')` even for a trivial test, regardless of config. This is a Vitest runner/environment problem, not an app bug. `typecheck`, `lint` and `build` all pass. Investigate before relying on tests.

## Project structure

```
Havenly-frontned/
├── public/images/          # static assets (placeholder.svg)
├── src/
│   ├── app/                # routes (App Router)
│   │   ├── layout.tsx      # root layout: Providers, Header, Footer
│   │   ├── page.tsx        # home
│   │   ├── properties/     # listing page + [id] detail page
│   │   ├── about/  contact/
│   │   ├── loading.tsx  not-found.tsx
│   ├── components/
│   │   ├── ui/             # generic primitives (Button, ...)
│   │   ├── layout/         # Header, Footer
│   │   ├── property/       # PropertyCard, property-specific UI
│   │   └── home/           # home-page sections
│   ├── config/site.ts      # site name, nav links, URL
│   ├── data/properties.ts  # MOCK data (replace with API calls)
│   ├── hooks/              # custom hooks
│   ├── lib/                # utils.ts (cn, formatPrice), api.ts (fetch wrapper), validations.ts (zod)
│   ├── providers/          # client providers (theme, react-query)
│   ├── store/              # zustand stores (favorites)
│   ├── test/setup.ts       # Vitest setup (jest-dom)
│   └── types/              # shared TS types (Property)
├── .env.example            # copy to .env.local
├── .prettierrc
└── vitest.config.mts
```

Path alias: `@/*` → `src/*`.

## Conventions

- **Server Components by default.** Add `"use client"` only when you need state, effects, event handlers or browser APIs; keep client components small and leaf-level.
- **Files:** kebab-case filenames (`property-card.tsx`), PascalCase component names, named exports for components (default exports only for route files like `page.tsx`).
- **Styling:** Tailwind utility classes only; merge conditional classes with `cn()` from `@/lib/utils`. Support dark mode with `dark:` variants. Primary colour is emerald.
- **Types:** shared domain types live in `src/types`. No `any`; prefer `zod` schemas + `z.infer` for form/API shapes.
- **Data:** all backend calls go through `api()` in `src/lib/api.ts`, using `NEXT_PUBLIC_API_URL`. Until a backend exists, listings come from `src/data/properties.ts`.
- **Images:** use `next/image`; for remote images add the host to `images.remotePatterns` in `next.config.ts`.
- **Forms:** `react-hook-form` + `zodResolver`; define the schema in `src/lib/validations.ts`.
- **Tests:** colocate as `*.test.tsx` next to the component.
- **Accessibility/SEO:** semantic HTML, alt text, per-page `metadata` export (title template is `%s | Havenly`).
- **Currency/formatting:** use `formatPrice()`; rentals show `/mo`.

## Environment variables

Defined in `.env.example` (copy to `.env.local`, which is git-ignored):

- `NEXT_PUBLIC_SITE_URL` — public site URL
- `NEXT_PUBLIC_API_URL` — backend API base URL (default `http://localhost:5000/api`)
- `NEXT_PUBLIC_MAPS_API_KEY` — maps provider key (unused yet)

Never commit secrets. Anything prefixed `NEXT_PUBLIC_` is exposed to the browser.

## Current state / roadmap

Done: scaffold, layout, home, property list + detail (mock data), about, contact form (validation only; submit is a TODO), theme + query providers, favorites store (not yet wired to UI).

Next ideas: search & filters (city, price, beds, type), favorites button on cards, image gallery, map view, wire contact form and listings to the backend, dark-mode toggle in the header, mobile nav menu, auth.

## Working agreements for Claude

- Run `npm run typecheck && npm run lint && npm run build` after meaningful changes and report real results.
- Prefer editing existing files over adding new ones; keep changes scoped to what was asked.
- Don't add dependencies without saying why.
- Don't edit `.next/`, `node_modules/` or lockfiles by hand.

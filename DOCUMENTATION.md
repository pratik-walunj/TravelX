# TravelX — Project Documentation

Complete reference for the TravelX premium travel-agency website: what's built, how it's architected, and what's planned for the future.

- **Live site:** https://travel-x-gamma.vercel.app
- **CMS admin:** https://travel-x-gamma.vercel.app/keystatic
- **Repo:** https://github.com/pratik-walunj/TravelX
- **Hosting:** Vercel (auto-deploy on push to `main`)

---

## 1. Overview

TravelX is a production-quality frontend for a premium travel agency — selling domestic & international tours, generating leads, and enabling online bookings. It ships with a full file-based CMS (Keystatic + Keystatic Cloud) so non-developers can manage content on the live site.

**Status:** ✅ Live in production, CMS-managed, fully responsive.

---

## 2. Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router, React Server Components) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS 3, CSS variables (light/dark) |
| Animation | Framer Motion 12 |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Carousels | Embla, Swiper |
| CMS | Keystatic + Keystatic Cloud |
| Fonts | Poppins (headings) + Inter (body) via `next/font` |
| Hosting | Vercel |
| Tooling | ESLint (flat config), tsx, js-yaml |

---

## 3. ✅ What's DONE

### 3.1 Pages & routes (240 static pages)

| Area | Routes |
| --- | --- |
| Core | `/` `/about` `/contact` `/faq` `/search` |
| Destinations | `/destinations` + `/destinations/[slug]` (50) |
| Tours | `/tour-packages` + `/tour-packages/[slug]` (100) |
| Tour categories | `/luxury-tours` `/adventure-tours` `/family-tours` `/honeymoon-tours` `/pilgrimage-tours` `/weekend-tours` `/group-tours` `/corporate-tours` |
| Booking | `/booking` (7-step wizard) · `/payment-success` · `/payment-failed` |
| Services | `/services` `/visa-services` `/travel-insurance` `/hotel-booking` `/flight-booking` `/transportation` |
| Content | `/blog` + `/blog/[slug]` (50) · `/gallery` · `/videos` · `/testimonials` |
| Tools | `/custom-tour-planner` (AI planner UI, cost calculator, currency converter) |
| Account | `/wishlist` · `/compare` |
| Company / legal | `/career` `/privacy-policy` `/refund-policy` `/terms` |
| System | custom `404`, `loading`, `error`, `sitemap.xml`, `robots.txt`, `manifest.webmanifest` |

### 3.2 Design system
- Brand palette (Primary `#0F4C81`, Secondary `#14B8A6`, Accent `#F59E0B`) wired to CSS variables for **light & dark mode**.
- Typography: Poppins + Inter. Glassmorphism, soft shadows, large rounded corners, gradient utilities.
- Fully responsive (mobile → desktop), no horizontal overflow.

### 3.3 Reusable components & features
- **Navbar** with hover mega-menus (transparent-over-hero on home), announcement bar, full mobile drawer.
- **Cards** — package, destination, review, blog, category (single source of truth).
- **Wishlist & Compare** — `localStorage`-backed, cross-tab synced, floating compare tray.
- **Advanced filtering** — price, duration, category, rating, sort, grid/list, pagination.
- **7-step booking wizard** — dates → travellers → rooms → extras → details → payment → success, with animated stepper + live order summary.
- **AI Trip Planner UI**, cost calculator, currency converter.
- **Micro-interactions** — scroll reveals, animated counters, parallax, marquee, countdowns.
- **Conversion boosters** — recent-booking popups, seats-left urgency, offers with countdowns, sticky CTAs, WhatsApp/call floating buttons, cookie consent.
- **Forms** — newsletter, enquiry, hero search (React Hook Form + Zod).

### 3.4 Content Management (Keystatic CMS) — ✅ live
- Full admin UI at `/keystatic` (branded with the TravelX logo).
- **6 editable collections:** Blog Posts (50), Tour Packages (100), Destinations (50), Reviews (100), FAQs (30), Offers (6).
- **Keystatic Cloud** handles auth on the live site (no GitHub App/secrets to manage).
- **Live preview links** on Blog / Packages / Destinations entries.
- Content stored as YAML in `content/`, synced to typed JSON the app consumes (see §4.2).
- Edit → Save → commits to repo → Vercel redeploys → live update.

### 3.5 SEO
- Per-page metadata, Open Graph + Twitter cards, canonical URLs.
- JSON-LD structured data: Organization, Website, Product, FAQ, Breadcrumb, BlogPosting.
- `sitemap.xml`, `robots.txt`, PWA `manifest.webmanifest`.

### 3.6 Accessibility & performance
- Skip link, focus rings, ARIA, keyboard-navigable menus & lightboxes, reduced-motion support.
- Static-first (240 prerendered pages), `next/image` optimisation, dark-colour image fallbacks.

### 3.7 Deployment
- Deployed on **Vercel**, auto-deploys on push to `main`.
- Build regenerates `data/cms/*.json` from `content/` (`prebuild` hook), so it never depends on stale data.

---

## 4. 🏗️ Architecture

### 4.1 Folder structure
```
app/            App Router pages, layouts, route handlers, /keystatic admin
components/
  ui/           Design-system primitives (button, card, badge, input, tabs…)
  common/       Cross-cutting (icon, reveal, counter, breadcrumb, page-hero, chrome-gate…)
  cards/        Content cards
  layout/       Navbar, footer, announcement bar, floating actions, compare bar
  forms/        Newsletter, enquiry, search widget
  sections/     Page sections (hero, rails, stats, offers, service/legal templates)
  providers/    Theme + wishlist/compare + toaster
features/       Feature modules (booking, blog, gallery, faq, planner, search…)
hooks/          useLocalStorage, useMediaQuery, useMounted, collection stores
lib/            utils (cn), formatters
constants/      site config & navigation, services & legal content
types/          Shared domain types
data/           App data (generated from CMS) + non-CMS bits (images, stats)
  cms/          Generated JSON from content/ (npm run cms:sync)
content/        CMS source of truth (YAML), edited at /keystatic
scripts/        cms-sync.mts (content→data), migrate-all.mts (one-time seed→content)
keystatic.config.ts   CMS schema, storage mode, branding
```

### 4.2 Content data flow
```
Edit at /keystatic ──► content/<collection>/<slug>/index.yaml   (source of truth, git-tracked)
                            │  npm run cms:sync  (auto on predev / prebuild)
                            ▼
                       data/cms/*.json  ──►  data/*.ts  ──►  every page & component
```
Content files are the single source of truth. `cms:sync` reads them and regenerates typed JSON, so **all pages/components — server and client — keep working unchanged** with no async/hydration issues.

### 4.3 CMS storage modes (env-driven, `keystatic.config.ts`)
| Mode | Activator | Use |
| --- | --- | --- |
| Cloud ✅ | `NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT` | Production (in use) |
| GitHub | `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` + secrets | Self-hosted alternative |
| Local | *(none)* | Local dev on disk |

---

## 5. 🔌 Backend integration points (stubbed — search `TODO`)

The UI is complete; these are the places to wire real services:

| Feature | File | Marker |
| --- | --- | --- |
| Newsletter / enquiry form submit | `components/forms/*` | `TODO(backend)` |
| Booking creation + payment gateway | `features/booking/booking-wizard.tsx` | `TODO(backend)` |
| AI itinerary generation | `features/planner/trip-planner.tsx` | `TODO(AI)` |
| Live currency rates | `features/planner/travel-tools.tsx` | — |
| Error reporting (Sentry etc.) | `app/error.tsx` | `TODO(observability)` |

---

## 6. 🚀 Future roadmap (NOT yet done)

### High priority (to become a real, transactable product)
- [ ] **Real payment gateway** — integrate Razorpay/Stripe in the booking wizard; wire `/payment-success` & `/payment-failed` to real gateway callbacks.
- [ ] **Backend + database** — replace the `data/` layer with a real API/DB for bookings, users, leads. (Types in `types/index.ts` already model the API shape.)
- [ ] **Form handling** — connect newsletter/enquiry/contact forms to email or CRM (e.g. Resend, HubSpot); add spam protection.
- [ ] **Booking persistence** — save bookings, send confirmation emails, generate invoices/PDF itineraries.
- [ ] **Auth / user accounts** — login, "my trips", saved wishlists synced to an account (currently `localStorage` only).

### Medium priority
- [ ] **AI Trip Planner** — connect the planner UI to a real LLM endpoint for genuine itinerary generation.
- [ ] **Live currency converter** — swap static rates for a live FX API.
- [ ] **Real reviews** — Google/TripAdvisor API integration instead of seeded reviews.
- [ ] **Search** — server-side / typo-tolerant search (Algolia/Typesense) as the catalogue grows.
- [ ] **Analytics** — GA4 / Vercel Analytics + conversion tracking.
- [ ] **WhatsApp Business API** — real enquiry automation.
- [ ] **Multi-currency & i18n** — localisation and per-region pricing.

### Polish / assets
- [ ] Replace **Unsplash demo images** with owned/licensed CDN assets.
- [ ] Add real **`og.jpg`, favicons, PWA icons** in `public/` (and restore `icons` in `app/manifest.ts`).
- [ ] Optional **hero video** — drop `/public/hero.mp4` and enable the `<video>` block in `components/sections/hero.tsx`.
- [ ] **Rich-text blog bodies** — upgrade blog `body` from plain text to Keystatic MDX/markdoc.
- [ ] **Tests** — unit (Vitest) + E2E (Playwright) + Lighthouse CI.

### CMS enhancements
- [ ] Add more editable content types (team, careers/jobs, gallery, videos) to the CMS.
- [ ] Image uploads via Keystatic (`fields.image`) instead of URL fields.
- [ ] Editorial roles/permissions for multiple content editors.

---

## 7. 🛠️ Common workflows

### Edit content (non-developer)
1. Go to **https://travel-x-gamma.vercel.app/keystatic** → Sign in with Keystatic.
2. Edit a collection → **Save**. Wait ~1–2 min for Vercel to redeploy → live.

### Edit content locally (developer)
`npm run dev` → `http://localhost:3000/keystatic` (local mode, edits files) → `npm run cms:sync` → refresh. Commit & push.

### Change design / code
Edit in VS Code → `git push` → Vercel auto-deploys.

### Add a new content type or field
Edit the schema in `keystatic.config.ts` (code change), update `scripts/cms-sync.mts` + `data/*.ts` if the app consumes it, then push.

### Local scripts
```bash
npm run dev        # dev server (predev runs cms:sync)
npm run build      # prod build (prebuild runs cms:sync) — 240 pages
npm run cms:sync   # regenerate data/cms/*.json from content/
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

---

## 8. 📋 Known limitations
- **Keystatic admin UI is not deeply themeable** — it's a fixed, minimal design system (`@keystar/ui`). Only branding (logo/name), navigation grouping, columns, and preview links are configurable.
- **No backend yet** — bookings, forms, and payments are front-end only (see §5–6).
- **Demo images** are external (Unsplash); swap for production assets.
- **Content edits take ~1–2 min** to appear live (a Vercel rebuild per save).

---

*Last updated: after Keystatic Cloud go-live and admin polish. Keep this file current as features land.*

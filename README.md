# TravelX — Premium Travel Agency Frontend

A production-quality, enterprise-grade frontend for a premium travel agency, built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS** and **Framer Motion**. It sells domestic & international tours, generates leads, and is architected to plug into a real backend.

> 🎨 Modern-luxury design system · 🌗 Dark mode · ♿ Accessible · 🔍 SEO-optimised · ⚡ Static-first performance · 📱 Fully responsive

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (241 pages, static-first)
npm start        # serve the production build
npm run lint     # eslint
npm run typecheck# tsc --noEmit
```

Requires Node 18.18+ (built & tested on Node 24).

---

## What's inside

**50+ routes**, all interconnected and sharing one design system:

| Area | Routes |
| --- | --- |
| Core | `/` `/about` `/contact` `/faq` `/search` |
| Destinations | `/destinations` · `/destinations/[slug]` (50 pages) |
| Tours | `/tour-packages` · `/tour-packages/[slug]` (100 pages) |
| Categories | `/luxury-tours` `/adventure-tours` `/family-tours` `/honeymoon-tours` `/pilgrimage-tours` `/weekend-tours` `/group-tours` `/corporate-tours` |
| Booking | `/booking` (7-step wizard) · `/payment-success` · `/payment-failed` |
| Services | `/services` `/visa-services` `/travel-insurance` `/hotel-booking` `/flight-booking` `/transportation` |
| Content | `/blog` · `/blog/[slug]` (50 posts) · `/gallery` · `/videos` · `/testimonials` |
| Tools | `/custom-tour-planner` (AI planner UI + cost calculator + currency converter) |
| Account | `/wishlist` · `/compare` |
| Company | `/career` · `/privacy-policy` · `/refund-policy` · `/terms` |
| System | custom `404`, `loading`, `error`, `sitemap.xml`, `robots.txt`, `manifest.webmanifest` |

### Key features
- **Mega-menu navbar** (transparent-over-hero on home), mobile drawer, announcement bar
- **Reusable cards** — package, destination, review, blog, category (single source of truth)
- **Wishlist & Compare** — localStorage-backed, cross-tab synced, with a floating compare tray
- **Advanced filtering** — price, duration, category, rating, sort, grid/list, pagination
- **7-step booking flow** with animated stepper and live order summary
- **AI Trip Planner UI**, cost calculator, currency converter
- **Rich micro-interactions** — scroll reveals, animated counters, parallax, marquee, countdowns
- **Conversion boosters** — recent-booking popups, seats-left urgency, offers with countdowns, sticky CTAs, WhatsApp/call floating actions, cookie consent
- **SEO** — per-page metadata, Open Graph/Twitter, JSON-LD (Organization, Website, Product, FAQ, Breadcrumb, BlogPosting), sitemap & robots
- **Accessibility** — skip link, focus rings, ARIA, keyboard-navigable menus/lightboxes, reduced-motion support

---

## Project structure

```
app/                 # App Router pages, layouts, route handlers (sitemap/robots/manifest)
components/
  ui/                # Design-system primitives (button, card, badge, input, accordion, tabs…)
  common/            # Cross-cutting pieces (icon, reveal, counter, breadcrumb, page-hero…)
  cards/             # Reusable content cards
  layout/            # Navbar, footer, announcement bar, floating actions, compare bar
  forms/             # Newsletter, enquiry, search widget (React Hook Form + Zod)
  sections/          # Composable page sections (hero, rails, stats, offers, service/legal templates)
  providers/         # Theme + wishlist/compare + toaster providers
features/            # Feature modules (packages, destinations, booking, blog, gallery, faq, planner, search)
hooks/               # useLocalStorage, useMediaQuery, useMounted, collection stores
lib/                 # utils (cn), formatters
constants/           # site config & navigation, services & legal content
types/               # Shared domain types
data/                # Deterministic mock data (swap for a real API — see below)
```

---

## Design system

- **Colours** — Primary `#0F4C81`, Secondary `#14B8A6`, Accent `#F59E0B`, plus success/danger and a neutral scale. Wired to CSS variables for clean light/dark theming (`app/globals.css` + `tailwind.config.ts`).
- **Type** — Poppins (headings) + Inter (body) via `next/font`.
- **Tokens** — soft shadows, large rounded corners, glassmorphism helpers (`.glass-card`), gradient utilities (`.text-gradient`, `bg-hero-gradient`) and reusable section classes.

---

## Connecting a real backend

All data currently comes from the deterministic mock layer in [`data/`](./data). It's shaped exactly like a real API would return (see [`types/index.ts`](./types/index.ts)), so swapping is straightforward:

1. Replace the exports in `data/*.ts` with `fetch`/DB calls (ideally in a `services/` layer or Server Components / Route Handlers).
2. Search the codebase for **`TODO(backend)`**, **`TODO(AI)`** and **`TODO(observability)`** — these mark the exact integration points:
   - Newsletter & enquiry form submissions (`components/forms/*`)
   - Booking creation + payment gateway (`features/booking/booking-wizard.tsx`)
   - AI itinerary generation (`features/planner/trip-planner.tsx`)
   - Error reporting (`app/error.tsx`)
3. Wire live currency rates in `features/planner/travel-tools.tsx`.
4. Swap the demo image hosts in `next.config.mjs` (`images.remotePatterns`) for your CDN.

Mock data is generated with a fixed seed (`data/seed.ts`) so server and client render identical values — no hydration mismatches.

---

## Notes
- Images use Unsplash source URLs for the demo; replace with your own optimised CDN assets for production.
- The hero uses a static image; drop `/public/hero.mp4` and uncomment the `<video>` block in `components/sections/hero.tsx` for a video background.
- Add real `og.jpg`, favicons and PWA icons under `public/`.

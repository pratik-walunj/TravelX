# TravelX — Premium Travel Agency

A production-quality, enterprise-grade travel-agency website, built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS** and **Framer Motion**, with a full **Keystatic CMS**. It sells domestic & international tours, generates leads, and is deployed on **Vercel** with live content editing.

> 🎨 Modern-luxury design system · 🌗 Dark mode · ♿ Accessible · 🔍 SEO-optimised · ⚡ Static-first performance · 📱 Fully responsive · ✍️ CMS-managed content

**Live:** https://travel-x-gamma.vercel.app · **CMS:** https://travel-x-gamma.vercel.app/keystatic

> 📖 For a complete feature list, architecture, and roadmap, see **[DOCUMENTATION.md](./DOCUMENTATION.md)**.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (240 pages, static-first)
npm start        # serve the production build
npm run lint     # eslint (flat config, Next 16)
npm run typecheck# tsc --noEmit
npm run cms:sync # regenerate data/cms/*.json from content/ (auto-runs on dev/build)
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

## Content management (Keystatic CMS)

The site's content is managed through **[Keystatic](https://keystatic.com)** — a git/file-based CMS with a full admin UI. No database or external account required.

### Editing content
1. Run the dev server: `npm run dev`
2. Open the admin panel: **http://localhost:3000/keystatic**
3. Edit any of the six collections — **Blog Posts, Tour Packages, Destinations, Reviews, FAQs, Offers**. Changes are saved as files in `content/`.
4. Apply the changes to the site: **`npm run cms:sync`** (also runs automatically before `dev` and `build`), then refresh.

### How it flows
```
Edit at /keystatic  ──►  content/<collection>/<slug>/index.yaml   (source of truth, git-tracked)
                              │  npm run cms:sync  (auto on predev / prebuild)
                              ▼
                         data/cms/*.json   ──►  data/*.ts  ──►  every page & component
```
Content files are the single source of truth. `cms:sync` reads them via the Keystatic reader and regenerates the typed JSON in `data/cms/` that the app consumes — which keeps all pages/components (server **and** client) working unchanged, with no async/hydration issues.

### Key files
| File | Purpose |
| --- | --- |
| `keystatic.config.ts` | CMS schema — collections & fields |
| `app/keystatic/…`, `app/api/keystatic/…` | Admin UI + API route |
| `components/layout/chrome-gate.tsx` | Hides site header/footer on `/keystatic` |
| `content/` | The editable content (YAML files) |
| `scripts/cms-sync.mts` | Generates `data/cms/*.json` from content |
| `scripts/migrate-all.mts` | One-time seed → content migration (already run) |

### Editing content on the live (Vercel) site — Keystatic Cloud ✅ (in use)

The storage mode is **env-driven** (`keystatic.config.ts`), resolved from `NEXT_PUBLIC` vars so it's identical on server and client:

| Mode | How it activates | Notes |
| --- | --- | --- |
| **Cloud** ✅ | `NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT = team/project` | **Currently used.** Keystatic Cloud handles all GitHub auth — no GitHub App, no secrets. |
| GitHub | `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` + GitHub-App secrets | Self-hosted OAuth (more setup — see below). |
| Local | *(no env vars)* | Edits files on disk at `/keystatic`; used in local dev. |

**This project uses Keystatic Cloud.** The only production env var is:

```
NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT = travel-x/travelx
```

**Editing flow on the live site:**
1. Go to **https://travel-x-gamma.vercel.app/keystatic** → **Sign in with Keystatic**.
2. Edit any collection → **Save**.
3. Keystatic Cloud commits the change to `pratik-walunj/TravelX` → Vercel auto-redeploys → the site updates (~1–2 min).

**To set up Cloud on a fresh project:** create a project at **[keystatic.cloud](https://keystatic.cloud)**, connect your GitHub repo, then set `NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT` in Vercel and redeploy.

<details>
<summary>Alternative: self-hosted GitHub App mode (no Keystatic Cloud)</summary>

Set all five in Vercel (from `.env.example`) and create a GitHub App with callback `…/api/keystatic/github/oauth/callback`, Contents read/write, **User-to-server token expiration enabled** (Optional features tab — Keystatic requires the refresh-token flow):
```
NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO=owner/repo   NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=slug
KEYSTATIC_GITHUB_CLIENT_ID=…   KEYSTATIC_GITHUB_CLIENT_SECRET=…   KEYSTATIC_SECRET=…
```
Keystatic Cloud is simpler and recommended.
</details>

---

## Notes
- Images use Unsplash source URLs for the demo; replace with your own optimised CDN assets for production.
- The hero uses a static image; drop `/public/hero.mp4` and uncomment the `<video>` block in `components/sections/hero.tsx` for a video background.
- Add real `og.jpg`, favicons and PWA icons under `public/`.

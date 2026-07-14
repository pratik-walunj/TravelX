# Changelog

All notable changes to TravelX are documented here. Format based on
[Keep a Changelog](https://keepachangelog.com/). Dates are YYYY-MM-DD.

---

## [1.2.0] — 2026-07-14 · CMS on the live site + docs

### Added
- **Keystatic Cloud** storage mode (env-driven via `NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT`) — live content editing on the deployed Vercel site with no GitHub App or secrets to manage.
- Branded CMS admin: TravelX logo mark + **live "Preview" links** on Blog, Packages, and Destinations entries.
- Full project docs: `DOCUMENTATION.md`, plus updated `README.md` and `.env.example`.

### Changed
- Storage mode is now decided from `NEXT_PUBLIC_*` vars only, so it resolves **identically on server and client** (fixed a mode mismatch that caused a `/api/keystatic/tree` 404).

### Notes
- Self-hosted GitHub App mode is still supported as an alternative (requires the GitHub App's *User-to-server token expiration* to be enabled).

---

## [1.1.0] — 2026-07-13 · Keystatic CMS

### Added
- **Keystatic CMS** at `/keystatic` managing 6 collections — Blog Posts (50), Tour Packages (100), Destinations (50), Reviews (100), FAQs (30), Offers (6).
- Content pipeline: `content/*.yaml` (source of truth) → `scripts/cms-sync.mts` → `data/cms/*.json` → app. Auto-runs on `predev`/`prebuild`.
- `ChromeGate` to hide the site header/footer on the `/keystatic` route.
- One-time migration `scripts/migrate-all.mts` (seed data → content files).

### Changed
- `data/*.ts` now source from CMS-generated JSON (public API of each module unchanged, so no page rewrites were needed).

### Fixed
- Upgraded to **Next.js 16**; migrated `next lint` → ESLint flat config (`eslint.config.mjs`).
- Mobile nav drawer height bug (`h-dvh`), transparent-navbar contrast scrim, hero search-widget clipping, and dark image fallbacks.
- Contact details updated (phone/WhatsApp/address → Warje, Pune).

---

## [1.0.0] — 2026-07-11 · Initial site launch

### Added
Complete premium travel-agency frontend, built in 8 phases:
1. Project scaffold, design system, global layout & navigation.
2. Homepage (hero, destinations, package rails, offers, testimonials, CTA…).
3. Destination listing + 50 detail pages.
4. Tour-package listing (filters/sort) + 100 detail pages.
5. 7-step booking flow + payment success/failed pages.
6. Blog, Gallery, Contact, FAQ.
7. SEO (metadata, JSON-LD, sitemap, robots), accessibility, 404/error/loading, cookie consent, performance.
8. Mock data + remaining pages (about, services, wishlist, compare, search, testimonials, videos, career, custom planner, legal) and polish.

- **240+ pages**, reusable component system, wishlist/compare, AI trip planner UI, cost calculator, currency converter, dark mode, full responsiveness.

---

[1.2.0]: https://github.com/pratik-walunj/TravelX/commits/main
[1.1.0]: https://github.com/pratik-walunj/TravelX/commits/main
[1.0.0]: https://github.com/pratik-walunj/TravelX/commits/main

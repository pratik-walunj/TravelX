# Contributing to TravelX

Thanks for working on TravelX! This guide covers local setup, conventions, and
the workflows for changing **code** vs **content**.

> New here? Read **[DOCUMENTATION.md](./DOCUMENTATION.md)** first for the full
> architecture and feature map.

---

## 1. Prerequisites
- **Node 18.18+** (tested on Node 24)
- npm
- Git

## 2. Local setup
```bash
git clone https://github.com/pratik-walunj/TravelX.git
cd TravelX
npm install
npm run dev            # http://localhost:3000
```
`predev` auto-runs `cms:sync` (regenerates `data/cms/*.json` from `content/`).

**Verify before pushing:**
```bash
npm run typecheck      # tsc --noEmit  → must be 0 errors
npm run lint           # eslint        → must pass
npm run build          # 240 pages     → must succeed
```

---

## 3. Two kinds of changes

### A. Content changes (no code)
Edited by anyone via the CMS — no PR needed.
- **Live:** https://travel-x-gamma.vercel.app/keystatic → edit → **Save** (commits + auto-deploys).
- **Locally:** `npm run dev` → http://localhost:3000/keystatic → edit → `npm run cms:sync` → refresh → commit `content/` + `data/cms/`.

Content lives in `content/<collection>/<slug>/index.yaml`. **Never hand-edit `data/cms/*.json`** — it's generated.

### B. Code changes (design, features, schema)
Use a branch + PR (see §5). Common tasks:
- **New page** → add under `app/`, reuse `components/` + `features/`.
- **New/changed CMS field or collection** → edit `keystatic.config.ts`, then update `scripts/cms-sync.mts` and the matching `data/*.ts` mapping so the app consumes it. Run `npm run cms:sync` and typecheck.
- **Wire a backend** → search for `TODO(backend)`, `TODO(AI)`, `TODO(observability)` (see DOCUMENTATION §5).

---

## 4. Conventions
- **TypeScript everywhere**; keep `types/index.ts` as the source of domain types.
- **Reuse before adding** — check `components/ui`, `components/common`, `components/cards`, and section/template components first. Match the surrounding file's style, spacing, and naming.
- **Server Components by default**; add `"use client"` only when interactivity/hooks are needed.
- **Styling:** Tailwind + the design tokens/CSS variables in `app/globals.css` + `tailwind.config.ts`. Use brand utilities (`text-gradient`, `bg-hero-gradient`, `.glass-card`, `.section`) rather than ad-hoc values.
- **Images:** always `next/image` with a `sizes` prop; add a dark fallback bg for hero images.
- **Accessibility:** keyboard-navigable, `aria-*` where needed, visible focus, respect reduced-motion.
- **No secrets in code or committed files.** Use Vercel env vars / `.env.local` (git-ignored). See `.env.example`.

---

## 5. Branching & commits
- Branch off `main`: `feat/…`, `fix/…`, `docs/…`, `chore/…`.
- Small, focused commits with clear messages (imperative mood: "Add…", "Fix…").
- Open a PR into `main`. Ensure typecheck, lint, and build pass.
- Vercel builds a **preview deployment** per PR; merging to `main` deploys to production.
- Update **[CHANGELOG.md](./CHANGELOG.md)** for user-facing changes.

---

## 6. Deployment
- Hosting: **Vercel**, auto-deploy on push to `main`.
- The build runs `prebuild` → `cms:sync`, so `data/cms/` is always regenerated from `content/`. Both `content/` and `data/cms/` are committed (so a bare `next build` also works).
- CMS auth on the live site uses **Keystatic Cloud** (`NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT`).

---

## 7. Gotchas (learned the hard way)
- Vercel **env-var changes require a redeploy** to take effect.
- GitHub repo names are **case-sensitive** in config (`pratik-walunj/TravelX`).
- If pages 404 unexpectedly after a rebuild, delete `.next` and rebuild (stale cache).
- Keystatic's admin UI is a fixed design system — only branding/navigation/columns/preview are configurable.

Happy building! ✈️

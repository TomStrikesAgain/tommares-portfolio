# Career & Portfolio Team: Portfolio Web Application (tommares-portfolio)

You are operating within **Department 8: Career & Portfolio Team (Track A: Portfolio Web Application)**.
This directory contains the Next.js web application for [tommares.com](https://tommares.com), Tom Marès's personal portfolio and interactive case study platform.

---

## 🎯 Domain Scope & Mission

* **Team:** Career & Portfolio Team (Track A)
* **Primary Mission:** Maintain and evolve `tommares.com` as the living digital proof of Tom's career transition from commercial video producer to Senior IT Project Manager / Product Owner.
* **Core Subject:** Showcases **BandMath** as the ultimate demonstration of extreme software delivery, while preserving high-impact commercial video achievements.

---

## ⚡ The Mandatory Verification Gate

**CRITICAL INVARIANT:** Before declaring any frontend task complete or committing changes, you **MUST** run a full Next.js build check:

```bash
npm run build
```

* Zero TypeScript errors (`tsconfig.json`).
* Zero ESLint blockers (`eslint.config.mjs`).
* All asset references in `public/` must physically exist.

---

## 🎨 Visual Identity & Brand Standards

The portfolio site does **NOT** follow generic modern SaaS templates. It is built with a bespoke **1970s rock / Black Sabbath aesthetic**:

* **Color Palette:**
  * Signature Deep Purple: `#6325a6`
  * Pale Vintage Cream: `#f1ecd7`
  * Deep Backgrounds & Accents: Dark charcoals and warm ambers
* **Typography:**
  * **Logotype / Signature Branding:** `Fascinate` font
  * **Structural Section Headers:** `Anton` font (tall, structural, commanding)
  * **Body & UI Text:** Clean, readable sans-serif typography
* **Design Philosophy:** Bold, memorable, and creative, while maintaining absolute technical precision in case study presentations.

---

## 🔗 Shared Touchpoints with BandMath

Whenever BandMath hits a major milestone (e.g. Apple Tap to Pay on iPhone approval, Stripe Connect automated standalone fee reconciliation, automated E2E testing screenshot pipeline):
* Update the BandMath case study cards, metrics, and screenshots in `src/`.
* Ensure project descriptions reflect the narrative bridges established in [`CareerPath/TOM_MARES_MASTER_PROFILE.md`](file:///Users/tomhome/Development/CareerPath/TOM_MARES_MASTER_PROFILE.md).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

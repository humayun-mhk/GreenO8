# Greenova8 — Investor Landing Page Revamp

A handoff-ready Next.js landing page for the Greenova8 internship assignment owned by **Humayun**.

## What this package covers

- Public landing page revamp end to end
- Responsive fintech/clean-energy visual system
- Existing Greenova8 green/black brand cues, reworked for the new PRD
- Investor and project-developer conversion paths
- Real-data-only verified project feed adapter
- KYC / internal-ledger / payout-accuracy trust messaging
- Project performance data pipeline storytelling
- Investor support + human escalation UX
- GSAP scroll choreography
- Lightweight Three.js hero scene with CSS fallback
- SEO metadata, reduced-motion support and mobile art direction
- Product/QA/handoff documentation

## Important product decision

The **provided v1 PRD is treated as the source of truth**. Older public Greenova8 material describes a previous technology direction, while the new assignment specifies a standard fintech stack with bank/local payment rails and an internal ledger. This revamp follows the new assignment and avoids outdated technical positioning in investor-facing copy.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production checks:

```bash
npm run qa
npm run build
```

## Backend connection

Copy `.env.example` to `.env.local` and provide the backend URL:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_PROJECTS_ENDPOINT=/api/projects?status=verified&listed=true
```

There is intentionally **no fake project-data fallback**. Without a configured API, the marketplace section shows an integration-ready state. This follows the PRD rule that investor-facing numbers must come from real Postgres/external API data.

## Project structure

```text
app/
  globals.css            global design system + responsive styles
  layout.js              metadata / SEO shell
  page.js                landing route
components/
  LandingPage.js         complete public landing page
  ProjectFeed.js         verified-project API surface
  EnergyScene.js         Three.js hero visual + cleanup/fallback
  BrandLogo.js           Greenova8-inspired vector wordmark
  Icons.js               local SVG icon set
lib/
  api.js                  backend adapter
public/
  favicon.svg
docs/
  DESIGN-SYSTEM.md
  REPO-INSPIRATION.md
  HANDOFF.md
  QA-CHECKLIST.md
scripts/
  qa.mjs
  content-audit.mjs
preview.html              standalone visual preview
```

## Scope boundary

This is the **landing-page workstream**. It does not replace Saliqa's investor dashboard/investment flow, Haris/Hareem's auth/transaction APIs, or the ledger/payout engine. It is API-ready so those teams can connect their systems without Humayun inventing backend behavior.

See `docs/HANDOFF.md` for the exact integration checklist.

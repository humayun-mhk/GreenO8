# QA checklist

## Product
- [x] Landing page only; no dashboard ownership conflict.
- [x] $100 minimum comes from the provided PRD.
- [x] No guaranteed-return language.
- [x] No invented yield, payout, balance or project funding data.
- [x] Internal-ledger architecture represented.
- [x] Missing IoT/SCADA data is described as manual-review territory.
- [x] AI support escalation policy is represented.

## UX / accessibility
- [x] Sticky navigation and mobile menu.
- [x] Skip link.
- [x] Semantic sections/headings/buttons.
- [x] `aria-expanded` on mobile nav and FAQ.
- [x] Reduced-motion fallback.
- [x] Mobile-specific layouts at 900px and 620px.
- [x] Keyboard-visible native controls retained.

## Engineering
- [x] Next.js App Router structure.
- [x] No external font dependency.
- [x] Three.js cleaned up on unmount; pixel ratio capped.
- [x] GSAP context cleanup.
- [x] Fetch abort on unmount.
- [x] API adapter isolated in `lib/api.js`.
- [x] Structural and content-audit scripts included.

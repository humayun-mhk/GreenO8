# How the supplied repositories were applied

The repositories are mostly **agent skills/methodologies**, not UI kits to copy. They were used as design/development guidance rather than vendored wholesale.

- **garrytan/gstack** — applied the product/design/QA/release mindset: define the product story, build, review against requirements, then run structural/content QA.
- **juliusbrussee/caveman** — this is a token-efficiency skill rather than a frontend design library; no runtime dependency is appropriate. Its spirit is reflected in concise UI copy.
- **affaan-m/ECC** — influenced the verification-first approach, explicit data contracts, validation mindset and handoff documentation.
- **nextlevelbuilder/ui-ux-pro-max-skill** — used to frame a tailored fintech design system: palette, typography, spacing, conversion hierarchy and pre-delivery UX checks.
- **nateherkai/scroll-craft** — used for the chaptered scroll grammar, separate mobile art direction, depth planes and one signature story section rather than a generic sequence of six cards.
- **cloudai-x/threejs-skills** — the hero includes a lightweight Three.js energy/data network with a CSS fallback and careful cleanup/performance limits.
- **greensock/gsap-skills** — GSAP + ScrollTrigger drive reveal choreography, hero depth and the money-flow story, with React cleanup and reduced-motion fallback.
- **lottiefiles/motion-design-skill** — applied timing/choreography principles to micro-interactions, loaders, ambient motion and state communication. The repository is implementation-agnostic, so no Lottie runtime is required.
- **obra/superpowers** — applied the design-first → implementation → verification workflow and documented decisions before handoff.

## Why no repo was copied directly
The supplied repositories are tools for AI coding agents. Shipping their source inside Greenova8 would add unrelated dependencies and maintenance burden. The production page uses the relevant runtime libraries only where they add value (`gsap`, `three`).

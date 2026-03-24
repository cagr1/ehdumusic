# EHDU Premium Upgrade Plan

## Objective
Move EHDU from "good" to "premium showcase" quality inspired by high-end interactive portfolios, without overloading motion or hurting usability.

This plan is optimized for:
- Music producer landing page
- Strong visual identity
- Smooth perceived performance
- Real-world production constraints

## Creative Direction (Do not skip)

### Visual Direction
- Mood: dark cinematic + techno minimal
- Contrast: high contrast typography over controlled atmosphere
- Accent colors: max 2 accents at a time
- Rule: no random effects, every effect must support hierarchy

### Motion Direction
- Motion intensity target: 5/10
- Keep only meaningful movement: reveal, emphasis, transition
- Avoid constant background noise movement across full page
- Respect reduced motion users everywhere

### Performance Direction
- Target Lighthouse mobile: >= 90
- No section should drop below 50-55 FPS on modern laptop
- Avoid re-render storms from hover/scroll listeners

---

## Delivery Phases

## Phase 0 - Baseline and Guardrails (0.5 day)

### Goal
Lock quality baseline before adding new premium layers.

### Tasks
1. Capture baseline metrics
- Run Lighthouse mobile + desktop and save scores.
- Record bundle size from `npm run build`.
- Record rough FPS behavior in Hero + Media sections.

2. Freeze visual constraints
- Confirm typography pair, spacing scale, color tokens.
- Define motion tokens (duration/ease/stagger) in one place.

3. Set implementation guardrails
- Max 1 animation engine per section (GSAP OR Framer, not both heavily mixed).
- No per-item React state for hover effects in large lists.

### Files
- `README.md` (optional project notes)
- `plans/premium-upgrade-plan.md` (this file as source of truth)

### Exit Criteria
- Baseline metrics captured.
- Motion and visual constraints agreed.

---

## Phase 1 - Hero Premium System (1.5 to 2 days)

### Goal
Build a premium hero that feels authored and memorable.

### Tasks
1. Hero composition redesign
- Introduce layered depth: foreground typography, mid visual layer, subtle background atmosphere.
- Keep CTA and main message always readable.

2. Kinetic typography
- Add staged text entrance (sequence, not chaos).
- Add one signature text interaction (hover distortion/glitch micro, subtle).

3. CTA polish
- Add premium hover response (magnetic or directional highlight).
- Keep interaction latency low and readable.

4. Reduce visual clutter
- Remove any effect that competes with headline readability.

### Suggested Files
- `components/sections/HeroSection.tsx`
- `components/animations/IntroAnimation.tsx`
- `animations.css`

### Exit Criteria
- Hero has clear visual hierarchy in first 2 seconds.
- CTA is visually obvious and interaction feels premium.
- No noticeable frame drops on initial load.

---

## Phase 2 - Motion System Unification (1 day)

### Goal
Create one coherent motion language across all sections.

### Tasks
1. Motion tokens
- Standardize durations (fast, normal, slow).
- Standardize easing curves.
- Standardize stagger strategy.

2. Replace ad-hoc transitions
- Audit all `duration`, `delay`, and repeated animation literals.
- Replace with shared constants.

3. Section-level consistency
- Header reveals, card reveals, and modal transitions must feel related.

### Suggested Files
- `components/sections/*.tsx`
- `components/layout/Layout.tsx`
- `components/VideoModal.tsx`
- optional: create `constants/motion.ts`

### Exit Criteria
- Motion feels consistent page-wide.
- Reduced-motion fallback remains functional.

---

## Phase 3 - Media/Gallery Performance + Premium Feel (1 to 1.5 days)

### Goal
Keep gallery impressive and smooth under real usage.

### Tasks
1. Keep current optimizations and extend
- Preserve hover via CSS, avoid state-driven hover rerenders.
- Ensure expensive effects run only when visible.

2. Limit active animation load
- Animate only visible cards where possible.
- Avoid full-list stagger retriggers while scrolling.

3. Improve image handling
- Keep eager only for critical items.
- Ensure all non-critical media are lazy.

4. Interaction polish
- Keep carousel controls responsive.
- Add subtle feedback without heavy transforms.

### Suggested Files
- `components/sections/MediaSection.tsx`
- `components/gallery/GalleryGrid.tsx`
- `components/gallery/VideoSection.tsx`

### Exit Criteria
- Gallery interaction is smooth on desktop and acceptable on mobile.
- No obvious lag when hovering or nudging carousel.

---

## Phase 4 - Signature Layer (0.5 to 1 day)

### Goal
Add one memorable signature element tied to artist identity.

### Options (pick ONE first)
1. Audio-reactive minimal visual line/mesh in hero
2. Controlled glitch pulse tied to section transitions
3. Premium light sweep system tied to cursor position (subtle)

### Rule
- Signature must not hurt readability or navigation.
- Signature must degrade gracefully on low-power devices.

### Exit Criteria
- One distinct, ownable effect exists.
- Effect remains subtle and intentional.

---

## Phase 5 - Conversion and UX Polish (0.5 day)

### Goal
Make premium look also convert and feel complete.

### Tasks
1. CTA flow check
- Primary CTA always visible in hero and at section ends.
- Social links and media actions clearly accessible.

2. Microcopy alignment
- Tighten headings and supporting lines for confidence and clarity.

3. Mobile polish
- Check spacing rhythm and typography scale.
- Confirm touch targets and gesture comfort.

### Exit Criteria
- UX feels premium and practical, not just visual.

---

## Phase 6 - Technical Final Pass (0.5 to 1 day)

### Goal
Ship-ready quality bar.

### Tasks
1. Bundle and load
- Run `npm run build` and inspect largest chunks.
- Apply code splitting to heavy sections if needed.

2. Lighthouse pass
- Optimize until mobile score >= 90.

3. Accessibility pass
- Keyboard flow for modals and nav.
- ARIA labels where needed.
- Contrast checks for all key text.

4. Browser/device sanity
- Chrome + Safari + Firefox quick pass.
- Mobile viewport checks.

### Exit Criteria
- Performance, accessibility, and visual quality all pass minimum bar.

---

## Execution Checklist (Order)

1. Phase 0 baseline
2. Phase 1 hero premium
3. Phase 2 motion unification
4. Phase 3 media/gallery smoothness
5. Phase 4 signature effect
6. Phase 5 conversion polish
7. Phase 6 technical final pass

---

## Daily Working Protocol

For each day/sprint:
1. Pick 1 phase chunk only.
2. Implement smallest testable slice.
3. Run build + quick perf check.
4. Keep/remove changes based on objective metrics.
5. Document final decisions in `PROJECT_SUMMARY.txt`.

---

## Definition of Done (Premium)

Project is premium-ready only if all are true:
- Hero feels authored and memorable within 2 seconds.
- Motion is coherent, not noisy.
- Media section is smooth with no obvious lag.
- Mobile Lighthouse >= 90.
- Visual identity is consistent and intentional.
- One signature effect exists and is tasteful.

---

## Notes for "Inspired but not extreme"

Use inspiration for direction, not imitation.
- Keep effect density controlled.
- Keep readability and conversion first.
- Remove anything that looks impressive but adds friction.

This is the difference between "cool demo" and "premium production site".

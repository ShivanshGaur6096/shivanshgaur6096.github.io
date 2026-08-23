# Portfolio Redesign Roadmap

> **Last updated:** 2026-08-22
> **Direction:** Dark Interface with warmth
> **Current Phase:** Planning & Approval

---

## Phases Overview

| Phase | Description | Status |
|-------|-------------|--------|
| 1. Audit & Direction | Deep inspection, design audit, choose direction | ✅ Complete |
| 2. Design System | Define tokens, typography, colors, motion | ✅ Proposed (pending approval) |
| 3. Foundation | CSS variables, fonts, layout containers, theme setup | ⬜ Not started |
| 4. Core Sections | Rebuild hero, projects, experience, skills | ⬜ Not started |
| 5. Polish | Motion, hover states, transitions, micro-interactions | ⬜ Not started |
| 6. Responsive | Mobile, tablet, desktop, ultrawide compositions | ⬜ Not started |
| 7. Accessibility & Performance | A11y fixes, image optimization, loading | ⬜ Not started |
| 8. Final Review | Cross-browser, device testing, deploy | ⬜ Not started |

---

## Priority Items

### P0 — Must Fix

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Remove Skills Rain animation | ⬜ | Distracting, performance-heavy |
| 2 | Add max-width content container | ⬜ | Content stretches infinitely |
| 3 | Fix Contact subtext contrast | ⬜ | Currently ~1.5:1 ratio |
| 4 | Remove "Under Editing" video placeholder | ⬜ | Communicates incompleteness |
| 5 | Remove `dangerouslySetInnerHTML` | ⬜ | Security vulnerability |
| 6 | Fix heading hierarchy (h1 → h2 → h3) | ⬜ | Accessibility / SEO |

### P1 — High Impact

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Implement typography system (Geist + Inter + JetBrains Mono) | ⬜ | |
| 2 | Implement CSS custom properties color system | ⬜ | |
| 3 | Replace carousels with grid/vertical layouts | ⬜ | |
| 4 | Redesign hero (name + role + CTA + simplified visual) | ⬜ | |
| 5 | Rebuild Projects section as rich cards | ⬜ | |
| 6 | Implement full dark theme | ⬜ | |
| 7 | Add Framer Motion scroll-reveal to sections | ⬜ | |

### P2 — Polish

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Add hover micro-interactions to cards/buttons | ⬜ | |
| 2 | Rewrite hero parallax with GPU-accelerated transforms | ⬜ | |
| 3 | Add theme toggle (sun/moon) with localStorage | ⬜ | |
| 4 | Optimize images (WebP, lazy loading, sizing) | ⬜ | |
| 5 | Merge footer + contact into cohesive end section | ⬜ | |
| 6 | Add `:focus-visible` styles | ⬜ | |
| 7 | Implement proper font loading strategy | ⬜ | |

### P3 — Experimental

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Subtle ambient hero motion (gradient/stars) | ⬜ | |
| 2 | Page/route transitions with AnimatePresence | ⬜ | |
| 3 | Expandable project case-study detail | ⬜ | |
| 4 | Anchor-based smooth scroll nav with active states | ⬜ | |
| 5 | Custom `::selection` color | ⬜ | |
| 6 | Audio micro-sounds (icon hover, shuffle effect) + mute toggle | ⬜ | Future phase |
| 7 | Localization (EN, HI, DE, FR, ES) + language switcher | ⬜ | Future phase |
| 8 | Theme toggle (light/dark) icon in hero bottom-right | ⬜ | Depends on color system |

---

## Decisions Pending

- [ ] Approve chosen direction (Dark Interface with warmth)
- [ ] Approve typography choices (Geist + Inter + JetBrains Mono)
- [ ] Approve color palette
- [ ] Decide: keep parallax hero concept or simplify to static?
- [ ] Decide: single page or multi-page (route per project)?
- [ ] Content: rewrite copy for hero subtitle, project descriptions, about section

## Decisions Made

- [x] Skip video splash — use static images for hero (video shelved for later)
- [x] Plan Next.js migration — but stay on React/CRA during exploration phase
- [x] No forced loader — use orchestrated entrance animation instead

---

## Notes

- Implementation will NOT begin until direction is approved.
- Each phase will be reviewed before proceeding to the next.
- Inspiration references will be collected in `docs/INSPIRATION.md`.

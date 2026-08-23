# Portfolio Project Context

## Project Overview
This is Shivansh Gaur's personal portfolio website — an iOS Developer portfolio being redesigned from a basic React CRA app into a premium, dark-interface website.

## Tech Stack
- React 19 (Create React App) — migrating to Next.js later
- Framer Motion 12.4 for animations
- react-intersection-observer for scroll detection
- Plain CSS with CSS custom properties (no Tailwind, no CSS-in-JS)
- Deployed to GitHub Pages via gh-pages

## Design Direction
- "Dark Interface with warmth" — dark-mode-first, technical sophistication with personal touches
- Inspired by Linear, Vercel, Raycast aesthetic
- NOT a cold SaaS dashboard — infuse warmth through personality and color accents

## Design System (always reference)
- **Fonts:** Syne (logo/name only), Inter (headings + body), JetBrains Mono (labels/metadata)
- **Colors:** CSS custom properties only — never hardcode hex values in components
- **Dark theme:** primary (`--bg-primary: #09090b`), zinc-based neutrals, blue accent (`#3b82f6`)
- **Spacing:** Use spacing tokens (`--space-*`)
- **Max content width:** 1200px, absolute max 1400px
- **Border radius:** 8px buttons, 12px cards, 6px tags

## Animation Rules
- Duration scale: 150ms (micro), 300ms (standard), 500ms (entrance), 800ms (hero)
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for entrances
- ALWAYS support `prefers-reduced-motion` — skip transforms, allow opacity only
- Use `requestAnimationFrame` with elapsed-time calculation (not frame counting)
- No animation for animation's sake — motion must communicate hierarchy, state, or continuity

## Coding Standards
- Components in their own folders when they have hooks, sub-components, or CSS files
- Custom hooks extracted into `hooks/` subdirectory within component folder
- SVG icons as React components using `currentColor`
- No `dangerouslySetInnerHTML` — ever
- Semantic HTML (proper heading hierarchy, landmarks, aria-labels)
- All interactive elements must be keyboard-accessible
- No new dependencies without justification — prefer custom implementations for small utilities

## Project Architecture & Maintainability

### File Organization
- **Feature-based folders:** Each major section (HeroSection, Projects, Experience, etc.) is its own folder with component, CSS, hooks, and data co-located
- **Flat within a feature:** Don't nest folders deeper than one level inside a feature folder (e.g., `HeroSection/hooks/` is fine, `HeroSection/hooks/utils/helpers/` is not)
- **Shared utilities** go in `src/utils/` — only if used by 2+ features
- **Shared hooks** go in `src/hooks/` — only if used by 2+ features
- **Design tokens / global styles** live in `src/styles/` or `src/index.css`

### Component Principles
- **Single responsibility:** One component does one thing. If it's getting long (>150 lines), split it.
- **Props over context** for component communication within a feature. Use React context only for truly global state (theme, language).
- **Data files separate from components:** Content (text, arrays, URLs) lives in `*Data.js` files, not inline in JSX. This makes future localization and content updates easy.
- **No prop drilling beyond 2 levels.** If you need to pass something deeper, restructure or use composition.

### CSS Practices
- **One CSS file per feature folder** (not per sub-component). Keeps styles co-located but not fragmented.
- **BEM-lite naming:** `.hero-section`, `.hero-section__title`, `.hero-section--dark`. Predictable, scannable, no collisions.
- **CSS custom properties for anything that changes** (colors, spacing, sizes). Hardcoded values only for truly fixed things (like `border-radius: 50%` on a circle).
- **Mobile-first media queries** (min-width) OR desktop-first (max-width) — pick one and be consistent. We use `max-width: 768px` for mobile overrides.
- **No global element selectors** (like styling all `h2` or `p` tags). Always scope to a class.

### Data & Content
- **All user-facing text in data files** — makes future localization a simple file swap
- **URLs and links in data files** — changing a link shouldn't require touching component logic
- **Image paths use `process.env.PUBLIC_URL`** for GitHub Pages compatibility
- **Avoid magic numbers** — if a value has meaning (like 8 taps before game over), make it a named constant

### Hooks & Logic
- **Pure logic hooks are testable in isolation** — no DOM dependencies, just input → output
- **Animation hooks accept configuration** (duration, easing) rather than hardcoding — allows tuning without code changes
- **Hooks return stable interfaces** — even if internal implementation changes, the return shape stays the same

### Future-Proofing (for Next.js migration)
- **No CRA-specific APIs** (don't use `react-scripts` internals, ejected configs, etc.)
- **Components are pure React** — no references to CRA's dev server, build system, or folder conventions
- **Use `process.env.PUBLIC_URL` for assets** — maps cleanly to Next.js `/public` folder
- **No client-side routing patterns that conflict with file-based routing** — keep it a single page for now

### When to Refactor
- If you copy-paste code between two components → extract a shared utility or hook
- If a CSS file exceeds 300 lines → consider splitting the feature into sub-features
- If a component has more than 5 props → consider composition or a context wrapper
- If changing content requires touching component logic → move content to a data file

## Content
- Resume: Primary link is Google Drive URL (updates without redeploy). Local fallback at `public/assets/resume/`
- Social links: GitHub, LinkedIn, Email — minimal aria-labels (just the platform name)
- Professional tone with personality — not corporate, not overly casual

## Design Checklist (apply to every new feature/section)
When discussing or implementing anything for this portfolio, always consider these three perspectives:

1. **Responsive:** How does it look/behave on desktop (wide) vs mobile (compact)? Think of them as two different compositions, not just "shrink the desktop."
2. **Theming:** How does it look in dark mode AND light mode? Both must feel intentionally designed.
3. **Accessibility:** Will it be read correctly by VoiceOver/screen readers for visually impaired users? Proper semantic HTML, aria-labels, heading hierarchy, and focus management.

These three are non-negotiable for every element we add. If any are unclear during discussion, raise them before implementation.

## What NOT to do
- Don't use Bootstrap, Tailwind, or utility-class frameworks
- Don't add loaders/spinners — prefer orchestrated entrance animations
- Don't use carousel/horizontal-scroll patterns for desktop content
- Don't add scroll-down indicators
- Don't hardcode colors — always use CSS custom properties
- Don't add audio/video that autoplays unmuted
- Don't install packages without discussing first
- Don't modify docs/ files without briefly mentioning what changed

## Key Documents (reference when needed)
- `docs/DESIGN_AUDIT.md` — Full audit findings and section analysis
- `docs/DESIGN_SYSTEM.md` — Tokens, typography, colors, spacing, motion, components
- `docs/ROADMAP.md` — Prioritized plan with status tracking
- `docs/DECISIONS.md` — All design/implementation decisions with rationale
- `docs/GLOSSARY.md` — Terminology reference
- `docs/INSPIRATION.md` — Visual references and inspiration

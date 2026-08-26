# Portfolio Project Context & Guidelines

## Project Overview
This is Shivansh Gaur's personal portfolio website — an iOS Developer portfolio being redesigned into a premium, dark-interface website.

## Tech Stack & Architecture
- **React 19** with plain Vanilla CSS (using CSS custom properties / tokens).
- **Framer Motion 12.4** for animations.
- **react-intersection-observer** for scroll and in-view detection.
- **No TailwindCSS / No CSS-in-JS** — use vanilla CSS design tokens from `src/index.css`.
- **Deployed to GitHub Pages** via `npm run deploy`.

## Design System & Rules
- **Design Direction**: "Dark Interface with warmth" (inspired by Linear, Raycast, Apple developer marketing).
- **Fonts**:
  - `Syne` (weight 800) for Logo / Name only (`--font-logo`).
  - `Inter` (weights 400–700) for Headings and Body (`--font-heading`, `--font-body`).
  - `JetBrains Mono` (weight 400) for labels, tags, and metadata (`--font-mono`).
- **Colors**: Always use CSS custom properties from `:root` (`--bg-primary: #09090b`, `--text-primary`, `--accent: #3b82f6`, `--border-*`, etc.). Never hardcode hex values in component styles.
- **Motion & Accessibility**:
  - Always support `prefers-reduced-motion` (skip transforms, allow opacity only).
  - Use `requestAnimationFrame` with elapsed time calculations.
  - All interactive elements must have proper semantic HTML, accessible `aria-label`, and keyboard focus (`tabIndex={0}`, Enter/Space handlers).

## Coding & Structure Guidelines
- **Feature Folders**: Each major section lives in its own folder (e.g. `src/components/HeroSection/`) with co-located components, CSS, hooks, and data.
- **Data files**: User-facing text, lists, and URLs live in `*Data.js` files rather than hardcoded in JSX.
- **SVG Icons**: Built as clean React SVG components using `currentColor`.
- **No unnecessary dependencies**: Prefer lightweight custom hooks and vanilla CSS over external packages.
- **Analytics & Telemetry**:
  - Centralized in `src/services/analyticsService.js`.
  - Privacy-first Google Analytics 4 (GA4 ID: `G-6QFHXKHNNG`) configured with IP anonymization and dynamic `debug_mode` (active on `localhost`, disabled in production).
  - Every new interactive feature (e.g. modals, external links, expandable accordions, interactive widgets, CTAs) must dispatch semantic GA4 events via `trackEvent()` / convenience helper functions.

## Non-Negotiable Perspectives for Every Feature
1. **Responsive**: Looks intentional on both Desktop (>768px) and Mobile (<=768px).
2. **Theming**: Uses design system tokens consistently.
3. **Accessibility**: Semantic headings (`h1` -> `h2`), polite `aria-live` for dynamic changes, accessible roles.
4. **Telemetry & Event Tracking**: Any user interaction, modal toggle, outbound link, or download must be wired to `src/services/analyticsService.js` with structured event names and metadata.


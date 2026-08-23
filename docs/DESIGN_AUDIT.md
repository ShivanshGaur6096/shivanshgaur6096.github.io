# Design & UX Audit Report

> **Date:** 2026-08-22
> **Auditor Role:** Senior Product Designer / UX-UI / Art Director / Creative Frontend Engineer
> **Status:** Complete — Awaiting direction approval

---

## 1. Executive Summary

The portfolio is a React-based single-page application featuring a parallax hero scene with layered images (mountains, moon, iPhone), a falling skills rain effect, horizontally scrolling carousels for experience/education/projects, a contact section, and a minimal footer. The site uses Framer Motion for hero animations and a night-sky aesthetic for the landing.

The site demonstrates ambition and technical curiosity, but currently reads as an early-stage personal project rather than a premium professional portfolio. The primary issues are: lack of a cohesive design system, generic layout patterns (carousels for everything), weak typographic hierarchy, no true light/dark mode system, inconsistent spacing, and several elements that feel unfinished or placeholder-like (the "Under Editing" video box, "Standing tall at 6ft" footer copy).

The good news: the structural foundation (React 19, Framer Motion, Intersection Observer) is solid and gives excellent tools to build something exceptional on top of.

---

## 2. Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 (Create React App) |
| Animation | Framer Motion 12.4 |
| Scroll Detection | react-intersection-observer |
| Video | react-player (unused currently) |
| Routing | react-router-dom 7.2 (not actively used) |
| Deployment | GitHub Pages (gh-pages) |
| Styling | Plain CSS (no preprocessor, no CSS-in-JS, no utility framework) |
| Fonts | Poppins (Google Fonts, imported in LandingPage.css only) + system fallback (Arial) |

---

## 3. Current Strengths

- **Solid tech stack.** React 19, Framer Motion, React Intersection Observer — appropriate, modern tools for a premium animated portfolio.
- **Layered parallax concept.** The hero with mountains/moon/iPhone demonstrates spatial thinking and creative intent. The concept of depth through scrolling is a strong starting point.
- **Social links accessible from both hero and contact.** Good redundancy for key CTAs.
- **Toolbar reveal on scroll.** The intersection observer pattern for the sticky nav is technically well-implemented and shows UX awareness.
- **Clear section organization.** Hero → Skills → Experience → Education → Projects → Achievements → Contact → Footer. The information architecture is logical.
- **Skills filtering.** The filter-by-category pattern in the Skills section is functional and interactive.
- **Real shipped projects.** Bell, Virgin Plus, Lucky Mobile, PC Mobile, MagicCall — major apps with App Store links. This is genuinely strong content.

---

## 4. Critical Weaknesses

| Area | Problem |
|------|---------|
| **Typography** | No intentional type system. Default system fonts (Arial) and a Google Fonts import for Poppins only in the LandingPage CSS. No hierarchy beyond font-size changes. |
| **Color system** | No defined palette. Colors are scattered: `#ffd700`, `#007bff`, `#6a11cb`, `#2575fc`, `#3cd08d`, `#4d88e1` — these don't form a coherent brand. |
| **No dark/light mode** | Despite the dark hero background, the rest of the page assumes a white/light background with no toggle or system preference detection. |
| **Layout** | Horizontal carousels for experience, education, projects, and achievements are mobile-centric patterns that feel awkward on desktop. Content has no max-width constraint — stretches infinitely. |
| **Visual inconsistency** | The hero feels like one website (moody, dark, atmospheric), and the body feels like a different website (plain white, generic cards). |
| **Unfinished elements** | "Under Editing / Coming Soon" video placeholder, "Standing tall at 6ft" footer copy, placeholder certificate IDs. |
| **Skills Rain** | Fixed-position falling images over the entire viewport is visually distracting, blocks readability, and serves no information purpose. |
| **Accessibility** | No heading hierarchy, no skip navigation, no focus styles, no ARIA landmarks, very low contrast on muted text. |
| **Responsive design** | No intentional compositions for tablet/desktop. On wide screens, carousels are small ribbons floating in empty space. |
| **Performance** | Numerous unoptimized PNG images, no lazy loading, falling skills animation creates continuous DOM manipulation and repaints. |

---

## 5. Visual Hierarchy Analysis

### What a visitor notices first:
1. Dark starry background (atmospheric)
2. "Shivansh Gaur" name (large, centered, white on dark)
3. Moon and mountain imagery (decorative)
4. "Under Editing" placeholder (negative impression)

### Problems:
- No subtitle or role descriptor — visitors must scroll to understand what you do.
- No CTA guiding next action.
- After the hero, visual hierarchy collapses — all sections look the same (h2 + carousel).
- Headings, body text, metadata, and CTAs are not properly differentiated.
- Too much competing for attention in the hero (moon, mountain, iPhone, video placeholder, social icons, plant).

---

## 6. Typography Evaluation

### Current state:
- `Arial, sans-serif` as global body font (generic, no personality)
- `Poppins` imported via `@import url()` in LandingPage.css only (not used globally)
- No type scale — sizes set ad-hoc: 80px title, 40px h1, 28px contact title, 18px body, 14px labels
- No font weight system
- No line-height system
- No letter-spacing adjustments
- Heading hierarchy is flat (everything is `<h2>`)

### Issues:
- Arial communicates "I didn't choose a font" — it's the absence of a decision.
- Poppins is only applied within LandingPage component — rest of site uses Arial.
- No contrast between heading weight and body weight.
- Paragraph text uses default line-height (1.6 in body rule) — acceptable but not refined.
- No responsive type scaling.

---

## 7. Color Evaluation

### Current colors in use:
| Color | Usage | Assessment |
|-------|-------|-----------|
| `#ffd700` | Primary button (gold) | Uncommon choice, no relationship to other colors |
| `#007bff` | Filter active, links (Bootstrap blue) | Generic, signals "default Bootstrap" |
| `#6a11cb → #2575fc` | Toolbar gradient (purple to blue) | Feels like a tutorial gradient |
| `#3cd08d` | About section background (green) | Unused currently but defined |
| `#4d88e1` | Nav hover (blue) | Yet another blue, different from #007bff |
| `#333` | Body text | Fine but not part of a system |
| `#000` | Footer background | Harsh pure black |
| `white` | Hero text, dark mode text | Default |
| `#ddd` | Contact subtext | Extremely low contrast on white bg |

### Assessment:
- No coherent palette. At least 4 different blues used independently.
- No semantic naming (what is "primary"? what is "accent"?).
- No surface/background hierarchy.
- Colors feel randomly chosen per-component rather than designed as a system.
- The gold `#ffd700` has no relationship to anything else.

---

## 8. Spacing & Layout Evaluation

### Current state:
- No global container or max-width
- `main { padding: 20px }` — minimal, no responsive adjustment
- `section { margin-bottom: 40px }` — uniform, no rhythm
- No grid system
- Carousel items are `width: 150px` — tiny on desktop
- No intentional whitespace — sections feel cramped then suddenly spacious

### Issues:
- On a 1920px screen, content stretches edge-to-edge with only 20px padding.
- No visual rhythm — every section has identical spacing regardless of content density.
- Carousel pattern forces horizontal scrolling on desktop where vertical space is abundant.
- No alignment system — elements are centered by default with no grid structure.

---

## 9. Visual Personality Assessment

### What the current website communicates:
- **Technical student project** — Default fonts, Bootstrap blue, carousel patterns signal "learning project."
- **Unfinished / In Progress** — Multiple placeholder elements reinforce this.
- **iOS Developer** — iPhone imagery, Apple-centric skills, and app screenshots communicate the specialization.
- **Night/Space aesthetic (hero only)** — Stars background and moon create atmosphere, abandoned after hero.

### What the portfolio SHOULD communicate:
- **Technically competent and detail-oriented** — Someone trusted with apps used by millions.
- **Professional but not corporate** — A creative individual, not a consulting firm.
- **Apple-ecosystem fluent** — Design sensibility aligned with Apple's own aesthetic values.
- **Calm confidence** — Not flashy or desperate for attention.

---

## 10. Design Directions Explored

### Direction A: "Quiet Craft" — Editorial Minimalism

**Overall feeling:** Clean, confident, text-forward. Inspired by Apple's own product pages and high-end editorial design.

**Typography:** Inter or SF Pro Display for headings, Inter or system-ui for body. Large type sizes, generous line height, strong weight contrast.

**Color:** Near-white backgrounds (#fafafa), deep charcoal text (#1a1a1a), one muted accent. Dark mode: near-black (#0a0a0a) with soft white text.

**Layout:** Generous whitespace, max-width containers (1200px), full-bleed project images, vertical rhythm.

**Motion:** Subtle fade-up on scroll reveal, smooth hover transitions, no decorative animation.

**Why it fits:** Apple developers understand restraint and taste. This demonstrates those values.

**Risks:** Can feel too safe or too similar to hundreds of minimalist developer portfolios unless typography and content are exceptional.

---

### Direction B: "Dark Interface" — Technical Sophistication

**Overall feeling:** Dark-mode-first, code-adjacent, sleek. Inspired by Linear, Vercel, Raycast.

**Typography:** JetBrains Mono for accents, Inter/Geist for body. Monospace elements for labels, dates, technical info.

**Color:** Dark backgrounds (#09090b), subtle borders (rgba white at 8%), blue/violet accent, subtle gradients on cards. Light mode as alternative with cool grays.

**Layout:** Card-based with subtle borders and glass-like surfaces. Grid layouts. Compact density.

**Motion:** Micro-animations on hover (subtle glow, border color shift), smooth transitions, reduced parallax.

**Why it fits:** Communicates living in Xcode and terminals. Feels "developer tool" rather than "brochure." The current dark hero already leans this direction.

**Risks:** Can feel cold or unapproachable. Needs strong content and personality in copy.

---

### Direction C: "Personal Narrative" — Storytelling-First

**Overall feeling:** Warm, personal, scroll-driven storytelling. Case-study-heavy, long-form editorial.

**Typography:** Distinctive serif for display headings (Fraunces, Lora), clean sans for body.

**Color:** Warm neutrals (cream/warm white), rich accent colors from project imagery. Dark mode with warm charcoal.

**Layout:** Full-width hero, alternating layouts, pull quotes, timeline-style experience.

**Motion:** Scroll-triggered reveals, parallax on project images, smooth transitions.

**Why it fits:** Differentiates from minimal developer portfolios. Tells career story. Humanizes technical work.

**Risks:** Requires strong writing. Can feel heavy on mobile. Serif needs careful calibration.

---

## 11. Chosen Direction

### **Direction B ("Dark Interface") with warm elements from Direction C**

**Rationale:**
1. Hero already establishes a dark, atmospheric tone — extending creates coherence.
2. "Dark interface" aligns with Xcode, dark-mode-first development culture, and Apple's developer tool marketing.
3. Colorful project screenshots and logos POP against dark backgrounds.
4. Mono-accent elements naturally fit a developer portfolio.
5. Adding warmth through copy and color prevents sterility.

**Key modification:** Don't make it a cold SaaS dashboard. Infuse warmth through selective warm accent color, personality in copywriting, and human touches.

---

## 12. Motion Audit

### Current state:
- Hero parallax via manual `window.scrollY` — functional but janky (uses marginTop/marginLeft, triggers layout).
- Skills Rain — continuously spawns/drops DOM elements. Distracting, performance-heavy, no UX purpose.
- Framer Motion imported but only used for `useScroll`/`useTransform` on title font-size. Massively underutilized.
- No section entrance animations.
- No hover micro-interactions beyond basic CSS transforms.

### Recommendations:
- **Remove Skills Rain entirely.**
- **Replace manual scroll handler** with Framer Motion `useTransform` using `translateX`/`translateY` (GPU-accelerated).
- **Add scroll-reveal** to sections via Framer Motion + Intersection Observer.
- **Add hover micro-interactions** to cards and buttons.
- **Support `prefers-reduced-motion`** — all motion replaced with instant or opacity-only.

---

## 13. Responsive Design Audit

### Current state:
- Only two media queries: 768px and 480px, both only touching image sizes.
- Hero parallax elements use absolute positioning — awkward on mobile.
- Carousels work on mobile but are invisible/unintuitive on desktop.
- No max-width anywhere.
- No grid system.

### Key issues by breakpoint:
- **320–430px:** Hero too cluttered, parallax elements overlap, social icons cramped.
- **768px:** Awkward middle ground — not mobile, not desktop. Carousels look lost.
- **1024–1280px:** Content stretches, carousels are tiny ribbons in vast white space.
- **1920px+:** Everything edge-to-edge, extremely poor readability.

---

## 14. Accessibility & Performance Findings

### Accessibility:
| Issue | Severity |
|-------|----------|
| No `<h1>` in document body | High |
| Multiple `<h2>` without proper hierarchy | High |
| No skip-navigation link | Medium |
| No focus-visible styles | Medium |
| Contact subtext contrast ratio ~1.5:1 (needs 4.5:1) | High |
| Modal has no focus trap or role="dialog" | High |
| `dangerouslySetInnerHTML` — XSS vector | High |
| No `prefers-reduced-motion` support | Medium |
| Touch targets potentially < 44px | Medium |

### Performance:
| Issue | Impact |
|-------|--------|
| Skills Rain continuous DOM manipulation | High |
| Manual scroll listener triggers layout every frame | High |
| No image lazy loading | Medium |
| No image optimization (PNGs → WebP/SVG) | Medium |
| Font loaded via `@import url()` — render-blocking | Medium |
| Unused App.css boilerplate | Low |
| No code splitting | Low |

---

## 15. Section-by-Section Analysis

### Hero / Landing Page
- **Works:** Atmospheric concept, social links accessible, creative parallax idea.
- **Doesn't work:** No subtitle/role, "Under Editing" placeholder, parallax moves elements offscreen, no CTA.
- **Recommendation:** Simplify composition, add role subtitle, remove placeholder, add scroll indicator.

### Skills
- **Works:** Filter-by-category is interactive.
- **Doesn't work:** Tiny grid squares, "Show more" opens overlay, inconsistent states.
- **Recommendation:** Clean tag/chip grid by category, remove images, keep filters as styled pills.

### Experience
- **Works:** Clean data structure.
- **Doesn't work:** Carousel illegible on desktop, no role descriptions, logo/title mismatch.
- **Recommendation:** Vertical timeline with bullets of impact. Connect to projects.

### Education
- **Doesn't work:** Same carousel problem. Less important than experience for a 4+ year professional.
- **Recommendation:** Compact list below experience. Reduce visual weight.

### Projects
- **Works:** Real projects with App Store links.
- **Doesn't work:** Carousel hides them, modal uses dangerouslySetInnerHTML, no role/tech info.
- **Recommendation:** Grid of rich cards with role, tech stack, impact. Featured project gets more space.

### Achievements
- **Doesn't work:** Same carousel, placeholder IDs.
- **Recommendation:** Merge into experience or make compact subsection.

### Contact
- **Works:** Clear purpose, centered.
- **Doesn't work:** Emoji in title, invisible subtext, duplicate of hero links, frosted glass on white.
- **Recommendation:** Full-width dark section, prominent email, availability status.

### Footer
- **Doesn't work:** "Standing tall at 6ft" unprofessional, jarring black on white page.
- **Recommendation:** Minimal — copyright + links. Integrate with contact section.

---

## 16. "Million-Dollar Website" Opportunities

### High Impact / Low Effort
1. Remove Skills Rain animation.
2. Add CSS custom properties for colors.
3. Set max-width on content containers.
4. Replace Arial with proper font system.
5. Fix contrast issues.
6. Remove "Under Editing" placeholder.
7. Remove "Standing tall at 6ft" copy.

### High Impact / Medium Effort
1. Rebuild Projects section as grid with rich cards.
2. Implement full dark theme with CSS variables.
3. Replace carousels with vertical layouts.
4. Add Framer Motion scroll-reveal.
5. Implement proper responsive breakpoints.
6. Redesign hero (name + role + CTA + simplified visual).

### High Impact / High Effort
1. Full typography system implementation.
2. Theme toggle with persistence and system preference.
3. Case-study-style project presentation.
4. Accessible modal with focus trap.
5. Page transition animations.
6. Image optimization pipeline.

### Low Impact / Avoid
- Cursor effects, background particles, text scramble, excessive glassmorphism, auto-play video, complex 3D, parallax on every section.

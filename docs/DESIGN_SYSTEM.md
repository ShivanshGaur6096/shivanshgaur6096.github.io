# Design System

> **Status:** Proposed — Pending approval
> **Last updated:** 2026-08-22
> **Direction:** Dark Interface with warmth

---

## 1. Typography

### Font Stack

| Role | Font | Fallback | Weight | Usage |
|------|------|----------|--------|-------|
| Logo / Name | **Syne** | system-ui, sans-serif | 800 | "Shivansh Gaur" ONLY — personal mark |
| Headings | **Inter** | system-ui, sans-serif | 600, 700 | Section titles, project names, h1–h3 |
| Body | **Inter** | system-ui, sans-serif | 400, 500 | Paragraphs, descriptions, button text |
| Mono / Labels | **JetBrains Mono** | monospace | 400 | Dates, tech stacks, metadata, tags |

### Type Scale

| Token | Size (desktop) | Size (mobile) | Weight | Line Height | Letter Spacing | Usage |
|-------|---------------|---------------|--------|-------------|----------------|-------|
| `--text-display` | 56–72px | 36–44px | 700 | 1.1 | -0.02em | Hero name |
| `--text-h1` | 40–48px | 28–32px | 600 | 1.15 | -0.01em | Section headings |
| `--text-h2` | 32–36px | 24–28px | 600 | 1.2 | 0 | Sub-section headings |
| `--text-h3` | 24px | 20px | 500 | 1.3 | 0 | Card titles, category labels |
| `--text-body` | 16–18px | 16px | 400 | 1.6 | 0 | Main content |
| `--text-body-sm` | 14px | 14px | 400 | 1.5 | 0 | Supporting text |
| `--text-label` | 12–13px | 12px | 400 | 1.4 | +0.05em | Mono labels, dates, tags |
| `--text-caption` | 12px | 12px | 400 | 1.4 | 0 | Captions, footnotes |

### Font Loading Strategy
- Load via `<link rel="preload">` in HTML `<head>`
- Use `font-display: swap` to prevent FOIT
- Variable fonts where available (Inter Variable, Geist Variable) for smaller payload

---

## 2. Colors

### Dark Theme (Primary)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#09090b` | Main page background |
| `--bg-secondary` | `#111113` | Cards, elevated surfaces |
| `--bg-tertiary` | `#1a1a1e` | Hover states, active areas, input backgrounds |
| `--border-subtle` | `rgba(255,255,255,0.08)` | Card borders, dividers |
| `--border-default` | `rgba(255,255,255,0.12)` | Input borders, stronger dividers |
| `--border-strong` | `rgba(255,255,255,0.20)` | Focus rings, emphasis |
| `--text-primary` | `#fafafa` | Main text, headings |
| `--text-secondary` | `#a1a1aa` | Supporting text, descriptions |
| `--text-muted` | `#71717a` | Labels, captions, placeholders |
| `--accent` | `#3b82f6` | Links, interactive elements, focus |
| `--accent-hover` | `#60a5fa` | Hover state for accent elements |
| `--accent-subtle` | `rgba(59,130,246,0.10)` | Accent backgrounds, tag fills |
| `--accent-glow` | `rgba(59,130,246,0.20)` | Subtle glow effects on hover |
| `--success` | `#22c55e` | Positive states (if needed) |
| `--warning` | `#eab308` | Warning states (if needed) |
| `--error` | `#ef4444` | Error states (if needed) |

### Light Theme (Alternative)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#ffffff` | Main page background |
| `--bg-secondary` | `#f4f4f5` | Cards, elevated surfaces |
| `--bg-tertiary` | `#e4e4e7` | Hover states, active areas |
| `--border-subtle` | `rgba(0,0,0,0.06)` | Card borders, dividers |
| `--border-default` | `rgba(0,0,0,0.12)` | Stronger borders |
| `--border-strong` | `rgba(0,0,0,0.20)` | Focus rings |
| `--text-primary` | `#09090b` | Main text |
| `--text-secondary` | `#52525b` | Supporting text |
| `--text-muted` | `#a1a1aa` | Labels, captions |
| `--accent` | `#2563eb` | Links, interactive |
| `--accent-hover` | `#1d4ed8` | Hover state |
| `--accent-subtle` | `rgba(37,99,235,0.08)` | Accent backgrounds |

### Color Principles
- Zinc-based neutrals (slightly warm) rather than pure gray — prevents clinical feel
- Single accent color (blue) — keeps the system simple and coherent
- Dark theme is primary — designed first, light theme is the alternative
- Both themes should feel like two versions of the same brand

---

## 3. Spacing

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight gaps, icon padding |
| `--space-2` | 8px | Inline spacing, small gaps |
| `--space-3` | 12px | Tag padding, tight groups |
| `--space-4` | 16px | Default element spacing |
| `--space-5` | 20px | Card internal padding (small) |
| `--space-6` | 24px | Card padding, grid gaps |
| `--space-8` | 32px | Group separation |
| `--space-10` | 40px | Sub-section spacing |
| `--space-12` | 48px | Container padding (tablet) |
| `--space-16` | 64px | Container padding (desktop) |
| `--space-20` | 80px | Section spacing (mobile) |
| `--space-24` | 96px | Section spacing (tablet) |
| `--space-32` | 128px | Section spacing (desktop) |

---

## 4. Layout

### Container

| Property | Value |
|----------|-------|
| Max content width | 1200px |
| Absolute max width | 1400px |
| Container padding (mobile) | 24px |
| Container padding (tablet) | 48px |
| Container padding (desktop) | 64px |

### Grid
- 12-column grid
- Gutter: 24px (mobile), 32px (desktop)
- Content areas typically span 8–10 columns on desktop

### Breakpoints

| Name | Value | Approach |
|------|-------|----------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Laptop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large desktop |

### Section Spacing
- Mobile: 80px between sections
- Tablet: 96px between sections
- Desktop: 120–128px between sections

---

## 5. Components

### Buttons

**Primary:**
- Background: `--accent`
- Text: white
- Padding: 12px 24px
- Border radius: 999px (capsule/pill shape)
- Font: Inter, 500 weight, 14–16px
- Hover: `--accent-hover`, slight translateY(-1px)
- Active: scale(0.98)
- Focus: 2px ring with `--accent` offset by 2px

**Secondary:**
- Background: transparent
- Border: 1px solid `--border-default`
- Text: `--text-primary`
- Padding: 12px 24px
- Border radius: 999px (capsule/pill shape)
- Hover: background `--bg-tertiary`

**Ghost:**
- Background: transparent
- No border
- Text: `--text-secondary`
- Hover: text `--text-primary`, background `--bg-tertiary`

**Icon-only:**
- Shape: circle (border-radius: 50%)
- Size: 40px × 40px (or 32px for small)
- Background: `--bg-tertiary` or transparent
- Icon: centered, `currentColor`

### Cards

- Background: `--bg-secondary`
- Border: 1px solid `--border-subtle`
- Border radius: 12px
- Padding: 24px
- Hover: border shifts to `--border-default`, subtle shadow or glow
- Transition: 200ms ease-out

### Tags / Chips

- Background: `--bg-tertiary`
- Text: `--text-secondary`
- Font: JetBrains Mono, 12px
- Padding: 6px 12px
- Border radius: 6px
- No border (dark theme) / subtle border (light theme)

### Navigation

- Fixed top
- Background: `--bg-primary` with 80% opacity + backdrop-filter blur(12px)
- Border-bottom: 1px solid `--border-subtle`
- Height: 64px
- Content: max-width container centered
- Elements: Logo/name left, nav links right

### Project Cards (Special)

- Larger than standard cards
- Image/logo area: top or left (responsive)
- Title: `--text-h3` weight
- Role: `--text-body-sm`, `--text-secondary`
- Tech stack: row of tags (mono font)
- Hover: subtle scale(1.01), border brightens
- Click: expands or navigates to detail

---

## 6. Motion

### Duration Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-micro` | 150ms | Button hover, color changes |
| `--duration-standard` | 300ms | Element transitions, nav |
| `--duration-entrance` | 500ms | Scroll-reveal, section entrance |
| `--duration-hero` | 800ms | Hero load animation |
| `--duration-slow` | 1000ms | Background, ambient motion |

### Easing

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances, reveals |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Transitions between states |
| `--ease-spring` | Framer Motion spring | Interactive elements |

### Entrance Animations
- Default: `opacity 0→1` + `translateY(20px→0)`
- Stagger: 50–75ms between sibling elements
- Trigger: when element enters viewport (Intersection Observer threshold 0.2)

### Hover Animations
- Cards: `translateY(-2px)` + border color shift + subtle shadow
- Buttons: background color + `translateY(-1px)`
- Links: color transition + optional underline animation
- Duration: 150–200ms, ease-out

### Reduced Motion
- All `transform` animations → instant (no movement)
- Opacity transitions → allowed (accessible)
- Parallax → disabled
- Background ambient motion → static
- Media query: `@media (prefers-reduced-motion: reduce)`

---

## 7. Iconography

- Prefer SVG icons where possible (social icons, UI icons)
- Consistent size: 20px for inline, 24px for standalone, 40px for featured
- Color: `currentColor` to inherit text color and respect themes
- Stroke-based preferred over filled for cleanliness

---

## 8. Image Treatment

### Dark Theme
- Screenshots: `border-radius: 12px`, subtle `--border-subtle` border
- Logos on dark: may need a subtle light bg pill or brightness adjustment
- Large images: `filter: brightness(0.92)` to reduce eye strain
- Placeholder/loading: `--bg-tertiary` with subtle pulse animation

### Light Theme
- Screenshots: `border-radius: 12px`, subtle shadow
- Logos: native colors, no filter
- Large images: no filter adjustment needed

---

## 9. Shadows (Light Theme Only)

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1)` | Cards, dropdowns |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` | Modals, popovers |

> In dark theme, shadows are largely replaced by borders and subtle glows. Pure drop shadows are nearly invisible on dark backgrounds.

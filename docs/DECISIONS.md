# Decisions Log

> A running record of design and implementation decisions made during the portfolio redesign.
> Each entry captures what was decided, what alternatives were considered, and why.

---

## Format

```
### [YYYY-MM-DD] Decision Title
**Decision:** What we chose
**Alternatives considered:** What else was on the table
**Rationale:** Why this choice was made
**Impact:** What this affects
```

---

## Decisions

### [2026-08-22] Chose "Dark Interface with warmth" as design direction

**Decision:** Go with Direction B (Dark Interface — Technical Sophistication) as the primary visual direction, with warm personal touches borrowed from Direction C (Personal Narrative).

**Alternatives considered:**
- Direction A: "Quiet Craft" — Editorial Minimalism (clean but potentially too generic)
- Direction C: "Personal Narrative" — Storytelling-First (distinctive but requires strong copy and risks being heavy)

**Rationale:**
1. The existing hero already establishes a dark atmospheric tone — extending it creates coherence rather than the jarring dark-to-white transition.
2. As an iOS developer, the "dark interface" aesthetic aligns with Xcode, dark-mode-first culture, and Apple's developer tool marketing.
3. Colorful project screenshots and logos POP against dark backgrounds.
4. Monospace accent elements naturally fit a developer's portfolio without being gimmicky.
5. Adding warmth prevents it from feeling like a cold SaaS dashboard.

**Impact:** All color, typography, and layout decisions flow from this direction.

---

### [2026-08-22] Proposed Geist + Inter + JetBrains Mono typography stack

**Decision:** Use Geist for display/headings, Inter for body, JetBrains Mono for labels/metadata.

**Alternatives considered:**
- Poppins (currently used) — too common, geometric, "startup template" feel
- SF Pro — Apple's font, but licensing restricts web use outside Apple platforms
- Satoshi — trendy but may date quickly
- Space Grotesk — good but less versatile than Geist

**Rationale:**
- Geist: Created by Vercel, modern geometric sans, technical feel, not overused
- Inter: Screen-optimized, excellent legibility, variable font for performance, industry standard
- JetBrains Mono: Gives technical credibility to metadata without overusing monospace

**Impact:** Affects all text rendering, font loading strategy, and perceived personality.

---

### [2026-08-22] Decided to document project in structured docs/ folder

**Decision:** Create five documents: DESIGN_AUDIT.md, DESIGN_SYSTEM.md, ROADMAP.md, DECISIONS.md, INSPIRATION.md.

**Alternatives considered:**
- Single large spec document (harder to navigate)
- Notion/external tool (disconnected from code)
- No documentation (lose context over time)

**Rationale:** Separate concerns, quick reference, stays with the code, tracks progress and reasoning.

**Impact:** All future decisions and progress tracked here. Prevents circular discussions.

---

### [2026-08-22] Dark theme as primary, light as alternative

**Decision:** Design and ship dark theme first. Light theme is secondary/optional.

**Alternatives considered:**
- Light-first (would require redesigning the hero concept entirely)
- Dark-only (limits user preference)

**Rationale:** The hero's night-sky aesthetic and the "Dark Interface" direction make dark the natural default. Adding light as an option respects user preference without compromising the primary brand feel.

**Impact:** Dark theme gets full design attention first. Light theme tokens defined but implemented after dark is polished.

---

### [2026-08-22] Skip video splash — use static images for now

**Decision:** No video splash/loader on the website. Use static images for the hero. Video concept (entering a room) shelved for future consideration.

**Alternatives considered:**
- Blocking video splash screen (like a native app launch)
- Hero background video (non-blocking, atmospheric)
- Scroll-triggered video transition
- One-time cinematic entrance with skip button

**Rationale:** Web visitors expect instant content access — a forced video delays that. Video adds bandwidth/performance concerns, especially on mobile. Static images with a well-orchestrated entrance animation achieve a premium feel without the downsides. Video can be revisited later when high-quality footage is ready.

**Impact:** Hero design will use static imagery + CSS/Framer Motion for atmosphere rather than video.

---

### [2026-08-22] Hero section layout and animation concept

**Decision:** Hero will feature:
- Full viewport height (100vh), content vertically centered
- Photo (side profile, looking left) positioned on the RIGHT side of desktop layout
- Text block LEFT-ALIGNED on the left side in the foreground
- Name ("Shivansh Gaur") large display type — appears instantly on load
- "iOS Developer" subtitle — appears instantly with name (interactive tap-to-shuffle feature)
  - Array of descriptors: ["iOS Developer", "Software Engineer", "Swift Enthusiast", "Good Cook", "Excellent Baker", "Technical TT Player", "Nature Lover", "Homo Sapien", "Vegetarian", "Blind in Love"]
  - Interaction: tap/click triggers character shuffle animation (~400ms)
  - Array management: shown items appended to end, array shrinks, no repeats until full cycle
  - After ~8 items, end messages appear one at a time (rotating):
    - "Alright, you know enough. Scroll down to see the real stuff."
    - "Careful — learning too much won't make us friends."
    - "That's the full list. Now go explore the rest."
    - "Still here? There's way more to see below."
  - Once game over: restart ⟳ icon appears beside subtitle to reset
  - Hint: after all entrance animations complete, a one-line hint appears (pulse/typewriter) below subtitle inviting user to tap. Fades away once user starts interacting.
  - Stays single-line — no extra space needed
- Short intro paragraph: "I craft native iOS experiences for apps used by millions. Currently building at Natwest, previously shaped products at BlackNGreen and Tech Mahindra."
  - Character-by-character typewriter (~0.8s)
- Social icons inline after the paragraph text (GitHub, LinkedIn, Email only — 3 icons):
  - Each icon appears → pulses OUT with brand color glow (scale up) → snaps back → fades to GRAY resting state
  - Sequence is fast: ~150-200ms per icon, next starts immediately after previous goes gray
  - Resting state: all icons gray/muted
  - On hover: icon turns colorful again + single pulse animation
  - Total: ~500-600ms for all 3 icons
- Button below: types "or just" → brief pause → deletes → retypes "Download Resume" (or with download icon)
- Photo: used at 70–85% opacity, subtle gradient on left edge fading into page background for text readability. AI-generated light version for light mode.
- Scroll snap: hero only, CSS `scroll-snap-type: y proximity`
- No scroll-down indicator on hero (only horizontal scroll indicators on relevant sections elsewhere)
- Animation plays once per page load (refresh replays, scroll-back does not replay)
- Responsive: desktop = text left, photo right; mobile = text top, photo below. Text always left-aligned.

**Desktop layout:**
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  SHIVANSH GAUR                        [PHOTO - right     │
│  iOS Developer  [⟳]                    side profile      │
│                                        looking left,     │
│  I craft native iOS experiences...     70-85% opacity]   │
│  ...at BlackNGreen and Tech                              │
│  Mahindra. [🟣] [🔵] [📧] [etc.]                         │
│                                                          │
│  [⬇ Download Resume]                                     │
│                                                          │
│  ↑ hint text fades in after sequence, fades on interact  │
└──────────────────────────────────────────────────────────┘
```

**Mobile layout:**
```
┌─────────────────────────┐
│ SHIVANSH GAUR           │
│ iOS Developer  [⟳]      │
│                         │
│ I craft native iOS...   │
│ ...Mahindra. [🟣][🔵][📧]│
│                         │
│ [⬇ Download Resume]     │
│                         │
│ [PHOTO below, centered] │
└─────────────────────────┘
```

**Animation flow:**
```
0.0s ─── Photo, Name, Subtitle appear instantly (no animation)
0.0s ─── Paragraph starts typing (char by char)
0.8s ─── Text complete → icons pulse in sequence (brand colors)
1.4s ─── Icons done → button types "or just"
1.7s ─── Pause briefly
1.9s ─── "or just" deletes
2.1s ─── "Download Resume" types in and stays
~2.3s ── Sequence complete
~2.5s ── Hint text appears (pulse/typewriter) under subtitle: "tap to discover more about me" or similar
         Fades away once user taps subtitle for the first time
```

**Subtitle interaction flow:**
```
User taps "iOS Developer"
  → character shuffle (~400ms) → resolves to next array item
  → repeats on each tap, no repeats
  → after ~8 items: end message appears below subtitle
  → end messages rotate on continued taps
  → game over: ⟳ restart icon appears beside subtitle
  → tap ⟳: array resets, game restarts
```

**Bottom-right utility icons (3 round icons, stacked vertically):**
```
                                              [🌙/☀️]  ← Theme toggle (light/dark)
                                              [🔇/🔊]  ← Mute/unmute all audio
                                              [🌐]     ← Language switcher
```
- **Theme toggle:** switches between light and dark mode
- **Audio mute:** globally mutes/unmutes all micro-sounds on the site
  - Sounds planned for: social icon hover pulses (unique per icon), subtitle shuffle effect
  - Muted by default (user opts IN to sound) — respects web etiquette
- **Language switcher:** cycles or opens picker for English, Hindi, German, French, Spanish
  - Each language may use a culturally appropriate font pairing (see notes below)
- Phase: Future implementation — included here as planned requirement so it's not forgotten
- Icons: small (32–40px), subtle, round, consistent style with the rest of the design

**Alternatives considered:**
- 3D cube flip (too much vertical space for a single-line element)
- Swipe left/right with poster drop (conflicts with mobile scroll)
- Vertical scroll ticker (conflicts with page scroll on trackpad/mobile)
- Phone shake trigger (requires permission popup on iOS, too much friction — skipped)
- Word-by-word reveal (faster but less distinctive — decided character-by-character)
- Name with entrance animation (decided against — name should anchor immediately, animations happen below it)
- Staggered fade-in only (cleaner but less theatrical — owner wants the typewriter personality)
- Skip button animation (cleaner but owner wants the type/delete/retype moment)

**Rationale:** The typewriter + sequenced icons create a distinctive, personal entrance that communicates attention to detail. Keeping it under ~2.5s total and gating per page-load prevents it from becoming annoying. The z-stack photo adds personality without competing with text readability.

**Impact:** Hero component will need: typewriter logic, sequenced animation orchestration, session-aware animation gating, z-index layering, responsive layout switch.

---

### [2026-08-22] Resume file storage strategy

**Decision:** Use Google Drive link as primary resume source (update without redeploy). Keep a local copy at `public/assets/resume/Shivansh_Gaur_Resume.pdf` as fallback. The "Download Resume" button points to the Drive link.

**Alternatives considered:**
- Local file only (requires redeploy on every resume update)
- Drive only (depends on Google availability)
- Third-party file hosting (unnecessary complexity)

**Rationale:** Drive allows instant updates without touching the codebase. Local copy ensures the portfolio still works if Drive is unreachable.

**Impact:** Resume button href uses the Google Drive URL. Local file stays as backup.

---

### [2026-08-22] Social icons — minimal aria-labels, no visible text

**Decision:** Social icons use minimal `aria-label` values (just "GitHub", "LinkedIn", "Email") for screen readers. No visible text labels — the icons are universally recognizable.

**Alternatives considered:**
- Verbose labels ("Visit Shivansh's GitHub profile") — unnecessary, patronizing
- No labels at all — breaks screen reader accessibility

**Rationale:** Anyone visiting a developer portfolio knows what these icons mean. Screen readers still need something to announce, so we keep it short.

**Impact:** aria-labels are single words. No tooltip or visible label shown.

---

**Decision:** The long-term plan is to migrate from Create React App to Next.js. For now, continue exploring and building on the current React/CRA setup to validate design direction and interactions before migrating.

**Alternatives considered:**
- Migrate to Next.js immediately (disruptive while still exploring design)
- Switch to Astro (would require learning new framework patterns)
- Stay on CRA permanently (dead project, no image optimization, no SSG)
- Plain HTML/CSS/JS (loses component reuse and Framer Motion)

**Rationale:** CRA works fine for exploration and prototyping. Migrating mid-design would slow down creative iteration. Once the design direction is finalized and implemented, migrating to Next.js is straightforward (components transfer directly) and unlocks SSG, image optimization, and better SEO. No point disrupting workflow before the design is locked.

**Impact:** All current work will be built in standard React components that are Next.js-compatible. No CRA-specific patterns will be introduced that would complicate migration later.

---

### [2026-08-22] Page structure — 5 sections, ordered by narrative

**Decision:** The portfolio will have 5 sections in this order:
1. Hero — Identity, personality, CTA
2. Projects — Proof of work (rich cards with role, tech, impact)
3. Experience — Timeline with roles, contributions, education merged at bottom
4. Skills — Categorized tag grid, scannable
5. Contact/Footer — CTA + social links + email as text + copyright

**Also decided:**
- Skills Rain: removed entirely
- Education: merged into Experience (compact, at the bottom)
- Achievements: merged into Experience as badges/tags on roles, or skipped until polished details available
- About: not needed as separate section — hero intro covers it
- Contact/Footer: combined into one section. Both hero icons AND footer contact stay (different purposes — hero is quick access, footer is conversion after viewing work)

**Rationale:** Follows a narrative arc: introduce → prove → contextualize → detail → convert. Projects come immediately after hero because they're the strongest proof of work.

**Impact:** SkillsRain component will be deleted. Education and Achievements won't have standalone sections.

---

### [2026-08-22] Projects section — presentation and interaction design

**Decision:** Projects section will feature:

**Carousel Layout:**
- Horizontal scrollable carousel showing one project card at a time
- Peeking edges: next/previous cards partially visible on the sides (iOS App Store style)
- No arrow buttons — scroll via drag, trackpad swipe, or clicking the peeking card edges
- Capsule-shaped pagination indicator below: `(  • ○ ○ ○ ○  )` — dots are clickable to jump to specific project
- Desktop: drag-to-scroll + click peek edges + clickable pagination dots
- Mobile: natural swipe + clickable pagination dots

**Project Card (reusable component):**
- Accepts brand color, content, screenshots as props
- Desktop layout: screenshot/logo on LEFT, text on RIGHT
- Mobile layout: screenshot/logo on TOP, text on BOTTOM
- Different brand accent color per card (pulled from actual brand identity)
- Rounded corners (12px) — Apple design philosophy
- Content: project name, role, brief impact, tech stack tags, App Store link

```
Desktop card:
┌─────────────────────────────────────────────────┐
│  ┌──────────────┐  │  PROJECT NAME              │
│  │              │  │  Your role                 │
│  │  Screenshot  │  │  Brief impact text         │
│  │  / Logo      │  │  [Swift] [SwiftUI] [etc.]  │
│  │              │  │  [View on App Store →]     │
│  └──────────────┘  │                            │
│  Brand color accent │                            │
└─────────────────────────────────────────────────┘

Mobile card:
┌──────────────────────┐
│  ┌────────────────┐  │
│  │  Screenshot    │  │
│  │  / Logo        │  │
│  └────────────────┘  │
│  PROJECT NAME        │
│  Your role           │
│  Brief impact text   │
│  [Swift] [SwiftUI]   │
│  [View on App Store] │
│  Brand color accent  │
└──────────────────────┘
```

**Detail View (on tap/click):**
- **Mobile (≤768px):** Bottom sheet slides up from bottom
- **Desktop (>768px):** Centered modal
- Body scroll locked when open (prevent scroll bleed)
- Close button: top RIGHT, translucent/frosted, low visual weight
- Whole sheet/modal content scrolls together (image is NOT sticky)
- Content layout:

```
┌─────────────────────────────────────────────────┐  ← rounded corners (modal: all 4; sheet: top 2)
│                                             [×] │  ← close, translucent
├─────────────────────────────────────────────────┤
│                                                 │
│    ┌─────────────────────────────────────┐      │
│    │      Screenshot auto-carousel       │      │  ← rounded corner images (8-12px)
│    │      (  • ○ ○  )       [App Store]  │      │  ← capsule indicator + App Store button
│    └─────────────────────────────────────┘      │
│                                                 │
│    Heading                                      │
│    Body text / description...                   │
│    ...                                          │
│                                                 │
└─────────────────────────────────────────────────┘
```

- Bottom sheet: max height ~85vh, top corners rounded
- Modal: max height ~80vh, all corners rounded
- Screenshot carousel inside detail: auto-scrolling with same capsule pagination
- Images: 8–12px rounded corners

**Global Design Decisions (apply to whole site):**
- Buttons with text: capsule/pill shape `(  Button Text  )`
- Buttons with icon only: circle shape `( ⚫ )`
- All containers/cards: rounded corners (Apple philosophy)
- Close buttons in overlays: top right, translucent

**Screenshots:**
- Public App Store screenshots will be provided for NDA projects
- Cards must work with AND without screenshots (logo-only fallback)

**Project Cards Order & Brand Colors:**
1. **Natwest** — Purple `#3c1053` (NatWest brand purple)
2. **MagicCall** — Red `#D71C2B` (matching their brand)
3. **AI Voice Assistant** — Red (different shade TBD — owner's personal project)
4. **Bell Mobile** — Blue `#0066A4` (Bell Canada blue)
5. **This Portfolio** — TBD color (meta: showcasing this site itself)
6. **GitHub Projects Card** — Different format: white background, rounded card, capsule-shaped list items linking to GitHub repos

**GitHub Projects Card (last card, special layout):**
```
┌──────────────────────────────────────────────┐  white bg, rounded
│                                              │
│  ( ○  Phone Sensor Demo         )  → link   │  capsule items
│  ( ○  Another Project           )  → link   │
│  ( ○  Third Project             )  → link   │
│                                              │
│                              ...more → GitHub│  bottom right
└──────────────────────────────────────────────┘
```
- Each item is a capsule pill with a circle indicator (○) + project name
- On click/visit: ○ turns to green ✓ (indicates visited link via `:visited` CSS or localStorage)
- "...more" links to full GitHub repos page
- Shows 3 best side projects

**Project Detail Views (what opens in bottom sheet/modal on tap):**

| Card | Detail content | Company context |
|------|---------------|-----------------|
| Natwest | Single project — standard detail view | Current employer |
| MagicCall | MagicCall as hero + other BlackNGreen projects shown in carousel & content | BlackNGreen |
| AI Voice Assistant | Single personal project | Personal |
| Bell | Bell as hero + Virgin Plus, PC Mobile, Lucky Mobile in same detail | Tech Mahindra |
| This Portfolio | TBD | Personal |
| GitHub Projects | No detail view — links open directly to GitHub | Personal |

- Cards represent the **flagship project** per employer
- Detail views expand to show **all work** done at that company
- Carousel images are rectangular
- Image content and grouping managed by owner

**Section Heading:** "What I've Built"

**Scroll-Reveal Animation:** Subtle fade-up + stagger when section enters viewport for the first time. Heading fades up first, then card appears slightly after (~300–500ms total). Uses Framer Motion + Intersection Observer. Respects `prefers-reduced-motion` (instant if reduced motion active).

**Image Sizes (for all projects — same standard):**
- Card banner/carousel image: **1200×675px** (16:9 ratio) — used for project card preview AND detail view carousel
- All projects use the same image dimensions for consistency
- Code handles responsive scaling via `object-fit: cover`
- Keep images high-res (at least 1200px wide), consistent ratio within each project
- Format: WebP preferred (smaller file size), PNG/JPG fallback

**"This Portfolio" Card Content:**
- Title: "This Portfolio"
- Subtitle: "Designed & built from scratch"
- Text: "A premium, dark-interface portfolio built with React, Framer Motion, and custom animations — because the medium is part of the message."
- Tech tags: [React] [Framer Motion] [CSS Custom Properties] [Responsive]
- Link: "View Source" → GitHub repo (no App Store link)
- Screenshot: taken once the portfolio is built

**GitHub Projects Card — Placeholder (3 entries for now):**
- ( ○ Phone Sensor Demo ) → https://github.com/ShivanshGaur6096/iPhone-Sensors-Demo
- ( ○ Phone Sensor Demo ) → duplicate placeholder
- ( ○ Phone Sensor Demo ) → duplicate placeholder
- "...more" → https://github.com/ShivanshGaur6096 (bottom right)
- Visited indicator: localStorage-based green ✓

**Card Text Content:** Generic placeholders for now. When implementation starts, owner will provide per project: exact role, 1–2 impact sentences, tech stack list, App Store link.

**Alternatives considered:**
- Grid of equal cards (doesn't give individual projects enough space)
- Full-width stacked cards (too much scrolling)
- Arrows for carousel navigation (unnecessary with peek + drag + dots)
- Sticky image in detail view (over-complicated, whole content scrolls instead)
- Bottom sheet on all screens (doesn't suit desktop — modal is better there)

**Rationale:** The carousel-with-peek pattern gives each project full attention while signaling more content exists. Adaptive detail view (sheet/modal) respects platform conventions. Brand-colored cards create visual variety against the dark background.

**Impact:** Need reusable ProjectCard component, carousel scroll logic, adaptive overlay (sheet vs modal), body scroll lock utility, brand color configuration per project.

---

### [2026-08-22] Final typography stack — Syne + Inter + JetBrains Mono

**Decision:** Four-font system:
- **Syne (800)** — ONLY for "Shivansh Gaur" name (logo treatment)
- **Inter (600–700)** — Section headings
- **Inter (400–500)** — Body text, descriptions, button text
- **JetBrains Mono (400)** — Dates, tech tags, metadata labels

**Alternatives considered:**
- Space Grotesk for name (too similar to Inter — doesn't stand out as a logo)
- Outfit for name (too startup/friendly, less distinctive)
- Unbounded for name (too playful/rounded — feels like gaming brand)
- Geist for headings (replaced by Inter for simplicity — one fewer font to load)

**Rationale:** Syne's unconventional letterforms make the name read as a "personal mark" while sharing geometric DNA with Inter so they don't clash. Inter handles everything else cleanly. JetBrains Mono adds technical credibility to metadata. Three fonts loaded total (Syne is only used at one size, minimal payload).

**Impact:** Update DESIGN_SYSTEM.md to reflect Syne replacing Geist for the display/logo role. Inter takes both headings AND body. Font loading needs Syne added to preload.

---

### [2026-08-23] Color system, buttons, glass effect, and icons approved

**Decision:** The full visual system as shown in `docs/design-preview.html` is approved:

**Colors — Dark Theme (primary):**
- Background: `#09090b` (primary), `#111113` (surface/cards), `#1a1a1e` (tertiary/hover)
- Text: `#fafafa` (primary), `#a1a1aa` (secondary), `#71717a` (muted/labels)
- Accent: `#3b82f6` (blue)
- Borders: `rgba(255,255,255,0.08)` subtle, `rgba(255,255,255,0.12)` default

**Colors — Light Theme (alternative):**
- Background: `#ffffff` (primary), `#f4f4f5` (surface), `#e4e4e7` (tertiary)
- Text: `#09090b` (primary), `#52525b` (secondary), `#a1a1aa` (muted)
- Accent: `#2563eb` (slightly darker blue for contrast on white)
- Borders: `rgba(0,0,0,0.06)` subtle, `rgba(0,0,0,0.12)` default

**Buttons:**
- Primary: blue accent bg, white text, capsule shape (border-radius: 999px)
- Secondary: transparent bg, border, capsule shape
- Icon-only: circle (border-radius: 50%), 40px, dark surface bg

**Project brand colors:**
- Natwest: `#3c1053` (purple)
- MagicCall: `#D71C2B` (red)
- AI Voice: `#ea4335` (red)
- Bell: `#0066A4` (blue)
- Portfolio: `#3b82f6` (accent blue)

**Frosted glass effect:**
- Used on pagination indicator `( • ○ ○ ○ )` — capsule shape
- `backdrop-filter: blur(20px)` + `rgba(255,255,255,0.12)` bg + subtle white border
- NOT used sitewide — only for floating UI elements over colored/gradient backgrounds

**Icon library:** Lucide (MIT license, React components, `currentColor`)

**Rationale:** Everything validated visually in the preview page. Zinc-based neutrals feel warm rather than clinical. Single blue accent keeps the system simple. Brand colors from actual company identities. Glass effect adds premium feel to small floating elements without performance concerns.

**Impact:** DESIGN_SYSTEM.md already contains these tokens. Steering file updated. Ready for implementation.

---

*More decisions will be added as the project progresses.*

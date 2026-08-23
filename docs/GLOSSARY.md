# Design & Web Terminology Glossary

> A running reference of terms, patterns, and techniques discussed during this project.
> Each entry explains what it is, how it could apply to our portfolio, and tradeoffs.

---

## Scroll Snapping

**What it is:** A behavior where the page automatically "locks" to the nearest section boundary after the user scrolls. One scroll gesture = one full section transition, like swiping between pages in a native app.

**How it's done:** CSS `scroll-snap-type` + `scroll-snap-align` (native, no library needed), or JS libraries like FullPage.js for more complex control.

**How we could use it:** Snap from the hero section to the first content section — gives a cinematic "enter the site" feel. Free scroll after that.

**Advantages:**
- Feels premium, app-like, intentional
- Guarantees each section is seen fully framed
- Creates natural pacing

**Disadvantages:**
- Can feel restrictive if applied to every section
- Breaks if a section is taller than the viewport
- Mobile users expect free scroll — snapping can feel unexpected
- Accessibility concern: users with trackpads or precise scroll wheels may fight it

---

---

## Typewriter Effect

**What it is:** Text appearing character by character, simulating someone typing in real time. Can include a blinking cursor.

**How it's done:** JS interval adding one character at a time to a string, or CSS animation on width with `overflow: hidden` + `white-space: nowrap` for single lines. Libraries: Typed.js, custom Framer Motion variants.

**How we're using it:** Hero intro text types out character-by-character in ~0.8s. Button label also uses this pattern.

**Advantages:**
- Creates narrative pacing — viewer "watches" the message build
- Adds personality and theatricality
- Distinctive compared to static text

**Disadvantages:**
- Slow if text is long
- Can frustrate returning visitors (solved with session detection)
- Accessibility: screen readers get full text instantly — disconnect between visual and accessible experience

---

## Backspace / Delete Effect (Text Cycling)

**What it is:** Characters removing themselves one by one, simulating someone pressing backspace. Often paired with typewriter to create a "type → delete → retype something new" sequence.

**How it's done:** Same mechanism as typewriter but in reverse — remove last character on interval. Libraries: Typed.js has this built-in.

**How we're using it:** Button text types "or just" → pauses briefly → deletes → retypes "Download Resume" and stays.

**Advantages:**
- Playful, creates a moment of surprise
- Mimics human thought process ("wait, actually...")

**Disadvantages:**
- Adds time before the element is usable
- Can feel gimmicky if overused

---

## Pulse Animation

**What it is:** An element briefly scales up (or glows/rings outward) then returns to its original state. A single "pop" of emphasis drawing the eye to that element.

**How it's done:** CSS `@keyframes` with `transform: scale(1.2)` + return to `scale(1)`, or a box-shadow/outline that expands and fades. Framer Motion: `animate={{ scale: [1, 1.2, 1] }}`.

**How we're using it:** Social icons appear one-by-one, each pulsing once with its brand color (purple for GitHub, blue for LinkedIn, etc.) then staying static.

**Advantages:**
- Draws attention without being permanent/distracting
- One pulse = "I'm here" — establishes presence then goes quiet

**Disadvantages:**
- Multiple pulses in sequence can feel like a notification overload if too slow

---

## Sequenced / Orchestrated Animation

**What it is:** Multiple animations playing in a specific order — one finishes, the next begins. The entire sequence tells a visual "story."

**How it's done:** Framer Motion `staggerChildren` + `delayChildren`, or chaining `setTimeout` / `onAnimationEnd` callbacks. Also achievable with CSS `animation-delay` on each element.

**How we're using it:** The entire hero entrance is a sequence: text types → icons pulse in → button types/deletes/retypes.

**Advantages:**
- Creates narrative and pacing
- Guides the viewer's eye through content in order
- Feels intentional and crafted

**Disadvantages:**
- Total duration adds up — need to keep tight
- Complexity in code (managing timing, delays, dependencies)

---

## Inline Elements

**What it is:** Elements that flow within a line of text rather than being placed on their own row. They sit alongside words as if they're part of the sentence.

**How it's done:** CSS `display: inline` or `display: inline-flex` on the icon containers. They wrap naturally with the text.

**How we're using it:** Social icons appear directly after the last word of the intro paragraph — on the same line — reading as part of the text flow.

**Advantages:**
- Feels cohesive — icons are "part of the message" not a separate UI element
- Space-efficient, minimal

**Disadvantages:**
- Can look cramped if not spaced carefully
- On narrow screens, may wrap to next line (which is fine, but needs testing)

---

## Z-Stack / Layered Composition

**What it is:** Elements placed on top of each other along the z-axis (depth), like layers in Photoshop. In iOS, this is a `ZStack`. In web, achieved with `position: absolute/relative` and `z-index`.

**How it's done:** Container with `position: relative`, child elements with `position: absolute` stacked. Higher `z-index` = visually in front.

**How we're using it:** The photo sits behind/underneath the text content. Text is in the foreground (higher z-index), photo is in the background layer — creating depth without the photo competing with readability.

**Advantages:**
- Creates visual depth and sophistication
- Photo adds personality without dominating
- Allows text to remain fully readable

**Disadvantages:**
- Needs careful opacity/brightness on the background image so text contrast is maintained
- Responsive behavior needs thought — photo positioning shifts on small screens

---

## Character Shuffle / Text Scramble

**What it is:** On interaction, each character in a word rapidly cycles through random characters (letters, symbols) before "resolving" into the target word. Looks like a decryption or slot machine finding its answer.

**How it's done:** Each character position runs through random characters on a fast interval (20–30ms per frame), then one by one (left to right or random order) each character "locks in" to its final letter. Libraries: custom implementation with `requestAnimationFrame`, or packages like `baffle.js`.

**How we're using it:** The "iOS Developer" subtitle is tappable. Each tap triggers a shuffle (~400ms) that resolves to the next descriptor from the array ("Good Cook", "Nature Lover", etc.).

**Advantages:**
- Zero extra space — text stays in place, same dimensions
- Fast and satisfying — encourages repeated tapping
- Feels technical and developer-ish
- Works on all devices (just a tap/click)

**Disadvantages:**
- Accessibility: screen readers need `aria-live` region to announce the new text
- Needs a clear "this is interactive" hint since text isn't normally tappable
- Very fast shuffles may trigger issues for motion-sensitive users (respect `prefers-reduced-motion` — instant swap instead)

---

**What it is:** Detecting whether a user has already seen an animation during their current browsing session, and skipping it on subsequent views. Animation plays on first load, but if the user scrolls back to the hero or navigates back, content is shown instantly.

**How it's done:** Set a flag in `sessionStorage` after animation completes. On component mount, check if flag exists — if yes, skip to final state. `sessionStorage` clears when the tab/browser closes, so a new session (or page refresh) replays the animation.

**How we're using it:** Hero animation plays on each page refresh but NOT when scrolling back to hero within the same page visit. A `useRef` or state flag tracks "has played this mount" — animation runs once per page load, not once per scroll-into-view.

**Advantages:**
- First impression is theatrical
- Returning scroll doesn't re-trigger (no annoyance)
- Refresh replays (user expects fresh page state on refresh)

**Disadvantages:**
- Slightly more logic to manage in animation components
- Need to ensure the "final state" (no animation) looks identical to the animated end state

---

---

## Scroll Bleed / Body Scroll Lock

**What it is:** When a modal or bottom sheet is open and the user scrolls inside it, the scroll event "leaks through" to the page behind once the user reaches the top/bottom of the modal content, causing the background page to scroll unexpectedly.

**How it's fixed:** When the modal/bottom sheet opens, set `overflow: hidden` on `<body>` (and optionally `position: fixed` on iOS Safari to prevent bounce-scroll). Remove on close.

**How we're using it:** All modals and bottom sheets lock body scroll when open. Only the sheet's internal content scrolls.

**Advantages:**
- Prevents confusing dual-scrolling behavior
- Keeps user focused on modal content
- Standard UX pattern across all platforms

**Disadvantages:**
- On iOS Safari, requires extra handling (position: fixed + restore scroll position on close)
- Must remember to unlock body scroll on dismiss (including edge cases like pressing Escape key)

---

## Scroll-Reveal Animation

**What it is:** When a user scrolls down and a section enters the viewport for the first time, the section's elements animate in (fade up, stagger between children) rather than appearing instantly. Gives the page a sense of life and progression.

**How it's done:** Intersection Observer detects when the section enters the viewport (threshold ~0.2). Framer Motion `animate` triggers `opacity: 0→1` + `translateY: 20px→0` with stagger between children (50–75ms). Plays only once per page load.

**How we're using it:** Each major section (Projects, Experience, Skills, Contact) will have a subtle entrance animation when first scrolled into view. Heading animates first, content follows.

**Advantages:**
- Makes the page feel alive and polished
- Guides attention to new content as it appears
- Low effort with Framer Motion + Intersection Observer (already installed)
- Subtle enough to not slow the user down

**Disadvantages:**
- Content is invisible until scrolled to (can be a problem if user jumps via anchor link — needs to handle that case)
- Must respect `prefers-reduced-motion` (instant display, no animation)

---

*New terms will be added as they come up in conversation.*

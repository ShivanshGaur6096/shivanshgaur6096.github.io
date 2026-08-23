# Requirements Document

## Introduction

The Projects section is the second major section of the portfolio, immediately following the Hero. It showcases Shivansh's professional work through a horizontal carousel of project cards with detail views. The section replaces the existing `src/components/Projects.js` component with a fully redesigned implementation featuring brand-colored cards, an iOS App Store–style peeking carousel, adaptive detail overlays (bottom sheet on mobile, modal on desktop), and a special GitHub Projects card.

## Glossary

- **Carousel**: A horizontal scrollable container displaying one project card at a time with adjacent cards partially visible on the edges (peeking pattern).
- **Project_Card**: A reusable React component that renders a single project's summary information (screenshot/logo, title, role, description, tech stack, and link).
- **Detail_View**: An overlay (bottom sheet on mobile, centered modal on desktop) that displays expanded project information including a screenshot carousel.
- **Bottom_Sheet**: A mobile-specific overlay that slides up from the bottom of the viewport, max height ~85vh, top corners rounded.
- **Modal**: A desktop-specific overlay centered on screen, max height ~80vh, all four corners rounded.
- **Pagination_Indicator**: A capsule-shaped frosted-glass element containing clickable dots representing carousel position.
- **GitHub_Projects_Card**: A special-layout card (the last in the carousel) with a white background and capsule-shaped list items linking to GitHub repositories.
- **Brand_Color**: A unique hex color per project card drawn from the real company's brand identity, used as an accent (left border or tinted background).
- **Scroll_Lock**: Disabling body scroll while a detail overlay is open to prevent scroll bleed to the page beneath.
- **Reduced_Motion**: The user's `prefers-reduced-motion: reduce` media query preference, which disables transform-based animations.

## Requirements

### Requirement 1: Section Layout and Heading

**User Story:** As a visitor, I want to see a clearly labeled projects section after the hero, so that I know I'm viewing the developer's work.

#### Acceptance Criteria

1. THE Projects_Section SHALL render as the second `<section>` element on the page, immediately after the Hero section.
2. THE Projects_Section SHALL display the heading "What I've Built" using the `--text-h1` type scale token with Inter font at weight 600–700.
3. THE Projects_Section SHALL use semantic HTML with a proper heading hierarchy (`<h2>`) and an accessible landmark via `id="projects"`.

---

### Requirement 2: Scroll-Reveal Animation

**User Story:** As a visitor, I want projects to animate in as I scroll down, so that the page feels polished and alive.

#### Acceptance Criteria

1. WHEN the Projects_Section enters the viewport (Intersection Observer threshold 0.2), THE Projects_Section SHALL animate the heading with a fade-up entrance (opacity 0→1, translateY 20px→0) over 500ms using easing `cubic-bezier(0.16, 1, 0.3, 1)`.
2. WHEN the heading entrance completes, THE Carousel SHALL animate in with a staggered fade-up entrance 150–300ms after the heading.
3. THE Projects_Section SHALL trigger entrance animations only once per page load (scroll-back does not replay).
4. WHILE Reduced_Motion is active, THE Projects_Section SHALL skip all transform-based animations and apply opacity transitions only.

---

### Requirement 3: Carousel Behavior

**User Story:** As a visitor, I want to browse projects one at a time in a carousel, so that each project gets focused attention while signaling more content exists.

#### Acceptance Criteria

1. THE Carousel SHALL display one Project_Card at a time with adjacent cards partially visible on the left and right edges (peeking pattern, iOS App Store style).
2. THE Carousel SHALL NOT render arrow/chevron navigation buttons.
3. WHEN on desktop, THE Carousel SHALL support navigation via drag-to-scroll, clicking on peeking card edges, and clickable Pagination_Indicator dots.
4. WHEN on mobile (viewport ≤768px), THE Carousel SHALL support navigation via native swipe gesture and clickable Pagination_Indicator dots.
5. THE Carousel SHALL snap to the nearest card after a scroll interaction completes (CSS scroll-snap or equivalent).
6. THE Carousel SHALL render cards in this fixed order: Natwest, MagicCall, AI Voice Assistant, Bell Mobile, This Portfolio, GitHub Projects Card.

---

### Requirement 4: Pagination Indicator

**User Story:** As a visitor, I want to see which project I'm on and jump to any project, so that I can navigate the carousel efficiently.

#### Acceptance Criteria

1. THE Pagination_Indicator SHALL render below the Carousel as a capsule-shaped element (border-radius: 999px) with a frosted glass effect (`backdrop-filter: blur(20px)`, `rgba(255,255,255,0.12)` background, subtle white border).
2. THE Pagination_Indicator SHALL display one dot per project card, with the active card's dot visually distinct (filled vs hollow).
3. WHEN a user clicks a pagination dot, THE Carousel SHALL scroll to the corresponding Project_Card.
4. WHEN the active card changes via scroll or swipe, THE Pagination_Indicator SHALL update the active dot to reflect the currently visible card.
5. THE Pagination_Indicator dots SHALL be keyboard-focusable and activatable via Enter or Space key.

---

### Requirement 5: Project Card Component

**User Story:** As a visitor, I want to see a summary of each project at a glance, so that I can decide which ones to explore further.

#### Acceptance Criteria

1. THE Project_Card SHALL accept props for: `brandColor`, `title`, `role`, `description`, `techStack` (array), `screenshots` (array), and `appStoreLink` (string or null).
2. WHEN on desktop (viewport >768px), THE Project_Card SHALL display the screenshot/logo on the LEFT and text content on the RIGHT in a horizontal layout.
3. WHEN on mobile (viewport ≤768px), THE Project_Card SHALL display the screenshot/logo on TOP and text content on the BOTTOM in a vertical layout.
4. THE Project_Card SHALL apply the project's Brand_Color as an accent (left border or tinted background area).
5. THE Project_Card SHALL render with 12px border-radius and use `--bg-secondary` background with `--border-subtle` border.
6. THE Project_Card SHALL render tech stack tags using JetBrains Mono font at `--text-label` size with `--bg-tertiary` background and 6px border-radius.
7. THE Project_Card SHALL render an App Store link button as a capsule-shaped element (border-radius: 999px) when `appStoreLink` is provided.
8. IF `screenshots` is empty, THEN THE Project_Card SHALL display the project logo as a fallback in the image area.
9. THE Project_Card SHALL use `object-fit: cover` for images and support responsive scaling from 1200×675px source images.

---

### Requirement 6: Project Brand Colors

**User Story:** As a visitor, I want each project to have a unique color identity, so that the carousel feels visually varied and each project is distinct.

#### Acceptance Criteria

1. THE Project_Card for Natwest SHALL use Brand_Color `#3c1053` (purple).
2. THE Project_Card for MagicCall SHALL use Brand_Color `#D71C2B` (red).
3. THE Project_Card for AI Voice Assistant SHALL use Brand_Color `#ea4335` (red).
4. THE Project_Card for Bell Mobile SHALL use Brand_Color `#0066A4` (blue).
5. THE Project_Card for This Portfolio SHALL use Brand_Color `#3b82f6` (blue).
6. THE GitHub_Projects_Card SHALL use a white/light background instead of Brand_Color accent.

---

### Requirement 7: Detail View — Mobile Bottom Sheet

**User Story:** As a mobile visitor, I want project details to slide up from the bottom, so that the interaction feels native to my device.

#### Acceptance Criteria

1. WHEN a user taps a Project_Card on a viewport ≤768px, THE Detail_View SHALL render as a Bottom_Sheet sliding up from the bottom of the viewport.
2. THE Bottom_Sheet SHALL have a max height of approximately 85vh with top corners rounded (bottom corners off-screen).
3. THE Bottom_Sheet SHALL lock body scroll (Scroll_Lock) while open.
4. THE Bottom_Sheet SHALL display a close button in the top-right corner with a translucent/frosted appearance and low visual weight.
5. THE Bottom_Sheet content SHALL scroll as a single unit (images are NOT sticky).
6. WHEN the close button is activated, THE Bottom_Sheet SHALL dismiss and restore body scroll.

---

### Requirement 8: Detail View — Desktop Modal

**User Story:** As a desktop visitor, I want project details to appear in a centered modal, so that the interaction feels appropriate for a large screen.

#### Acceptance Criteria

1. WHEN a user clicks a Project_Card on a viewport >768px, THE Detail_View SHALL render as a centered Modal with a backdrop overlay.
2. THE Modal SHALL have a max height of approximately 80vh with all four corners rounded (12px).
3. THE Modal SHALL lock body scroll (Scroll_Lock) while open.
4. THE Modal SHALL display a close button in the top-right corner with a translucent/frosted appearance.
5. THE Modal content SHALL scroll as a single unit (images are NOT sticky).
6. WHEN the user clicks the backdrop outside the Modal, THE Modal SHALL dismiss.
7. WHEN the user presses the Escape key, THE Modal SHALL dismiss and restore body scroll.
8. THE Modal close button SHALL be keyboard-focusable and activated via Enter or Space key.

---

### Requirement 9: Detail View Content

**User Story:** As a visitor, I want to see full project details including multiple screenshots, so that I can understand the scope and quality of the work.

#### Acceptance Criteria

1. THE Detail_View SHALL display a screenshot auto-carousel at the top of the content area with images at 8–12px border-radius.
2. THE Detail_View screenshot carousel SHALL include a capsule-shaped Pagination_Indicator within the image area.
3. THE Detail_View SHALL display an App Store button in the bottom-right of the image area when an App Store link exists.
4. THE Detail_View SHALL display a heading (project name) and body text (description) below the image carousel.
5. THE Detail_View content area SHALL be scrollable when content exceeds the available height.

---

### Requirement 10: Multi-Project Detail Views

**User Story:** As a visitor, I want to see all related work under one company when I open a project detail, so that I understand the full scope of the developer's contributions.

#### Acceptance Criteria

1. WHEN the Natwest card is opened, THE Detail_View SHALL display Natwest as a single project detail.
2. WHEN the MagicCall card is opened, THE Detail_View SHALL display MagicCall as the hero project with other BlackNGreen projects shown in a sub-carousel and additional content.
3. WHEN the AI Voice Assistant card is opened, THE Detail_View SHALL display it as a single project detail.
4. WHEN the Bell card is opened, THE Detail_View SHALL display Bell as the hero project with Virgin Plus, PC Mobile, and Lucky Mobile included in the same detail view.
5. WHEN the This Portfolio card is opened, THE Detail_View SHALL display it as a single project detail.
6. WHEN the GitHub_Projects_Card is activated, THE card SHALL NOT open a Detail_View — links open directly in a new tab.

---

### Requirement 11: GitHub Projects Card (Special Layout)

**User Story:** As a visitor, I want quick access to the developer's open-source work without needing to open a detail view, so that I can explore side projects efficiently.

#### Acceptance Criteria

1. THE GitHub_Projects_Card SHALL render with a white/light background and rounded corners (12px), visually distinct from standard project cards.
2. THE GitHub_Projects_Card SHALL display 3 capsule-shaped list items, each containing a circle indicator and a project name that links to a GitHub repository.
3. WHEN a user clicks a capsule list item, THE link SHALL open the corresponding GitHub repository in a new browser tab.
4. WHEN a GitHub repository link has been visited, THE GitHub_Projects_Card SHALL change the circle indicator from hollow (○) to a green checkmark (✓) using localStorage-based state.
5. THE GitHub_Projects_Card SHALL display a "...more" link in the bottom-right area that navigates to the full GitHub profile page (https://github.com/ShivanshGaur6096).
6. THE GitHub_Projects_Card SHALL NOT trigger a Detail_View on click — individual links navigate directly.

---

### Requirement 12: Accessibility

**User Story:** As a visitor using assistive technology, I want the projects section to be fully navigable and understandable, so that I can access all project information.

#### Acceptance Criteria

1. THE Projects_Section SHALL use semantic HTML elements (`<section>`, `<h2>`, `<article>` for cards, `<button>` for interactive controls).
2. THE Carousel SHALL be navigable via keyboard (Tab to focus cards, Enter/Space to open details).
3. THE Detail_View SHALL trap focus within the overlay while open and return focus to the triggering card on close.
4. THE Detail_View close button SHALL have an `aria-label` of "Close".
5. THE Pagination_Indicator dots SHALL have `aria-label` attributes indicating the project name (e.g., "Go to Natwest project").
6. THE Project_Card interactive elements SHALL have visible focus indicators using `--accent` color with a 2px ring offset.
7. WHILE Reduced_Motion is active, THE Carousel SHALL disable drag-based scroll animations and transition instantly between cards.

---

### Requirement 13: Responsive Image Handling

**User Story:** As a visitor on any device, I want project images to load correctly and look crisp, so that the portfolio feels professional across screen sizes.

#### Acceptance Criteria

1. THE Project_Card SHALL render images from 1200×675px (16:9 ratio) source files using `object-fit: cover` for responsive scaling.
2. THE Project_Card images SHALL have 8–12px rounded corners within the card layout.
3. IF a project has no screenshots, THEN THE Project_Card SHALL render the project logo centered in the image area as a fallback.
4. THE Detail_View screenshot carousel SHALL display images at consistent 16:9 aspect ratio with 8–12px rounded corners.

---

### Requirement 14: Scroll Lock Utility

**User Story:** As a visitor, I want the page behind an overlay to stay in place, so that I don't lose my scroll position when viewing project details.

#### Acceptance Criteria

1. WHEN a Detail_View opens, THE Scroll_Lock utility SHALL disable scrolling on the `<body>` element.
2. WHEN a Detail_View closes, THE Scroll_Lock utility SHALL restore the previous scroll position and re-enable body scrolling.
3. THE Scroll_Lock utility SHALL prevent scroll bleed (touch events on the overlay must not scroll the page beneath).

---

### Requirement 15: Theming Support

**User Story:** As a visitor using light mode, I want the projects section to look intentionally designed for my theme preference, so that the experience is cohesive.

#### Acceptance Criteria

1. THE Projects_Section SHALL use CSS custom properties for all colors, ensuring compatibility with both dark and light themes.
2. WHILE dark theme is active, THE Project_Card SHALL use `--bg-secondary` background, `--border-subtle` border, and `--text-primary`/`--text-secondary` text colors.
3. WHILE light theme is active, THE Project_Card SHALL use the corresponding light-theme token values for background, border, and text.
4. THE GitHub_Projects_Card SHALL maintain its white/light background in both themes, with adjusted text colors for readability.
5. THE Pagination_Indicator frosted glass effect SHALL remain visually consistent across both themes via appropriate alpha-channel backgrounds.

# Implementation Tasks

## Task 1: Project scaffolding and data layer

- [ ] 1.1 Create the `src/components/ProjectsSection/` folder structure with all planned files (empty placeholders)
- [ ] 1.2 Create `projectsData.js` with all project card data, detail data, GitHub card data, and animation config constants
- [ ] 1.3 Create SVG icon components (`CloseIcon.js`, `AppStoreIcon.js`, `CheckIcon.js`) in the `icons/` subfolder

## Task 2: Custom hooks

- [ ] 2.1 Implement `useScrollReveal` hook — wraps react-intersection-observer with triggerOnce, returns { ref, hasRevealed }
- [ ] 2.2 Implement `useCarouselPosition` hook — uses IntersectionObserver on carousel items to track activeIndex, exposes scrollToIndex
- [ ] 2.3 Implement `useScrollLock` hook — disables/enables body scroll with iOS Safari position:fixed pattern, preserves scroll position
- [ ] 2.4 Implement `useVisitedLinks` hook — reads/writes visited URLs to localStorage with try/catch fallback
- [ ] 2.5 Move `useReducedMotion` to `src/hooks/useReducedMotion.js` if not already shared, or import from existing HeroSection location

## Task 3: ProjectCard and GitHubProjectsCard components

- [ ] 3.1 Implement `ProjectCard.js` — reusable card with responsive layout (row on desktop, column on mobile), brand color accent border, image/logo area with fallback, tech stack tags, App Store link button
- [ ] 3.2 Implement `GitHubProjectsCard.js` — white/light background card with capsule list items, visited indicators via useVisitedLinks, "...more" link, no detail view trigger
- [ ] 3.3 Write CSS for project cards — responsive flex layout, brand color border, hover states, focus-visible outline, tag styling (JetBrains Mono)

## Task 4: Carousel and Pagination

- [ ] 4.1 Implement `ProjectCarousel.js` — flex container with scroll-snap, peeking edges via padding, hidden scrollbar, renders ProjectCard items + GitHubProjectsCard as last item
- [ ] 4.2 Implement `PaginationIndicator.js` — frosted glass capsule with clickable dots, active state, keyboard accessible, aria-labels per dot
- [ ] 4.3 Write CSS for carousel — scroll-snap behavior, peeking edges, smooth scroll, and pagination frosted glass effect
- [ ] 4.4 Connect `useCarouselPosition` to carousel and pagination — active dot updates on scroll, dot click scrolls to card

## Task 5: Detail overlay system

- [ ] 5.1 Implement `BottomSheet.js` — fixed bottom overlay with Framer Motion slide-up animation, max-height 85vh, top rounded corners, scrollable content, frosted close button
- [ ] 5.2 Implement `Modal.js` — fixed centered overlay with Framer Motion scale+opacity entrance, max-height 80vh, backdrop click dismiss, Escape key dismiss, all corners rounded
- [ ] 5.3 Implement `DetailOverlay.js` — adaptive wrapper that checks viewport width on open and renders BottomSheet (≤768px) or Modal (>768px), integrates useScrollLock and focus trap
- [ ] 5.4 Implement `ScreenshotCarousel.js` — horizontal scroll-snap image carousel with auto-advance (4s interval), capsule pagination, App Store button overlay, pause on interaction
- [ ] 5.5 Implement `DetailContent.js` — renders screenshot carousel, heading, body text, and sub-projects for multi-project detail views (Bell, MagicCall)
- [ ] 5.6 Write CSS for overlays — backdrop, bottom sheet slide-up, modal centering, frosted close button, screenshot carousel layout, responsive detail content

## Task 6: Container assembly and scroll-reveal

- [ ] 6.1 Implement `ProjectsSection.js` — container component with section heading, scroll-reveal via useScrollReveal, openProjectId state management, renders carousel + overlay
- [ ] 6.2 Add entrance animations — heading fade-up on reveal, carousel stagger fade-up after heading, using Framer Motion with reduced-motion bypass
- [ ] 6.3 Write remaining CSS in `ProjectsSection.css` — section spacing, heading styles, scroll-reveal transitions, theme support (dark + light custom properties)

## Task 7: Integration and cleanup

- [ ] 7.1 Update `App.js` — replace `import Projects` with `import ProjectsSection`, swap `<Projects />` for `<ProjectsSection />` in render
- [ ] 7.2 Delete old `src/components/Projects.js` file
- [ ] 7.3 Verify build compiles without errors (`npm run build`)
- [ ] 7.4 Verify accessibility — keyboard navigation through carousel and overlay, focus trap, aria-labels, screen reader announcements
- [ ] 7.5 Verify reduced motion — entrance animations skip transforms, carousel scroll-behavior auto, overlay transitions instant

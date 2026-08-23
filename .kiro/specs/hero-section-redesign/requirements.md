# Requirements Document

## Introduction

Redesign the portfolio hero section to replace the existing parallax mountain/moon/iPhone landing page with a modern, text-forward, animated hero that communicates the owner's identity as an iOS developer. The new hero features a sequenced typewriter entrance animation, an interactive subtitle shuffle game, inline social icons, and a photo positioned as a complementary background element. Built with React 19 and Framer Motion 12.4 on the existing Create React App setup.

## Glossary

- **Hero_Section**: The full-viewport introductory section of the portfolio website occupying 100vh
- **Animation_Orchestrator**: The logic controlling the sequenced timeline of entrance animations
- **Subtitle_Shuffler**: The interactive component that cycles through descriptor labels on tap/click using a character shuffle animation
- **Typewriter**: A character-by-character text reveal animation that simulates typing
- **Shuffle_Animation**: A ~400ms animation where characters randomize before resolving to the target string
- **End_Message**: A dismissive/humorous message shown after the user has tapped through ~8 subtitle items
- **Hint_Text**: A one-line prompt that appears after the entrance animation completes, inviting the user to tap the subtitle
- **Social_Icons**: Inline icons for GitHub, LinkedIn, Email, and Resume links
- **Profile_Photo**: A side-profile photograph displayed at reduced opacity with a gradient edge
- **Resume_Button**: A call-to-action button that triggers download of the resume PDF
- **Reduced_Motion_Mode**: A state where all motion is skipped and final visual states are shown instantly, triggered by `prefers-reduced-motion: reduce`

## Requirements

### Requirement 1: Hero Section Layout

**User Story:** As a visitor, I want to see a clear, full-screen introduction section, so that I immediately understand who the site owner is and what they do.

#### Acceptance Criteria

1. THE Hero_Section SHALL occupy exactly 100vh of viewport height with content vertically centered.
2. WHILE the viewport width is greater than 768px, THE Hero_Section SHALL display the text block left-aligned on the left side and the Profile_Photo on the right side.
3. WHILE the viewport width is 768px or less, THE Hero_Section SHALL display the text block at the top (left-aligned) and the Profile_Photo below it (horizontally centered).
4. THE Hero_Section SHALL apply CSS `scroll-snap-type: y proximity` so the hero acts as a snap point.
5. THE Hero_Section SHALL NOT display a scroll-down indicator.

---

### Requirement 2: Static Content Display

**User Story:** As a visitor, I want to see the owner's name and role immediately on page load, so that I can identify the person without waiting for animations.

#### Acceptance Criteria

1. THE Hero_Section SHALL display "Shivansh Gaur" as an h1 heading using the logo font (Syne 800, clamp(36px, 5vw, 72px) desktop, 36–44px mobile).
2. THE Hero_Section SHALL display "iOS Developer" as the initial subtitle text immediately on load with no entrance animation.
3. THE Profile_Photo SHALL appear immediately on load at 70–85% opacity with a gradient on its left edge that fades into the page background color.
4. WHEN the page loads, THE Hero_Section SHALL render the name, subtitle, and photo at time 0.0s with no delay or motion.

---

### Requirement 3: Typewriter Paragraph Animation

**User Story:** As a visitor, I want to see the intro paragraph type in character by character, so that the entrance feels personal and attention-grabbing.

#### Acceptance Criteria

1. WHEN the page loads, THE Typewriter SHALL begin revealing the intro paragraph character by character starting at time 0.0s.
2. THE Typewriter SHALL complete the full paragraph text within approximately 0.8 seconds.
3. THE Typewriter SHALL reveal the text: "I craft native iOS experiences for apps used by millions. Currently building at Natwest, previously shaped products at BlackNGreen and Tech Mahindra."
4. WHILE Reduced_Motion_Mode is active, THE Typewriter SHALL skip the animation and display the full paragraph text instantly.

---

### Requirement 4: Social Icons Sequential Pulse

**User Story:** As a visitor, I want the social links to appear with a sequential pulse after the paragraph finishes typing, so that I notice them as interactive elements.

#### Acceptance Criteria

1. WHEN the Typewriter animation completes (at approximately 0.8s), THE Social_Icons SHALL begin pulsing in sequence with their brand colors.
2. THE Social_Icons SHALL include links to GitHub, LinkedIn, Email, and Resume in that order.
3. THE Social_Icons SHALL complete their sequential pulse animation within approximately 0.6 seconds (finishing at ~1.4s).
4. THE Social_Icons SHALL be rendered inline, positioned after the paragraph text.
5. WHILE Reduced_Motion_Mode is active, THE Social_Icons SHALL appear in their final state immediately without pulse animation.

---

### Requirement 5: Resume Button Type-Delete-Retype Animation

**User Story:** As a visitor, I want the download button to have a playful type-delete-retype entrance, so that it draws attention to the primary CTA.

#### Acceptance Criteria

1. WHEN the Social_Icons animation completes (at approximately 1.4s), THE Resume_Button SHALL begin typing "or just".
2. WHEN "or just" is fully typed (at approximately 1.7s), THE Resume_Button SHALL pause briefly.
3. WHEN the pause ends (at approximately 1.9s), THE Resume_Button SHALL delete the "or just" text.
4. WHEN deletion completes (at approximately 2.1s), THE Resume_Button SHALL type "Download Resume" and remain visible permanently.
5. WHEN clicked, THE Resume_Button SHALL initiate download of the resume PDF file.
6. WHILE Reduced_Motion_Mode is active, THE Resume_Button SHALL display "Download Resume" in its final state immediately without the type-delete-retype animation.

---

### Requirement 6: Subtitle Shuffle Interaction

**User Story:** As a visitor, I want to tap/click the subtitle to discover fun facts about the owner, so that the introduction feels interactive and memorable.

#### Acceptance Criteria

1. WHEN the user clicks or taps the subtitle text, THE Subtitle_Shuffler SHALL trigger a character shuffle animation lasting approximately 400ms that resolves to the next item in the descriptor array.
2. THE Subtitle_Shuffler SHALL cycle through the array: ["iOS Developer", "Software Engineer", "Swift Enthusiast", "Good Cook", "Excellent Baker", "Technical TT Player", "Nature Lover", "Homo Sapien", "Vegetarian", "Blind in Love"].
3. THE Subtitle_Shuffler SHALL append shown items to the end of the array and draw from the front, ensuring no repeats until the full cycle completes.
4. WHEN approximately 8 items have been shown, THE Subtitle_Shuffler SHALL display end messages one at a time on subsequent taps, rotating through: "Alright, you know enough. Scroll down to see the real stuff.", "Careful — learning too much won't make us friends.", "That's the full list. Now go explore the rest.", "Still here? There's way more to see below."
5. WHEN the game-over state is reached, THE Subtitle_Shuffler SHALL display a restart ⟳ icon beside the subtitle text.
6. WHEN the user taps the ⟳ icon, THE Subtitle_Shuffler SHALL reset the descriptor array and restart the game from the beginning.
7. THE Subtitle_Shuffler SHALL announce each new subtitle value to assistive technologies using aria-live.

---

### Requirement 7: Hint Text

**User Story:** As a visitor, I want a subtle hint that the subtitle is interactive, so that I discover the shuffle feature without needing external instruction.

#### Acceptance Criteria

1. WHEN all entrance animations complete (at approximately 2.5s after page load), THE Hint_Text SHALL appear below the subtitle with a fade or pulse animation.
2. WHEN the user taps/clicks the subtitle for the first time, THE Hint_Text SHALL fade away and not reappear during the current page session.
3. WHILE the Hint_Text is visible, THE Hint_Text SHALL display a message inviting the user to tap the subtitle (e.g., "tap to discover more about me").
4. WHILE Reduced_Motion_Mode is active, THE Hint_Text SHALL appear instantly without animation after load.

---

### Requirement 8: Animation Lifecycle Control

**User Story:** As a visitor, I want the entrance animation to play only once per page load, so that returning to the hero by scrolling does not replay the animation.

#### Acceptance Criteria

1. THE Animation_Orchestrator SHALL play the full entrance sequence exactly once per page load.
2. WHEN the user scrolls away from the Hero_Section and scrolls back, THE Animation_Orchestrator SHALL NOT replay any entrance animations.
3. WHEN the user refreshes the page, THE Animation_Orchestrator SHALL replay the full entrance sequence.
4. THE Animation_Orchestrator SHALL follow the timing sequence: 0.0s (static elements) → 0.0–0.8s (typewriter) → 0.8–1.4s (icons) → 1.4–2.1s (button) → ~2.5s (hint).

---

### Requirement 9: Profile Photo Treatment

**User Story:** As a visitor, I want the photo to complement the text without competing for attention, so that I can read the introduction clearly.

#### Acceptance Criteria

1. THE Profile_Photo SHALL be displayed at 70–85% opacity.
2. THE Profile_Photo SHALL have a gradient overlay on its left edge that transitions from the page background color to transparent, ensuring text readability.
3. WHILE the viewport width is greater than 768px, THE Profile_Photo SHALL be positioned on the right side of the hero with the subject facing left toward the text.
4. WHILE the viewport width is 768px or less, THE Profile_Photo SHALL be centered below the text content.

---

### Requirement 10: Accessibility

**User Story:** As a visitor using assistive technology, I want the hero section to be fully accessible, so that I can understand all content and interact with all features.

#### Acceptance Criteria

1. THE Hero_Section SHALL use an h1 element for the "Shivansh Gaur" heading to establish proper document heading hierarchy.
2. THE Subtitle_Shuffler SHALL use an aria-live="polite" region so screen readers announce subtitle changes.
3. WHILE Reduced_Motion_Mode is active, THE Hero_Section SHALL skip all transform and positional animations and display final visual states instantly.
4. WHILE Reduced_Motion_Mode is active, THE Hero_Section SHALL permit opacity transitions as the only allowed animation.
5. THE Social_Icons SHALL include descriptive accessible labels for each link (GitHub, LinkedIn, Email, Resume).
6. THE Resume_Button SHALL be keyboard-focusable and operable via Enter key.

---

### Requirement 11: Theming and CSS Architecture

**User Story:** As a developer, I want the hero section to use CSS custom properties, so that theming (dark/light) can be applied consistently and maintained easily.

#### Acceptance Criteria

1. THE Hero_Section SHALL use CSS custom properties (variables) for all color values as defined in the design system (e.g., `--bg-primary`, `--text-primary`, `--accent`).
2. THE Hero_Section SHALL be styled for dark theme as the primary presentation.
3. THE Hero_Section SHALL NOT hard-code color hex values directly in component styles.
4. THE Hero_Section SHALL use the typography tokens from the design system: Syne 800 for the name, Inter for headings and body, JetBrains Mono for labels/metadata.

---

### Requirement 12: Responsive Behavior

**User Story:** As a mobile visitor, I want the hero section to adapt gracefully to my screen size, so that all content is readable and interactive regardless of device.

#### Acceptance Criteria

1. WHILE the viewport width is greater than 768px, THE Hero_Section SHALL use a side-by-side layout with text on the left and photo on the right.
2. WHILE the viewport width is 768px or less, THE Hero_Section SHALL stack content vertically with text above and photo below.
3. THE Hero_Section SHALL scale typography using the design system's responsive type tokens (name: Syne 800 clamp(36px, 5vw, 72px); headings: Inter 600 clamp(20px, 3vw, 32px)).
4. THE Hero_Section SHALL maintain all interactive features (subtitle shuffle, button click) on touch devices.
5. THE Subtitle_Shuffler SHALL respond to tap events on mobile with the same behavior as click events on desktop.

---

### Requirement 13: Replace Existing Hero Component

**User Story:** As a developer, I want the old parallax hero to be completely replaced, so that the codebase does not carry dead code or conflicting styles.

#### Acceptance Criteria

1. THE Hero_Section implementation SHALL replace the existing `src/components/LandingPage.js` and `src/components/LandingPage.css` files.
2. THE Hero_Section SHALL NOT reference any assets from the old parallax design (mountains, moon, plant, iPhone-in-hand images).
3. THE Hero_Section SHALL integrate with the existing App.js routing and component structure without breaking other sections.

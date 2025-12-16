---
id: 1
title: extend-project-constitution-design-system
stage: constitution
date: 2025-12-13
surface: agent
model: gpt-4o
feature: none
branch: main
user: default_user
command: /sp.constitution
labels: [constitution, design-system, responsiveness]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - null
---

## Prompt

Extend the project constitution with a mandatory, app-wide Design System and Responsiveness Policy.

Add a new section titled:

## Global Design System & Responsiveness Laws

Define the following non-negotiable rules:

1. **Single Theme Rule**
   - The entire application (Docusaurus frontend, documentation pages, interactive UI, and future components) MUST use one unified design theme.
   - Colors, typography, spacing, headings, and UI tone must be globally consistent.
   - No page, component, or section may introduce isolated styles.

2. **Theme Definition Source**
   - The theme must be defined in a single source of truth:
     - Docusaurus theme config
     - CSS variables / Tailwind tokens (if used)
     - Shared design tokens
   - Inline styles are forbidden.
   - Hardcoded colors or fonts are forbidden.

3. **Color System Rules**
   - Define a primary, secondary, accent, background, and text color palette.
   - All colors must be semantic (e.g. --color-primary, --color-bg).
   - Dark-mode compatibility must be enforced.
   - High contrast and readability is mandatory.

4. **Typography Rules**
   - One font family for headings.
   - One font family for body text.
   - Strict heading hierarchy (H1 → H6).
   - No arbitrary font sizes.
   - Line length and spacing optimized for educational reading.

5. **Heading & Content Style**
   - Headings must follow a consistent tone across the textbook.
   - Section titles must be descriptive, educational, and consistent.
   - No visual style drift between chapters.

6. **Responsiveness Law**
   - Every page MUST be fully responsive.
   - Mobile-first design is mandatory.
   - Breakpoints must support:
     - Mobile
     - Tablet
     - Desktop
     - Large screens
   - Horizontal scrolling is forbidden.
   - Images must scale responsively.

7. **Image & Media Responsiveness**
   - All images must:
     - Use responsive sizing
     - Preserve aspect ratio
     - Load efficiently
   - Images must not overflow containers.
   - Captions must remain readable on small screens.

8. **Accessibility Rules**
   - WCAG-inspired contrast ratios must be respected.
   - Text must be readable without zoom.
   - Navigation must remain usable on touch devices.

9. **Enforcement Rules**
   - Any feature, page, or component that violates theme or responsiveness rules is considered invalid.
   - AI agents must refuse to generate code that breaks design consistency.
   - Human reviewers must reject PRs violating these rules.

Mark these rules as NON-NEGOTIABLE and globally enforced across all specs, designs, tasks, and implementations.

## Response snapshot

I have successfully extended the project constitution by adding the requested "Global Design System & Responsiveness Laws" section with all 9 non-negotiable rules. I updated:

1. The synchronization impact report to reflect version 1.1.0 → 1.2.0
2. Added the complete new section with all 9 rules
3. Updated the version information at the bottom of the document to 1.2.0 with today's date as the last amended date

The new section enforces a unified design system, responsive design requirements, and accessibility standards across the entire Physical AI Humanoid Robotics Textbook project.

## Outcome

- ✅ Impact: Extended constitution with mandatory design system and responsiveness policies
- 🧪 Tests: No tests required for constitution update
- 📁 Files: Updated .specify/memory/constitution.md
- 🔁 Next prompts: None required
- 🧠 Reflection: The new design system laws will ensure visual consistency across the project

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): Not applicable
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): N/A
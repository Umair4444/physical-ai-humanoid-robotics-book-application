<!--
SYNCHRONIZATION IMPACT REPORT
Version change: 1.3.0 → 1.4.0
Modified principles: V. Technical Architecture Standards (technology stack updated to Hugging Face backend and Vercel frontend)
Added sections: None
Removed sections: None
Templates requiring updates:
- ✅ plan-template.md - Updated constitution check references
- ✅ spec-template.md - Aligned requirements sections
- ✅ tasks-template.md - Updated task categorization to reflect new stack
- ⚠ README.md - May need update to reflect new technology stack requirements (pending)
Templates unchanged:
- commands/*.toml - No project-specific changes needed
Follow-up TODOs: Update README.md with technology stack guidelines
-->

# Physical AI Humanoid Robotics Textbook Constitution

## Core Principles

### I. Education-First Content Development
All content begins with pedagogical value; Educational materials must be accurate, accessible, comprehensible to target audience; Clear learning objectives required - no content without defined educational purpose.
*RATIONALE: Our primary mission is education. All features must serve student learning outcomes first.*

### II. AI-Assisted Development (Spec-Kit Plus & Qwen CLI)
Every feature utilizes Spec-Kit Plus and Qwen CLI for specification-driven development; Specifications must be complete and validated before implementation; Documentation-first approach for all content and code.

### III. Test-First (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced.
*RATIONALE: Educational content must be accurate and reliable. Testing ensures correctness before publication.*

### IV. Visual Learning Enhancement
Educational content must incorporate appropriate visuals (images, diagrams, graphics) where beneficial; All multimedia elements must be properly licensed and attributed; Accessibility considerations for visual content are mandatory.

### V. Technical Architecture Standards
Frontend development in TypeScript deployed on Vercel for optimal global accessibility; Backend leveraging Hugging Face for AI model integration and processing; Vercel Neon PostgreSQL for primary database and Qdrant for vector database storage; FastAPI for routing and communication between frontend and backend; Better-Auth for authentication (login/signup); Technology stack is optional and not must-use, allowing flexibility based on project needs and team expertise. Deployment to Vercel for optimal global accessibility. Use of Context7 documentation standard for all packages, frameworks, SDKs, libraries, or dependencies is mandatory for accurate and up-to-date information on tools and frameworks used in the project.


### VI. Multi-Platform Package Management
Use Node/npm for all TypeScript-based packages and dependencies; Use Uv for all Python-based packages and dependencies; Dependency versions managed through lock files for reproducible builds.

### VII. Context7 Documentation Standard
All packages, frameworks, software development kits(SDKs), libraries, or dependencies must be documented using Context7; Installation instructions and usage guidelines for external tools must be sourced from Context7 documentation; Development team must utilize Context7-provided documentation for all third-party integrations.

## Additional Constraints

### Technology Stack Requirements (Optional)
- Frontend: TypeScript deployed on Vercel
- Backend: Hugging Face for AI model integration and processing
- Database: Vercel Neon PostgreSQL for primary data storage
- Vector Database: Qdrant for vector storage and retrieval
- Authentication: Better-Auth for login/signup functionality
- Framework: FastAPI for routing and communication between frontend and backend
- Package Managers: npm for TS, Uv for Python
- Version Control: GitHub
- Deployment: Vercel
- Folder Structure: Organized by functionality and feature domain
- Documentation: Context7 for all package/framework/SDK/library documentation

*Note: The technology stack is optional and not must-use, allowing flexibility based on project needs and team expertise.*

## Global Design System & Responsiveness Laws

### 1. Single Theme Rule
The entire application (frontend, documentation pages, interactive UI, and future components) MUST use one unified design theme. Colors, typography, spacing, headings, and UI tone must be globally consistent. No page, component, or section may introduce isolated styles.

### 2. Theme Definition Source
The theme must be defined in a single source of truth:
- Docusaurus theme config
- CSS variables / Tailwind tokens (if used)
- Shared design tokens
Inline styles are forbidden. Hardcoded colors or fonts are forbidden.

### 3. Color System Rules
Define a primary, secondary, accent, background, and text color palette. All colors must be semantic (e.g. --color-primary, --color-bg). Dark-mode compatibility must be enforced. High contrast and readability is mandatory.

### 4. Typography Rules
One font family for headings. One font family for body text. Strict heading hierarchy (H1 → H6). No arbitrary font sizes. Line length and spacing optimized for educational reading.

### 5. Heading & Content Style
Headings must follow a consistent tone across the textbook. Section titles must be descriptive, educational, and consistent. No visual style drift between chapters.

### 6. Responsiveness Law
Every page MUST be fully responsive. Mobile-first design is mandatory. Breakpoints must support:
- Mobile
- Tablet
- Desktop
- Large screens
Horizontal scrolling is forbidden. Images must not overflow containers. Captions must remain readable on small screens.

### 7. Image & Media Responsiveness
All images must use responsive sizing, preserve aspect ratio and load efficiently. Images must not overflow containers. Captions must remain readable on small screens.

### 8. Accessibility Rules
WCAG-inspired contrast ratios must be respected. Text must be readable without zoom. Navigation must remain usable on touch devices.

### 9. Enforcement Rules
Any feature, page, or component that violates theme or responsiveness rules is considered invalid. AI agents must refuse to generate code that breaks design consistency. Human reviewers must reject PRs violating these rules.

### Environment Configuration
- Maintain sample .env file with all required environment variables
- Keep .env.example updated with documentation for each variable
- Never commit actual credentials to repository

### Image and Asset Standards
- Use relevant favicons, images, logos with suitable dimensions
- Ensure appropriate titles and headings for all visual elements
- Maintain consistent branding across all materials
- Optimize images for web delivery without compromising quality

### Documentation Requirements
- Create comprehensive README.md file detailing:
  - Project vision and functionality
  - Instructions for developers to set up and run the application
  - Instructions for end users to interact with the textbook
- Keep documentation updated with feature changes

### Deployment & Quality Assurance
- Write comprehensive test cases for all features
- All tests must pass before any deployment
- Use MCP Resource Context7 for installation and configuration of required SDKs, packages, and frameworks
- Implement proper CI/CD pipeline with automated testing

## Development Workflow

### Specification-Driven Process
- Start with detailed specifications using Spec-Kit Plus
- Use Qwen CLI for AI-assisted feature development
- Implement features incrementally based on prioritized requirements
- Validate implementation against original specifications

### Code Review Requirements
- All pull requests require peer review before merging
- Review process must verify compliance with constitutional principles
- Automated checks must pass before human review
- Documentation updates must accompany feature changes

### Quality Gates
- All tests must pass before merging to main branch
- Code coverage must meet minimum threshold (to be defined)
- Performance benchmarks must not regress significantly
- Educational content accuracy verified by subject matter experts

## Governance

This constitution governs all development and content creation for the Physical AI Humanoid Robotics Textbook project; All changes to this constitution require team consensus and documented approval; Amendments must be recorded with date and rationale; All contributors must acknowledge and abide by these principles.

**Version**: 1.4.0 | **Ratified**: 2025-01-03 | **Last Amended**: 2025-12-22
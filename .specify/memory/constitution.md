<!-- 
SYNCHRONIZATION IMPACT REPORT
Version change: 1.0.0 → 1.1.0
Modified principles: None (new project constitution)
Added sections: All sections are new for this project
Removed sections: None
Templates requiring updates: 
- ✅ plan-template.md - Updated constitution check references
- ✅ spec-template.md - Aligned requirements sections
- ⚠ tasks-template.md - May need review for specific task types (pending)
Templates unchanged: 
- commands/*.toml - No project-specific changes needed
Follow-up TODOs: None
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
Frontend development in TypeScript using Docusaurus for documentation; Backend in Python with FastAPI and OpenAI-Agent SDK; PostgreSQL database for content and user data management; Deployment to Vercel for optimal global accessibility.

### VI. Multi-Platform Package Management
Use Node/npm for all TypeScript-based packages and dependencies; Use Uv for all Python-based packages and dependencies; Dependency versions managed through lock files for reproducible builds.

## Additional Constraints

### Technology Stack Requirements
- Frontend: TypeScript with Docusaurus framework
- Backend: Python with FastAPI and OpenAI-Agent SDK
- Database: PostgreSQL
- Package Managers: npm for TS, Uv for Python
- Version Control: GitHub
- Deployment: Vercel
- Folder Structure: Organized by functionality and feature domain

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

**Version**: 1.1.0 | **Ratified**: 2025-01-03 | **Last Amended**: 2025-01-03
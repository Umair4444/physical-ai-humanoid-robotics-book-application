# Research Findings: Physical AI Humanoid Robotics Textbook Frontend

**Research Date**: 2025-12-12  
**Feature**: 001-ai-robotics-textbook

## Research Tasks Completed

### 1. Image Dimensions and Handling

- **Decision**: Standardize image dimensions based on content type
- **Rationale**: Consistency in image presentation improves user experience and simplifies development
- **Specifications**:
  - Lesson content images: 800x450px (16:9 aspect ratio)
  - Chapter summary images: 400x225px (16:9 aspect ratio)
  - Feature cards: 300x200px
  - Testimonial profile pictures: 80x80px circular
  - Icons: 24x24px or 48x48px depending on context
- **Implementation**: Use Tailwind classes with max-width constraints and responsive scaling
- **Alternatives considered**: 
  - Fluid sizing based on screen (rejected: too inconsistent)
  - Individual sizing per image (rejected: difficult to maintain)

### 2. RAG Chatbot Integration Method

- **Decision**: Implement RAG chatbot using REST API with WebSocket fallback
- **Rationale**: REST API provides simplicity and broad compatibility, with WebSocket available for real-time features if needed
- **Specifications**:
  - API endpoint: `/api/v1/chat`
  - Request format: `{ query: string, context: string, sessionId: string }`
  - Response format: `{ response: string, sources: string[], timestamp: date }`
  - Error handling: Return HTTP status codes and error messages
- **Alternatives considered**:
  - GraphQL (rejected: overkill for chatbot functionality)
  - Direct WebSocket connection (rejected: complexity vs benefit ratio)

### 3. Content Structure for Modules/Chapters

- **Decision**: Organize content using Docusaurus docs directory with structured metadata
- **Rationale**: Leverages Docusaurus' built-in content management while allowing flexibility
- **Specifications**:
  - Directory structure: `docs/modules/{module_number}/{chapter_number}.mdx`
  - Metadata format:
  ```
  ---
  id: chapter-1
  title: "Chapter Title"
  module: "Module Title"
  lessonTab: true
  summaryTab: true
  ---
  ```
  - Content separation: Use MDX components to distinguish lesson vs summary content
- **Alternatives considered**:
  - Separate databases (rejected: increases complexity)
  - Single file per module with all chapters (rejected: harder to manage and update)

### 4. Translation Implementation

- **Decision**: Use i18next with localized content files for each language
- **Rationale**: i18next provides robust internationalization with good React integration
- **Specifications**:
  - Translation files: `i18n/{language}/translation.json`
  - Content localization: `docs/{language}/modules/...`
  - Language codes: en-US (English), ur-PK (Urdu), zh-CN (Chinese)
  - Component level translation using HOCs and hooks
- **Alternatives considered**:
  - Manual language files per component (rejected: too verbose)
  - Third-party translation service integration (rejected: cost and complexity)

## Additional Research Findings

### Docusaurus Theming for AI Robotics Look and Feel

- **Color Palette**:
  - Primary: #2563EB (indigo-blue for tech feel)
  - Secondary: #7C3AED (purple for AI element)
  - Accent: #0F172A (dark gray for contrast)
  - Dark Mode: #0F172A background, #CBD5E1 text
  - Light Mode: #FFFFFF background, #0F172A text
- **Typography**: 
  - Headers: Inter Bold
  - Body: Inter Regular
  - Code: JetBrains Mono
- **UI Elements**:
  - Rounded corners: radius-lg (0.5rem) for modern feel
  - Shadows: subtle shadows for depth without overwhelming
  - Animations: 0.2s transitions for interactions

### Dynamic Navigation Behavior

- **Implementation**: Use window scroll event listeners with debounce
- **Behavior**: 
  - Show navbar when scrolling up
  - Hide navbar when scrolling down past a threshold
  - Apply "glass card" effect using backdrop-filter
- **Performance**: Throttle scroll events to ~60fps for smooth performance without lag

### Reusable Component Best Practices

- **Button Component**:
  - Variants: primary, secondary, outline, ghost
  - Sizes: sm, md, lg
  - States: default, hover, active, disabled, loading
- **Form Components**:
  - Validation: Built-in validation with error messaging
  - Accessibility: Proper labels, ARIA attributes, keyboard navigation
- **Card Component**:
  - Flexible: Accept children for custom content
  - Variants: standard, featured, interactive

### Performance Optimization Strategies

- **Image Optimization**: Use modern formats (WebP) with fallbacks, implement lazy loading
- **Code Splitting**: Leverage Docusaurus' built-in code splitting, implement route-based splitting
- **Bundle Size**: Optimize imports, remove unused dependencies, implement tree shaking
- **Caching**: Implement browser caching for static assets, leverage CDN for images

## Technical Decisions Summary

All previously identified unknowns have been resolved:

- ✅ **Image Dimensions**: Standardized sizes defined
- ✅ **RAG Integration**: REST API approach selected
- ✅ **Content Structure**: Docusaurus docs structure with metadata
- ✅ **Translation**: i18next with localized content files

## Recommendations for Next Steps

1. **Begin with component library development**: Create the foundational reusable components
2. **Implement core layout system**: Establish the main layout with header, footer, and navigation
3. **Create content scaffolding**: Set up the 10 modules with 6 chapters each
4. **Develop theme system**: Implement the dark/light mode toggle and theme persistence
5. **Integrate chatbot UI**: Build the chatbot interface with mock API calls initially
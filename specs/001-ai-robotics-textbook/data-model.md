# Data Model: Physical AI Humanoid Robotics Textbook Frontend

**Model Date**: 2025-12-12  
**Feature**: 001-ai-robotics-textbook

## Entity Definitions

### 1. User

**Description**: Represents a person using the platform, including credentials and preferences for theme and language

**Fields**:
- id: string (unique identifier)
- email: string (email address)
- password: string (hashed password)
- firstName: string (optional)
- lastName: string (optional)
- themePreference: 'light' | 'dark' (default: 'light')
- languagePreference: 'en-US' | 'ur-PK' | 'zh-CN' (default: 'en-US')
- createdAt: Date
- updatedAt: Date
- isLoggedIn: boolean (computed property)

**Validation Rules**:
- email: must be a valid email format
- password: minimum 8 characters with at least 1 uppercase, 1 lowercase, 1 number
- themePreference: must be one of allowed values
- languagePreference: must be one of allowed values

**Relationships**:
- 1 User : N Preferences (theme, language)
- 1 User : N Sessions

### 2. Module

**Description**: Represents a major section of the textbook, containing multiple chapters

**Fields**:
- id: string (unique identifier, e.g., "module-1")
- title: string (module title)
- description: string (brief description)
- order: number (position in the sequence)
- chapters: Chapter[] (array of chapters in the module)
- icon: string (icon class or path for display)
- isActive: boolean (whether module is currently selected)

**Validation Rules**:
- title: required, 3-100 characters
- order: positive integer
- chapters: minimum 1 chapter per module
- icon: required

### 3. Chapter

**Description**: Represents a subsection of a module, containing lesson content and a summary

**Fields**:
- id: string (unique identifier, e.g., "module-1-chapter-1")
- moduleId: string (reference to parent module)
- title: string (chapter title)
- order: number (position in module)
- lessonContent: string (main lesson content in MDX format)
- summaryContent: string (condensed version of lesson)
- imageUrl: string (optional, path to chapter image)
- duration: number (estimated reading time in minutes)
- isActive: boolean (whether chapter is currently selected)
- isCompleted: boolean (whether user has completed this chapter)

**Validation Rules**:
- title: required, 3-100 characters
- order: positive integer
- lessonContent: required
- summaryContent: required
- duration: positive number, max 300 minutes

### 4. Lesson

**Description**: The full educational content of a chapter, including text and images

**Fields**:
- id: string (unique identifier)
- chapterId: string (reference to parent chapter)
- content: string (full lesson content in MDX format)
- images: string[] (array of image paths referenced in the lesson)
- lastUpdated: Date
- readTime: number (estimated reading time in minutes)

**Validation Rules**:
- content: required, minimum 100 characters
- images: all paths must be valid
- readTime: positive number, max 300 minutes

### 5. Summary

**Description**: Condensed version of the lesson content for quick review

**Fields**:
- id: string (unique identifier)
- chapterId: string (reference to parent chapter)
- content: string (summary content in MDX format)
- keyPoints: string[] (important points extracted from lesson)
- estimatedReadTime: number (time to read summary in minutes)

**Validation Rules**:
- content: required, maximum 500 characters
- keyPoints: minimum 3, maximum 10 points
- estimatedReadTime: positive number, max 10 minutes

### 6. SubscriptionTier

**Description**: Defines the access levels and features available at different pricing levels

**Fields**:
- id: string (unique identifier, e.g., "free-tier")
- name: string ("Free" | "Standard" | "Premium")
- price: number (monthly price in USD)
- features: string[] (list of features included)
- isPopular: boolean (whether this tier is promoted)

**Validation Rules**:
- name: required, one of allowed values
- price: non-negative number
- features: minimum 1 item
- isPopular: only one tier can be popular at a time

### 7. Testimonial

**Description**: User feedback and ratings about books/chapters on the platform

**Fields**:
- id: string (unique identifier)
- userId: string (reference to user who provided testimonial)
- bookId: string (reference to book)
- rating: number (1-5 star rating)
- comment: string (testimonial text)
- isVerified: boolean (whether user has verified purchase)
- createdAt: Date

**Validation Rules**:
- userId: required
- rating: integer between 1 and 5
- comment: required, 10-500 characters
- isVerified: boolean

### 8. ThemeSettings

**Description**: Global settings for the UI theme

**Fields**:
- id: string (unique identifier)
- primaryColor: string (hex code)
- secondaryColor: string (hex code)
- backgroundColor: string (hex code)
- textColor: string (hex code)
- borderRadius: string (CSS border-radius value)
- fontFamily: string (font family name)

**Validation Rules**:
- All color values: valid hex format
- borderRadius: valid CSS value
- fontFamily: available font

## State Management Models

### 9. ApplicationState

**Description**: Top-level application state managed by React Context

**Fields**:
- currentUser: User (null if not logged in)
- currentTheme: 'light' | 'dark'
- currentLanguage: 'en-US' | 'ur-PK' | 'zh-CN'
- currentModule: Module
- currentChapter: Chapter
- chatbotOpen: boolean
- chatbotMessages: ChatMessage[]
- preferencesLoaded: boolean (whether user prefs loaded from storage)

### 10. ChatMessage

**Description**: Individual message in the chatbot conversation

**Fields**:
- id: string (unique identifier)
- role: 'user' | 'assistant' (sender type)
- content: string (message text)
- timestamp: Date
- sources?: string[] (optional sources from RAG system)

**Validation Rules**:
- role: required, one of allowed values
- content: required, 1-2000 characters
- timestamp: required
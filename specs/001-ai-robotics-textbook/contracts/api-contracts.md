# API Contracts: Physical AI Humanoid Robotics Textbook Frontend

**Contract Date**: 2025-12-12  
**Feature**: 001-ai-robotics-textbook

## External API Contracts (Frontend)

### 1. RAG Chatbot Service

#### POST /api/v1/chat/query
**Description**: Send user query to RAG system and retrieve response based on educational content

**Request**:
```
{
  "query": "string (user's question)",
  "context": "string (relevant context, optional)",
  "sessionId": "string (chat session identifier)"
}
```

**Response (Success)**:
```
{
  "id": "string (message ID)",
  "response": "string (chatbot's answer)",
  "sources": "string[] (list of content sources used)",
  "timestamp": "Date (when response was generated)",
  "sessionId": "string (session ID)"
}
```

**Response (Error)**:
```
{
  "error": "string (error message)",
  "code": "number (HTTP status code)"
}
```

**Headers**:
- Authorization: Bearer {token} (for authenticated users)
- Content-Type: application/json

**Rate Limits**: 60 requests per minute per IP/session

### 2. User Preferences Service

#### GET /api/v1/user/preferences
**Description**: Retrieve user's saved preferences (theme, language, etc.)

**Request**: No body required

**Response**:
```
{
  "theme": "'light' | 'dark'",
  "language": "'en-US' | 'ur-PK' | 'zh-CN'",
  "lastAccessedModule": "string (ID of last accessed module)",
  "lastAccessedChapter": "string (ID of last accessed chapter)",
  "completedChapters": "string[] (list of completed chapter IDs)"
}
```

**Headers**:
- Authorization: Bearer {token}

#### PUT /api/v1/user/preferences
**Description**: Update user's preferences

**Request**:
```
{
  "theme": "'light' | 'dark'",
  "language": "'en-US' | 'ur-PK' | 'zh-CN'",
  "lastAccessedModule": "string",
  "lastAccessedChapter": "string"
}
```

**Response**:
```
{
  "success": "boolean",
  "updatedPreferences": "{same as GET response}"
}
```

### 3. Content Management Service

#### GET /api/v1/content/modules
**Description**: Retrieve list of all modules with basic information

**Request**: No body required

**Response**:
```
{
  "modules": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "order": "number",
      "icon": "string",
      "chaptersCount": "number"
    }
  ]
}
```

#### GET /api/v1/content/modules/{moduleId}/chapters
**Description**: Retrieve list of chapters in a specific module

**Request**: No body required

**Response**:
```
{
  "moduleId": "string",
  "chapters": [
    {
      "id": "string",
      "title": "string",
      "order": "number",
      "duration": "number (minutes)",
      "imageUrl": "string (optional)"
    }
  ]
}
```

#### GET /api/v1/content/chapters/{chapterId}
**Description**: Retrieve specific chapter content with both lesson and summary tabs

**Request**: No body required

**Response**:
```
{
  "id": "string",
  "moduleId": "string",
  "title": "string",
  "lessonContent": "string (MDX format)",
  "summaryContent": "string (MDX format)",
  "duration": "number (minutes)",
  "images": "string[] (list of image URLs)",
  "previousChapterId": "string (optional)",
  "nextChapterId": "string (optional)"
}
```

### 4. Authentication Service

#### POST /api/v1/auth/register
**Description**: Register a new user account

**Request**:
```
{
  "email": "string (valid email)",
  "password": "string (min 8 chars, 1 upper, 1 lower, 1 number)",
  "firstName": "string (optional)",
  "lastName": "string (optional)"
}
```

**Response (Success)**:
```
{
  "success": "boolean",
  "userId": "string",
  "token": "string (JWT token)",
  "user": {
    "id": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "themePreference": "'light' | 'dark'",
    "languagePreference": "'en-US' | 'ur-PK' | 'zh-CN'"
  }
}
```

#### POST /api/v1/auth/login
**Description**: Authenticate user and return token

**Request**:
```
{
  "email": "string",
  "password": "string"
}
```

**Response**:
```
{
  "success": "boolean",
  "token": "string (JWT token)",
  "user": "{user object as in register}"
}
```

## Internal Component APIs

### 1. ThemeContext API

**Provider**:
```
<ThemeProvider>
  {children}
</ThemeProvider>
```

**Consumer**:
```javascript
const {
  theme,
  toggleTheme,
  isDarkMode
} = useTheme();
```

**Methods**:
- `toggleTheme()`: Switch between light and dark mode
- `setTheme(theme: 'light' | 'dark')`: Set specific theme

### 2. LanguageContext API

**Provider**:
```
<LanguageProvider>
  {children}
</LanguageProvider>
```

**Consumer**:
```javascript
const {
  language,
  changeLanguage
} = useLanguage();
```

**Methods**:
- `changeLanguage(lang: 'en-US' | 'ur-PK' | 'zh-CN')`: Change application language
- `t(key: string)`: Translate key to current language

### 3. NavigationContext API

**Provider**:
```
<NavigationProvider>
  {children}
</NavigationProvider>
```

**Consumer**:
```javascript
const {
  currentModule,
  currentChapter,
  setCurrentModule,
  setCurrentChapter,
  breadcrumbs
} = useNavigation();
```

### 4. ChatbotService API

**Methods**:
```javascript
// Initialize chat session
initializeSession(userId: string): Promise<SessionId>;

// Send message to chatbot
sendMessage(sessionId: string, message: string): Promise<ChatResponse>;

// Get chat history
getHistory(sessionId: string): Promise<ChatMessage[]>;

// Clear current session
clearSession(sessionId: string): void;
```

### 5. ContentService API

**Methods**:
```javascript
// Get all modules
getModules(): Promise<Module[]>;

// Get chapters in module
getChapters(moduleId: string): Promise<Chapter[]>;

// Get specific chapter content
getChapter(chapterId: string): Promise<ChapterContent>;

// Update chapter progress
updateProgress(userId: string, chapterId: string, isCompleted: boolean): Promise<boolean>;
```

## Error Handling

### HTTP Status Codes
- 200: Success
- 201: Created
- 400: Bad Request (validation failed)
- 401: Unauthorized (missing or invalid token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

### Error Response Format
```
{
  "error": {
    "message": "string (human-readable error message)",
    "code": "string (error code)",
    "details": "object (specific error details if applicable)"
  }
}
```

## Rate Limiting

- Unauthenticated users: 100 requests per hour
- Authenticated users: 1000 requests per hour
- Content retrieval endpoints: 500 requests per hour
- Chatbot endpoints: 60 requests per minute per user
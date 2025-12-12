# Quickstart Guide: Physical AI Humanoid Robotics Textbook Frontend

**Guide Version**: 1.0  
**Last Updated**: 2025-12-12

## Overview

This guide will help you set up and run the Physical AI Humanoid Robotics Textbook frontend locally. The application is built with Docusaurus using TypeScript and requires Node.js for development.

## Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js**: v18.0 or higher
- **npm**: v8.0 or higher (usually comes with Node.js)
- **Git**: Latest version
- **Text Editor**: VS Code recommended with TypeScript support

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/physical-ai-humanoid-robotics-book-application.git
cd physical-ai-humanoid-robotics-book-application
```

### 2. Install Dependencies

```bash
npm install
```

This will install all necessary dependencies for the Docusaurus application, including:

- Docusaurus core packages
- TypeScript
- Tailwind CSS
- React and ReactDOM
- Custom components and utilities

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your local configuration:

```
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_CHATBOT_API_URL=http://localhost:3002/chat

# Feature Flags
REACT_APP_ENABLE_TRANSLATION=true
REACT_APP_ENABLE_CHATBOT=true

# Analytics (optional)
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Running the Application

### Development Mode

To start the development server:

```bash
npm start
```

This will:

- Start the Docusaurus development server
- Open the application at `http://localhost:3000`
- Watch for file changes and hot-reload automatically

### Production Build

To build the application for production:

```bash
npm run build
```

This creates an optimized build in the `build/` directory.

### Serve Production Build Locally

To serve the production build locally for testing:

```bash
npm run serve
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
physical-ai-humanoid-robotics-book-application/
├── blog/                 # Blog posts (if applicable)
├── docs/                 # Educational content (modules/chapters)
│   ├── modules/
│   │   ├── module-1/
│   │   │   ├── chapter-1.mdx
│   │   │   ├── chapter-2.mdx
│   │   │   └── ...
│   │   ├── module-2/
│   │   └── ...
│   └── ...
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Form/
│   │   ├── Toggle/
│   │   └── ...
│   ├── pages/            # Custom pages
│   ├── theme/            # Docusaurus theme customization
│   └── utils/            # Utility functions
├── static/               # Static assets (images, icons)
├── docusaurus.config.js  # Main Docusaurus configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── babel.config.js       # Babel configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies and scripts
```

## Key Features Setup

### 1. Reusable Components

The application includes several reusable components located in `src/components/`:

- **Buttons**: Primary, secondary, outline, ghost variations
- **Forms**: Input, textarea, select with validation
- **Cards**: For displaying content modules and features
- **Toggles/Switches**: For theme and language selection
- **Navigation**: Capsule-like navbar with scroll behavior

To use a component:

```jsx
import Button from '@site/src/components/Button';

<Button variant="primary" size="lg">
  Click Me
</Button>
```

### 2. Theme System

The application supports light and dark themes:

- Themes are managed via React Context (`src/context/ThemeContext`)
- Themes persist in localStorage
- Use the `useTheme()` hook to access theme functions

```jsx
import { useTheme } from '../context/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

### 3. Internationalization (i18n)

The application supports English, Urdu, and Chinese:

- Translation handled via i18next
- Language preferences persist in localStorage
- Use the `useLanguage()` hook to access language functions

```jsx
import { useLanguage } from '../context/LanguageContext';

function MyComponent() {
  const { language, changeLanguage, t } = useLanguage();
  
  return (
    <div>
      <span>{t('welcome_message')}</span>
      <button onClick={() => changeLanguage('ur-PK')}>
        Switch to Urdu
      </button>
    </div>
  );
}
```

### 4. Navigation System

The navigation system features a dynamic navbar that:

- Shows with glass effect when scrolling up
- Hides when scrolling down past a threshold
- Maintains position during scrolling

The navigation is managed via the `useNavigation()` hook:

```jsx
import { useNavigation } from '../context/NavigationContext';

function MyComponent() {
  const { currentModule, currentChapter } = useNavigation();
  
  return (
    <div>
      <h1>{currentModule.title}</h1>
      <p>{currentChapter.title}</p>
    </div>
  );
}
```

### 5. Content Structure

Educational content is organized in:

- **Modules**: Major sections of the textbook (10 total)
- **Chapters**: Subsections within each module (6 per module)
- **Tabs**: Each chapter has a lesson tab and a summary tab

Content files are located in `docs/modules/{module-number}/{chapter-number}.mdx` with the following frontmatter:

```
---
id: chapter-1
title: "Chapter Title"
module: "Module Title"
lessonTab: true
summaryTab: true
---
```

## Running Tests

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

Run tests with coverage:

```bash
npm test -- --coverage
```

## Building for Production

To create a production build:

```bash
npm run build
```

The build will be optimized and placed in the `build/` directory. You can serve this directory using any static hosting service.

## Deployment

### Deploying to Vercel

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

For other platforms, you need to serve the contents of the `build/` directory using any static hosting service.

## Troubleshooting

### Common Issues

**Issue**: Styles not loading properly  
**Solution**: Ensure Tailwind CSS is properly configured and run `npm run build` again

**Issue**: Images not showing  
**Solution**: Place images in the `static/img/` directory and reference them using `/img/image-name.jpg`

**Issue**: Page not updating after code changes  
**Solution**: Refresh the page; if using npm start, changes should reflect automatically

**Issue**: Cannot access API endpoints  
**Solution**: Verify your `.env` file contains the correct API base URL

### Getting Help

- Check the full documentation in the `docs/` directory
- Look at existing components in `src/components/` for examples
- Contact the development team if issues persist
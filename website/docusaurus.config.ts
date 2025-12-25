import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Physical AI Humanoid Robotics Textbook',
  tagline: 'Learn about embodied artificial intelligence and humanoid robotics',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ur', 'zh'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          // Set up the main docs instance to serve as a placeholder
          // The actual landing page is served via React at /src/pages/index.tsx
          path: 'docs/placeholder',
          routeBasePath: 'placeholder', // Don't use '/' to avoid conflicts with book routes
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce docs best practices
          sidebarCollapsed: false,
          showLastUpdateTime: true,
          // Options for the MDX structure
          admonitions: {
            keywords: ['caution', 'note', 'tip', 'danger', 'info'],
          },
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // Add multiple instances of the docs plugin for each book with its own sidebar
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'physical-ai-humanoid-robotics',
        path: 'docs/books/physical-ai-humanoid-robotics-book',
        routeBasePath: 'books/physical-ai-humanoid-robotics-book',
        sidebarPath: './src/sidebars/physical-ai-humanoid-robotics-sidebar.ts',
        editUrl:
          'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        sidebarCollapsed: false,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'ethics-in-ai-robotics',
        path: 'docs/books/ethics-in-ai-robotics',
        routeBasePath: 'books/ethics-in-ai-robotics',
        sidebarPath: './src/sidebars/ethics-in-ai-robotics-sidebar.ts',
        editUrl:
          'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        sidebarCollapsed: false,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'human-robot-interaction',
        path: 'docs/books/human-robot-interaction',
        routeBasePath: 'books/human-robot-interaction',
        sidebarPath: './src/sidebars/human-robot-interaction-sidebar.ts',
        editUrl:
          'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        sidebarCollapsed: false,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'humanoid-design-principles',
        path: 'docs/books/humanoid-design-principles',
        routeBasePath: 'books/humanoid-design-principles',
        sidebarPath: './src/sidebars/humanoid-design-principles-sidebar.ts',
        editUrl:
          'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        sidebarCollapsed: false,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'locomotion-and-mobility',
        path: 'docs/books/locomotion-and-mobility',
        routeBasePath: 'books/locomotion-and-mobility',
        sidebarPath: './src/sidebars/locomotion-and-mobility-sidebar.ts',
        editUrl:
          'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        sidebarCollapsed: false,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'manipulation-and-grasping',
        path: 'docs/books/manipulation-and-grasping',
        routeBasePath: 'books/manipulation-and-grasping',
        sidebarPath: './src/sidebars/manipulation-and-grasping-sidebar.ts',
        editUrl:
          'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        sidebarCollapsed: false,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'neural-networks-in-motion',
        path: 'docs/books/neural-networks-in-motion',
        routeBasePath: 'books/neural-networks-in-motion',
        sidebarPath: './src/sidebars/neural-networks-in-motion-sidebar.ts',
        editUrl:
          'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        sidebarCollapsed: false,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'physical-computing-for-robotics',
        path: 'docs/books/physical-computing-for-robotics',
        routeBasePath: 'books/physical-computing-for-robotics',
        sidebarPath: './src/sidebars/physical-computing-for-robotics-sidebar.ts',
        editUrl:
          'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        sidebarCollapsed: false,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'robotics-simulation-environments',
        path: 'docs/books/robotics-simulation-environments',
        routeBasePath: 'books/robotics-simulation-environments',
        sidebarPath: './src/sidebars/robotics-simulation-environments-sidebar.ts',
        editUrl:
          'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        sidebarCollapsed: false,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'computer-vision-in-robotics',
        path: 'docs/books/computer-vision-in-robotics',
        routeBasePath: 'books/computer-vision-in-robotics',
        sidebarPath: './src/sidebars/computer-vision-in-robotics-sidebar.ts',
        editUrl:
          'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        sidebarCollapsed: false,
        showLastUpdateTime: true,
      },
    ],
    './src/plugins/tailwind-config.js',
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      // Disable the default Docusaurus navbar since we're using a custom header
      style: 'primary',
      hideOnScroll: true,
    },
    footer: {
      // Disable the default Docusaurus footer since we're using a custom footer in MainLayout and theme Footer
      style: 'dark',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

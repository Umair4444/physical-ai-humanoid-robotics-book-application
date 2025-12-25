import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Sidebar for the Humanoid Design Principles Textbook
 */
const sidebars: SidebarsConfig = {
  humanoidDesignPrinciplesSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '📘 Humanoid Design Principles Textbook',
      className: 'sidebar-title-intro',
    },
    {
      type: 'category',
      label: 'Module 1: Foundations',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Humanoid Design Principles' },
        { type: 'doc', id: 'modules/module-1/chapter-2', label: 'Chapter 2: Historical Development of Humanoid Robots' },
        { type: 'doc', id: 'modules/module-1/chapter-3', label: 'Chapter 3: Biomechanical Principles for Humanoid Design' },
        { type: 'doc', id: 'modules/module-1/chapter-4', label: 'Chapter 4: Anthropometric Considerations' },
        { type: 'doc', id: 'modules/module-1/chapter-5', label: 'Chapter 5: Degrees of Freedom and Mobility Requirements' },
        { type: 'doc', id: 'modules/module-1/chapter-6', label: 'Chapter 6: Design Methodologies and Approaches' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Biomechanics and Kinematics',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-2/chapter-7', label: 'Chapter 7: Introduction to Human Biomechanics for Robot Design' },
        { type: 'doc', id: 'modules/module-2/chapter-8', label: 'Chapter 8: Kinematic Analysis of Humanoid Robots' },
        { type: 'doc', id: 'modules/module-2/chapter-9', label: 'Chapter 9: Joint Design and Degrees of Freedom in Humanoid Robots' },
        { type: 'doc', id: 'modules/module-2/chapter-10', label: 'Chapter 10: Inverse Kinematics for Humanoid Motion Planning' },
        { type: 'doc', id: 'modules/module-2/chapter-11', label: 'Chapter 11: Dynamic Modeling and Control of Humanoid Robots' },
        { type: 'doc', id: 'modules/module-2/chapter-12', label: 'Chapter 12: Biomechanical Analysis of Human Movement for Robot Design' },
      ],
    },
  ],
};

export default sidebars;
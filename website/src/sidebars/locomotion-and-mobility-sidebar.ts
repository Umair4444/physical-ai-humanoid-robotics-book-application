import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Sidebar for the Locomotion and Mobility in Robotics Textbook
 */
const sidebars: SidebarsConfig = {
  locomotionAndMobilitySidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '📘 Locomotion and Mobility in Robotics Textbook',
      className: 'sidebar-title-intro',
    },
    {
      type: 'category',
      label: 'Module 1: Foundations',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Locomotion and Mobility' },
        { type: 'doc', id: 'modules/module-1/chapter-2', label: 'Chapter 2: Principles of Biological Locomotion' },
        { type: 'doc', id: 'modules/module-1/chapter-3', label: 'Chapter 3: Types of Locomotion Systems' },
        { type: 'doc', id: 'modules/module-1/chapter-4', label: 'Chapter 4: Kinematic and Dynamic Models for Locomotion' },
        { type: 'doc', id: 'modules/module-1/chapter-5', label: 'Chapter 5: Stability and Balance in Locomotion' },
        { type: 'doc', id: 'modules/module-1/chapter-6', label: 'Chapter 6: Energy Efficiency in Locomotion' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Legged Locomotion and Bipedal Walking',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-2/chapter-7', label: 'Chapter 7: Introduction to Legged Locomotion' },
        { type: 'doc', id: 'modules/module-2/chapter-8', label: 'Chapter 8: Bipedal Walking Fundamentals and Gait Analysis' },
        { type: 'doc', id: 'modules/module-2/chapter-9', label: 'Chapter 9: Balance Control and Stability in Bipedal Robots' },
        { type: 'doc', id: 'modules/module-2/chapter-10', label: 'Chapter 10: Dynamic Walking and Gait Generation' },
        { type: 'doc', id: 'modules/module-2/chapter-11', label: 'Chapter 11: Terrain Adaptation and Footstep Planning' },
        { type: 'doc', id: 'modules/module-2/chapter-12', label: 'Chapter 12: Human-Inspired Locomotion and Biomimetic Approaches' },
      ],
    },
  ],
};

export default sidebars;
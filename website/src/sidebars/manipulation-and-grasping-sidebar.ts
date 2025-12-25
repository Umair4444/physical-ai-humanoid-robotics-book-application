import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Sidebar for the Manipulation and Grasping in Robotics Textbook
 */
const sidebars: SidebarsConfig = {
  manipulationAndGraspingSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '📘 Manipulation and Grasping in Robotics Textbook',
      className: 'sidebar-title-intro',
    },
    {
      type: 'category',
      label: 'Module 1: Foundations',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Manipulation and Grasping' },
        { type: 'doc', id: 'modules/module-1/chapter-2', label: 'Chapter 2: Historical Development of Robotic Manipulation' },
        { type: 'doc', id: 'modules/module-1/chapter-3', label: 'Chapter 3: Biomechanics of Human Grasping' },
        { type: 'doc', id: 'modules/module-1/chapter-4', label: 'Chapter 4: Types of Grasps and Manipulation Strategies' },
        { type: 'doc', id: 'modules/module-1/chapter-5', label: 'Chapter 5: Kinematic and Dynamic Models for Manipulation' },
        { type: 'doc', id: 'modules/module-1/chapter-6', label: 'Chapter 6: Sensor Integration in Manipulation' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Grasp Analysis and Planning',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-2/chapter-7', label: 'Chapter 7: Introduction to Grasp Analysis and Planning' },
        { type: 'doc', id: 'modules/module-2/chapter-8', label: 'Chapter 8: Grasp Synthesis and Optimization' },
        { type: 'doc', id: 'modules/module-2/chapter-9', label: 'Chapter 9: Contact Mechanics and Friction Modeling' },
        { type: 'doc', id: 'modules/module-2/chapter-10', label: 'Chapter 10: Grasp Stability and Robustness Analysis' },
        { type: 'doc', id: 'modules/module-2/chapter-11', label: 'Chapter 11: Sensor-Based Grasp Planning and Feedback Control' },
        { type: 'doc', id: 'modules/module-2/chapter-12', label: 'Chapter 12: Advanced Grasp Planning Techniques' },
      ],
    },
  ],
};

export default sidebars;
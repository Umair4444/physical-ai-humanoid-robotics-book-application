import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Sidebar for the Robotics Simulation Environments Textbook
 */
const sidebars: SidebarsConfig = {
  roboticsSimulationEnvironmentsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '📘 Robotics Simulation Environments Textbook',
      className: 'sidebar-title-intro',
    },
    {
      type: 'category',
      label: 'Module 1: Foundations',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Robotics Simulation Environments' },
        { type: 'doc', id: 'modules/module-1/chapter-2', label: 'Chapter 2: Physics Simulation Fundamentals' },
        { type: 'doc', id: 'modules/module-1/chapter-3', label: 'Chapter 3: Robot Modeling and Representation' },
        { type: 'doc', id: 'modules/module-1/chapter-4', label: 'Chapter 4: Environment Modeling and Scene Generation' },
        { type: 'doc', id: 'modules/module-1/chapter-5', label: 'Chapter 5: Sensor Simulation and Perception' },
        { type: 'doc', id: 'modules/module-1/chapter-6', label: 'Chapter 6: Control and AI Integration' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Physics Simulation and Dynamics',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-2/chapter-7', label: 'Chapter 7: Introduction to Physics Simulation in Robotics' },
        { type: 'doc', id: 'modules/module-2/chapter-8', label: 'Chapter 8: Rigid Body Dynamics and Motion Simulation' },
        { type: 'doc', id: 'modules/module-2/chapter-9', label: 'Chapter 9: Soft Body and Deformable Object Simulation' },
        { type: 'doc', id: 'modules/module-2/chapter-10', label: 'Chapter 10: Constraint Solving and Joint Simulation' },
        { type: 'doc', id: 'modules/module-2/chapter-11', label: 'Chapter 11: Collision Detection and Contact Modeling' },
        { type: 'doc', id: 'modules/module-2/chapter-12', label: 'Chapter 12: Real-time Physics Simulation and Performance Optimization' },
      ],
    },
  ],
};

export default sidebars;
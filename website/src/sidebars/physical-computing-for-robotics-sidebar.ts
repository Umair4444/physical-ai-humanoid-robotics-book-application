import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Sidebar for the Physical Computing for Robotics Textbook
 */
const sidebars: SidebarsConfig = {
  physicalComputingForRoboticsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '📘 Physical Computing for Robotics Textbook',
      className: 'sidebar-title-intro',
    },
    {
      type: 'category',
      label: 'Module 1: Foundations',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Physical Computing for Robotics' },
        { type: 'doc', id: 'modules/module-1/chapter-2', label: 'Chapter 2: Electronics Fundamentals for Robotics' },
        { type: 'doc', id: 'modules/module-1/chapter-3', label: 'Chapter 3: Microcontrollers and Processing Units' },
        { type: 'doc', id: 'modules/module-1/chapter-4', label: 'Chapter 4: Digital and Analog I/O Systems' },
        { type: 'doc', id: 'modules/module-1/chapter-5', label: 'Chapter 5: Communication Protocols and Interfaces' },
        { type: 'doc', id: 'modules/module-1/chapter-6', label: 'Chapter 6: Real-Time Programming Concepts' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Sensors and Sensing Technologies',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-2/chapter-7', label: 'Chapter 7: Introduction to Sensors and Sensing Technologies' },
        { type: 'doc', id: 'modules/module-2/chapter-8', label: 'Chapter 8: Inertial Measurement Units and Motion Sensors' },
        { type: 'doc', id: 'modules/module-2/chapter-9', label: 'Chapter 9: Vision Sensors and Camera Systems' },
        { type: 'doc', id: 'modules/module-2/chapter-10', label: 'Chapter 10: Force, Torque, and Tactile Sensors' },
        { type: 'doc', id: 'modules/module-2/chapter-11', label: 'Chapter 11: Range and Distance Sensors' },
        { type: 'doc', id: 'modules/module-2/chapter-12', label: 'Chapter 12: Sensor Fusion and Data Integration' },
      ],
    },
  ],
};

export default sidebars;
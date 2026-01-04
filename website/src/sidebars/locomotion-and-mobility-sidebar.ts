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
      label: 'Module 1: Foundations of Robotic Locomotion',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Locomotion and Mobility in Robotics' },
        { type: 'doc', id: 'modules/module-1/chapter-2', label: 'Chapter 2: Biomechanics and Biomimicry in Locomotion' },
        { type: 'doc', id: 'modules/module-1/chapter-3', label: 'Chapter 3: Kinematics and Dynamics of Locomotion Systems' },
        { type: 'doc', id: 'modules/module-1/chapter-4', label: 'Chapter 4: Stability and Balance in Robotic Locomotion' },
        { type: 'doc', id: 'modules/module-1/chapter-5', label: 'Chapter 5: Energy Efficiency in Locomotion Systems' },
        { type: 'doc', id: 'modules/module-1/chapter-6', label: 'Chapter 6: Sensing and Perception for Locomotion' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Legged Locomotion and Bipedal Walking',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-2/chapter-7', label: 'Chapter 7: Balance and Stability Control in Legged Systems' },
        { type: 'doc', id: 'modules/module-2/chapter-8', label: 'Chapter 8: Terrain Adaptation and Rough Terrain Navigation' },
        { type: 'doc', id: 'modules/module-2/chapter-9', label: 'Chapter 9: Leg Design and Actuation for Locomotion' },
        { type: 'doc', id: 'modules/module-2/chapter-10', label: 'Chapter 10: Legged Locomotion and Bipedal Walking' },
        { type: 'doc', id: 'modules/module-2/chapter-11', label: 'Chapter 11: Quadrupedal and Multi-legged Locomotion' },
        { type: 'doc', id: 'modules/module-2/chapter-12', label: 'Chapter 12: Gait Analysis and Generation' },
      ],
    },
    {
      type: 'category',
      label: 'Module 3: Wheeled and Tracked Mobility Systems',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-3/chapter-13', label: 'Chapter 13: Wheeled and Tracked Mobility Systems' },
        { type: 'doc', id: 'modules/module-3/chapter-14', label: 'Chapter 14: Differential Drive and Ackermann Steering' },
        { type: 'doc', id: 'modules/module-3/chapter-15', label: 'Chapter 15: Omni-directional and Mecanum Wheel Systems' },
        { type: 'doc', id: 'modules/module-3/chapter-16', label: 'Chapter 16: Tracked Vehicle Dynamics and Control' },
        { type: 'doc', id: 'modules/module-3/chapter-17', label: 'Chapter 17: Terrain Navigation and Path Planning for Wheeled Systems' },
        { type: 'doc', id: 'modules/module-3/chapter-18', label: 'Chapter 18: Energy Efficiency and Power Management in Wheeled Systems' },
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Flying and Aerial Robotics',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-4/chapter-19', label: 'Chapter 19: Flying and Aerial Robotics' },
        { type: 'doc', id: 'modules/module-4/chapter-20', label: 'Chapter 20: Fixed-Wing Aircraft and VTOL Systems' },
        { type: 'doc', id: 'modules/module-4/chapter-21', label: 'Chapter 21: Multirotor Dynamics and Control' },
        { type: 'doc', id: 'modules/module-4/chapter-22', label: 'Chapter 22: Aerial Navigation and Path Planning' },
        { type: 'doc', id: 'modules/module-4/chapter-23', label: 'Chapter 23: Sensing and Perception for Aerial Systems' },
        { type: 'doc', id: 'modules/module-4/chapter-24', label: 'Chapter 24: Energy Management and Flight Endurance' },
      ],
    },
    {
      type: 'category',
      label: 'Module 5: Swimming and Underwater Locomotion',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-5/chapter-25', label: 'Chapter 25: Swimming and Underwater Locomotion' },
        { type: 'doc', id: 'modules/module-5/chapter-26', label: 'Chapter 26: Underwater Vehicle Design and Propulsion' },
        { type: 'doc', id: 'modules/module-5/chapter-27', label: 'Chapter 27: Hydrodynamics and Fluid Mechanics for Swimming Robots' },
        { type: 'doc', id: 'modules/module-5/chapter-28', label: 'Chapter 28: Underwater Navigation and Communication' },
        { type: 'doc', id: 'modules/module-5/chapter-29', label: 'Chapter 29: Sensing and Perception in Aquatic Environments' },
        { type: 'doc', id: 'modules/module-5/chapter-30', label: 'Chapter 30: Energy Management and Buoyancy Control' },
      ],
    },
    {
      type: 'category',
      label: 'Module 6: Hybrid and Multi-modal Locomotion',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-6/chapter-31', label: 'Chapter 31: Human-Robot Interaction and Social Robotics' },
        { type: 'doc', id: 'modules/module-6/chapter-32', label: 'Chapter 32: Social Cognition and Emotional Intelligence in Robots' },
        { type: 'doc', id: 'modules/module-6/chapter-33', label: 'Chapter 33: Gesture Recognition and Body Language in Social Robotics' },
        { type: 'doc', id: 'modules/module-6/chapter-34', label: 'Chapter 34: Trust and Safety in Human-Robot Interaction' },
        { type: 'doc', id: 'modules/module-6/chapter-35', label: 'Chapter 35: Ethical Considerations in Social Robotics' },
        { type: 'doc', id: 'modules/module-6/chapter-36', label: 'Chapter 36: Applications of Social Robotics' },
      ],
    },
    {
      type: 'category',
      label: 'Module 7: Dynamic Balance and Stability Control',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-7/chapter-37', label: 'Chapter 37: Specialized Locomotion Systems' },
        { type: 'doc', id: 'modules/module-7/chapter-38', label: 'Chapter 38: Climbing and Wall-Adhering Robots' },
        { type: 'doc', id: 'modules/module-7/chapter-39', label: 'Chapter 39: Swimming and Aquatic Locomotion Systems' },
        { type: 'doc', id: 'modules/module-7/chapter-40', label: 'Chapter 40: Soft Robotics and Compliant Mechanisms' },
        { type: 'doc', id: 'modules/module-7/chapter-41', label: 'Chapter 41: Novel Propulsion Methods and Bio-inspired Locomotion' },
        { type: 'doc', id: 'modules/module-7/chapter-42', label: 'Chapter 42: Integration and System Design for Specialized Locomotion' },
      ],
    },
    {
      type: 'category',
      label: 'Module 8: Gait Planning and Motion Control',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-8/chapter-43', label: 'Chapter 43: Locomotion in Special Environments' },
        { type: 'doc', id: 'modules/module-8/chapter-44', label: 'Chapter 44: Planetary Exploration and Extraterrestrial Mobility' },
        { type: 'doc', id: 'modules/module-8/chapter-45', label: 'Chapter 45: Underwater and Subsurface Exploration Systems' },
        { type: 'doc', id: 'modules/module-8/chapter-46', label: 'Chapter 46: Swarm Robotics and Collective Locomotion' },
        { type: 'doc', id: 'modules/module-8/chapter-47', label: 'Chapter 47: Adaptive and Reconfigurable Locomotion Systems' },
        { type: 'doc', id: 'modules/module-8/chapter-48', label: 'Chapter 48: Safety and Reliability in Specialized Locomotion' },
      ],
    },
    {
      type: 'category',
      label: 'Module 9: Navigation and Path Planning for Mobility',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-9/chapter-49', label: 'Chapter 49: Locomotion Applications and Case Studies' },
        { type: 'doc', id: 'modules/module-9/chapter-50', label: 'Chapter 50: Commercial and Industrial Applications' },
        { type: 'doc', id: 'modules/module-9/chapter-51', label: 'Chapter 51: Healthcare and Assistive Applications' },
        { type: 'doc', id: 'modules/module-9/chapter-52', label: 'Chapter 52: Search and Rescue Applications' },
        { type: 'doc', id: 'modules/module-9/chapter-53', label: 'Chapter 53: Environmental Monitoring and Exploration' },
        { type: 'doc', id: 'modules/module-9/chapter-54', label: 'Chapter 54: Military and Security Applications' },
      ],
    },
    {
      type: 'category',
      label: 'Module 10: Energy Efficiency and Autonomous Mobility',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-10/chapter-55', label: 'Chapter 55: Energy Efficiency and Autonomous Mobility' },
        { type: 'doc', id: 'modules/module-10/chapter-56', label: 'Chapter 56: Energy Management and Power Systems for Autonomous Mobility' },
        { type: 'doc', id: 'modules/module-10/chapter-57', label: 'Chapter 57: Ethical Considerations in Autonomous Mobility' },
        { type: 'doc', id: 'modules/module-10/chapter-58', label: 'Chapter 58: Human-Robot Collaboration and Teamwork' },
        { type: 'doc', id: 'modules/module-10/chapter-59', label: 'Chapter 59: Future Trends and Emerging Technologies' },
        { type: 'doc', id: 'modules/module-10/chapter-60', label: 'Chapter 60: Integration and System Design for Autonomous Mobility' },
      ],
    },
  ],
};

export default sidebars;
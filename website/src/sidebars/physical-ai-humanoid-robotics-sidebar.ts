import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Sidebar for the Physical AI & Humanoid Robotics Textbook
 */
const sidebars: SidebarsConfig = {
  physicalAIHumanoidRoboticsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '📘 Physical AI & Humanoid Robotics Textbook',
      className: 'sidebar-title-intro',
    },
    {
      type: 'category',
      label: 'Module 1: Foundations',
      collapsible: true,
      collapsed: false,
      items: [
        { type: 'doc', id: 'modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Physical AI' },
        { type: 'doc', id: 'modules/module-1/chapter-2', label: 'Chapter 2: Biomechanics and Biomimicry' },
        { type: 'doc', id: 'modules/module-1/chapter-3', label: 'Chapter 3: Sensorimotor Integration' },
        { type: 'doc', id: 'modules/module-1/chapter-4', label: 'Chapter 4: Actuation Systems' },
        { type: 'doc', id: 'modules/module-1/chapter-5', label: 'Chapter 5: Perception Systems' },
        { type: 'doc', id: 'modules/module-1/chapter-6', label: 'Chapter 6: Cognitive Architectures' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Advanced Control',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-2/chapter-7', label: 'Chapter 7: Advanced Sensorimotor Control' },
        { type: 'doc', id: 'modules/module-2/chapter-8', label: 'Chapter 8: Deep Learning for Motor Skills' },
        { type: 'doc', id: 'modules/module-2/chapter-9', label: 'Chapter 9: Adaptive Control' },
        { type: 'doc', id: 'modules/module-2/chapter-10', label: 'Chapter 10: Locomotion and Balance' },
        { type: 'doc', id: 'modules/module-2/chapter-11', label: 'Chapter 11: Dexterous Manipulation' },
        { type: 'doc', id: 'modules/module-2/chapter-12', label: 'Chapter 12: Social Interaction' },
      ],
    },
    {
      type: 'category',
      label: 'Module 3: Hardware Integration',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-3/chapter-13', label: 'Chapter 13: Hardware Design' },
        { type: 'doc', id: 'modules/module-3/chapter-14', label: 'Chapter 14: Actuator Technologies' },
        { type: 'doc', id: 'modules/module-3/chapter-15', label: 'Chapter 15: Sensing Hardware' },
        { type: 'doc', id: 'modules/module-3/chapter-16', label: 'Chapter 16: Power Systems' },
        { type: 'doc', id: 'modules/module-3/chapter-17', label: 'Chapter 17: Safety Systems' },
        { type: 'doc', id: 'modules/module-3/chapter-18', label: 'Chapter 18: System Architecture' },
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Software Infrastructure',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-4/chapter-19', label: 'Chapter 19: Operating Systems' },
        { type: 'doc', id: 'modules/module-4/chapter-20', label: 'Chapter 20: Development Tools' },
        { type: 'doc', id: 'modules/module-4/chapter-21', label: 'Chapter 21: Robotics Frameworks' },
        { type: 'doc', id: 'modules/module-4/chapter-22', label: 'Chapter 22: Programming Paradigms' },
        { type: 'doc', id: 'modules/module-4/chapter-23', label: 'Chapter 23: Simulation and Testing' },
        { type: 'doc', id: 'modules/module-4/chapter-24', label: 'Chapter 24: Cloud Robotics' },
      ],
    },
    {
      type: 'category',
      label: 'Module 5: Human-Robot Interaction',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-5/chapter-25', label: 'Chapter 25: Interaction Design' },
        { type: 'doc', id: 'modules/module-5/chapter-26', label: 'Chapter 26: Social Cognition' },
        { type: 'doc', id: 'modules/module-5/chapter-27', label: 'Chapter 27: Gesture Recognition' },
        { type: 'doc', id: 'modules/module-5/chapter-28', label: 'Chapter 28: Natural Language Processing' },
        { type: 'doc', id: 'modules/module-5/chapter-29', label: 'Chapter 29: Trust and Safety' },
        { type: 'doc', id: 'modules/module-5/chapter-30', label: 'Chapter 30: Ethics and Implications' },
      ],
    },
    {
      type: 'category',
      label: 'Module 6: Motion Control',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-6/chapter-31', label: 'Chapter 31: Locomotion Algorithms' },
        { type: 'doc', id: 'modules/module-6/chapter-32', label: 'Chapter 32: Balance and Posture' },
        { type: 'doc', id: 'modules/module-6/chapter-33', label: 'Chapter 33: Footstep Planning' },
        { type: 'doc', id: 'modules/module-6/chapter-34', label: 'Chapter 34: Manipulation Control' },
        { type: 'doc', id: 'modules/module-6/chapter-35', label: 'Chapter 35: Whole-Body Motion' },
        { type: 'doc', id: 'modules/module-6/chapter-36', label: 'Chapter 36: Motion Planning' },
      ],
    },
    {
      type: 'category',
      label: 'Module 7: Perception Technologies',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-7/chapter-37', label: 'Chapter 37: Perception Systems' },
        { type: 'doc', id: 'modules/module-7/chapter-38', label: 'Chapter 38: 3D Perception' },
        { type: 'doc', id: 'modules/module-7/chapter-39', label: 'Chapter 39: Tactile Sensing' },
        { type: 'doc', id: 'modules/module-7/chapter-40', label: 'Chapter 40: Sensor Fusion' },
        { type: 'doc', id: 'modules/module-7/chapter-41', label: 'Chapter 41: SLAM for Humanoids' },
        { type: 'doc', id: 'modules/module-7/chapter-42', label: 'Chapter 42: Advanced Sensing' },
      ],
    },
    {
      type: 'category',
      label: 'Module 8: AI and Learning',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-8/chapter-43', label: 'Chapter 43: AI Integration' },
        { type: 'doc', id: 'modules/module-8/chapter-44', label: 'Chapter 44: Neural Networks' },
        { type: 'doc', id: 'modules/module-8/chapter-45', label: 'Chapter 45: Reinforcement Learning' },
        { type: 'doc', id: 'modules/module-8/chapter-46', label: 'Chapter 46: Cognitive Architectures' },
        { type: 'doc', id: 'modules/module-8/chapter-47', label: 'Chapter 47: Learning from Demonstration' },
        { type: 'doc', id: 'modules/module-8/chapter-48', label: 'Chapter 48: Ethical AI' },
      ],
    },
    {
      type: 'category',
      label: 'Module 9: Applications',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-9/chapter-49', label: 'Chapter 49: Applications and Use Cases' },
        { type: 'doc', id: 'modules/module-9/chapter-50', label: 'Chapter 50: Healthcare Applications' },
        { type: 'doc', id: 'modules/module-9/chapter-51', label: 'Chapter 51: Service Applications' },
        { type: 'doc', id: 'modules/module-9/chapter-52', label: 'Chapter 52: Education Applications' },
        { type: 'doc', id: 'modules/module-9/chapter-53', label: 'Chapter 53: Industrial Applications' },
        { type: 'doc', id: 'modules/module-9/chapter-54', label: 'Chapter 54: Entertainment Applications' },
      ],
    },
    {
      type: 'category',
      label: 'Module 10: Future Outlook',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-10/chapter-55', label: 'Chapter 55: Deployment Strategies' },
        { type: 'doc', id: 'modules/module-10/chapter-56', label: 'Chapter 56: Economic Impact' },
        { type: 'doc', id: 'modules/module-10/chapter-57', label: 'Chapter 57: Regulatory Framework' },
        { type: 'doc', id: 'modules/module-10/chapter-58', label: 'Chapter 58: Future Trends' },
        { type: 'doc', id: 'modules/module-10/chapter-59', label: 'Chapter 59: Societal Impact' },
        { type: 'doc', id: 'modules/module-10/chapter-60', label: 'Chapter 60: Conclusion' },
      ],
    },
  ],
};

export default sidebars;
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
      label: 'Module 1: Foundations of Physical AI and Humanoid Robotics',
      collapsible: true,
      collapsed: false,
      items: [
        { type: 'doc', id: 'modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Physical AI and Humanoid Robotics' },
        { type: 'doc', id: 'modules/module-1/chapter-2', label: 'Chapter 2: Embodiment and Sensorimotor Integration' },
        { type: 'doc', id: 'modules/module-1/chapter-3', label: 'Chapter 3: Biomechanics and Biomimetic Design' },
        { type: 'doc', id: 'modules/module-1/chapter-4', label: 'Chapter 4: Control Theory for Physical Systems' },
        { type: 'doc', id: 'modules/module-1/chapter-5', label: 'Chapter 5: Learning in Physical Systems' },
        { type: 'doc', id: 'modules/module-1/chapter-6', label: 'Chapter 6: Hardware-Software Co-design' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Advanced Control and Learning in Physical AI',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-2/chapter-7', label: 'Chapter 7: Adaptive Control for Physical Systems' },
        { type: 'doc', id: 'modules/module-2/chapter-8', label: 'Chapter 8: Reinforcement Learning for Physical Control' },
        { type: 'doc', id: 'modules/module-2/chapter-9', label: 'Chapter 9: Model Predictive Control for Robotics' },
        { type: 'doc', id: 'modules/module-2/chapter-10', label: 'Chapter 10: Imitation Learning and Physical Skills' },
        { type: 'doc', id: 'modules/module-2/chapter-11', label: 'Chapter 11: Multi-Modal Learning in Physical Systems' },
        { type: 'doc', id: 'modules/module-2/chapter-12', label: 'Chapter 12: Transfer Learning Across Physical Platforms' },
      ],
    },
    {
      type: 'category',
      label: 'Module 3: Hardware and System Integration in Humanoid Robotics',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-3/chapter-13', label: 'Chapter 13: Humanoid Robot Design Principles' },
        { type: 'doc', id: 'modules/module-3/chapter-14', label: 'Chapter 14: Actuator Technologies for Humanoid Robots' },
        { type: 'doc', id: 'modules/module-3/chapter-15', label: 'Chapter 15: Sensing Systems for Humanoid Robots' },
        { type: 'doc', id: 'modules/module-3/chapter-16', label: 'Chapter 16: Power and Energy Management' },
        { type: 'doc', id: 'modules/module-3/chapter-17', label: 'Chapter 17: Safety Systems and Human Safety' },
        { type: 'doc', id: 'modules/module-3/chapter-18', label: 'Chapter 18: Mechanical Design and Manufacturing' },
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Software Infrastructure and Development Tools',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-4/chapter-19', label: 'Chapter 19: Robotics Operating Systems' },
        { type: 'doc', id: 'modules/module-4/chapter-20', label: 'Chapter 20: Development Frameworks and Libraries' },
        { type: 'doc', id: 'modules/module-4/chapter-21', label: 'Chapter 21: Simulation Environments' },
        { type: 'doc', id: 'modules/module-4/chapter-22', label: 'Chapter 22: Programming Models for Physical AI' },
        { type: 'doc', id: 'modules/module-4/chapter-23', label: 'Chapter 23: Testing and Validation Frameworks' },
        { type: 'doc', id: 'modules/module-4/chapter-24', label: 'Chapter 24: Cloud and Edge Computing for Robotics' },
      ],
    },
    {
      type: 'category',
      label: 'Module 5: Human-Robot Interaction and Social Robotics',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-5/chapter-25', label: 'Chapter 25: Social Interaction Design' },
        { type: 'doc', id: 'modules/module-5/chapter-26', label: 'Chapter 26: Trust and Acceptance in Human-Robot Interaction' },
        { type: 'doc', id: 'modules/module-5/chapter-27', label: 'Chapter 27: Communication Modalities for Human-Robot Interaction' },
        { type: 'doc', id: 'modules/module-5/chapter-28', label: 'Chapter 28: Ethical Considerations in Human-Robot Interaction' },
        { type: 'doc', id: 'modules/module-5/chapter-29', label: 'Chapter 29: Cultural Adaptation in Social Robotics' },
        { type: 'doc', id: 'modules/module-5/chapter-30', label: 'Chapter 30: Long-term Human-Robot Relationships' },
      ],
    },
    {
      type: 'category',
      label: 'Module 6: Motion Control and Locomotion',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-6/chapter-31', label: 'Chapter 31: Bipedal Locomotion Principles' },
        { type: 'doc', id: 'modules/module-6/chapter-32', label: 'Chapter 32: Balance Control and Stability' },
        { type: 'doc', id: 'modules/module-6/chapter-33', label: 'Chapter 33: Gait Generation and Adaptation' },
        { type: 'doc', id: 'modules/module-6/chapter-34', label: 'Chapter 34: Terrain Adaptation and Navigation' },
        { type: 'doc', id: 'modules/module-6/chapter-35', label: 'Chapter 35: Whole-Body Motion Control' },
        { type: 'doc', id: 'modules/module-6/chapter-36', label: 'Chapter 36: Manipulation and Locomotion Coordination' },
      ],
    },
    {
      type: 'category',
      label: 'Module 7: Perception and Sensing Technologies',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-7/chapter-37', label: 'Chapter 37: Multimodal Perception Systems' },
        { type: 'doc', id: 'modules/module-7/chapter-38', label: 'Chapter 38: 3D Perception and Reconstruction' },
        { type: 'doc', id: 'modules/module-7/chapter-39', label: 'Chapter 39: Tactile and Proprioceptive Sensing' },
        { type: 'doc', id: 'modules/module-7/chapter-40', label: 'Chapter 40: Sensor Fusion for Physical AI' },
        { type: 'doc', id: 'modules/module-7/chapter-41', label: 'Chapter 41: Real-time Perception Systems' },
        { type: 'doc', id: 'modules/module-7/chapter-42', label: 'Chapter 42: Perception for Interaction and Manipulation' },
      ],
    },
    {
      type: 'category',
      label: 'Module 8: AI and Learning Systems',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-8/chapter-43', label: 'Chapter 43: Deep Learning for Physical Systems' },
        { type: 'doc', id: 'modules/module-8/chapter-44', label: 'Chapter 44: Neural-Symbolic Integration' },
        { type: 'doc', id: 'modules/module-8/chapter-45', label: 'Chapter 45: Causal Reasoning in Physical AI' },
        { type: 'doc', id: 'modules/module-8/chapter-46', label: 'Chapter 46: Memory Systems for Physical AI' },
        { type: 'doc', id: 'modules/module-8/chapter-47', label: 'Chapter 47: Planning and Reasoning in Physical Environments' },
        { type: 'doc', id: 'modules/module-8/chapter-48', label: 'Chapter 48: Explainable AI for Physical Systems' },
      ],
    },
    {
      type: 'category',
      label: 'Module 9: Applications and Deployment',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-9/chapter-49', label: 'Chapter 49: Healthcare and Assistive Robotics' },
        { type: 'doc', id: 'modules/module-9/chapter-50', label: 'Chapter 50: Service Robotics Applications' },
        { type: 'doc', id: 'modules/module-9/chapter-51', label: 'Chapter 51: Educational Robotics' },
        { type: 'doc', id: 'modules/module-9/chapter-52', label: 'Chapter 52: Industrial and Manufacturing Applications' },
        { type: 'doc', id: 'modules/module-9/chapter-53', label: 'Chapter 53: Entertainment and Companion Robotics' },
        { type: 'doc', id: 'modules/module-9/chapter-54', label: 'Chapter 54: Research Platforms and Experimental Robotics' },
      ],
    },
    {
      type: 'category',
      label: 'Module 10: Deployment, Economics, and Future Outlook',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-10/chapter-55', label: 'Chapter 55: Deployment Strategies and Challenges' },
        { type: 'doc', id: 'modules/module-10/chapter-56', label: 'Chapter 56: Economic Models and Business Cases' },
        { type: 'doc', id: 'modules/module-10/chapter-57', label: 'Chapter 57: Regulatory and Safety Standards' },
        { type: 'doc', id: 'modules/module-10/chapter-58', label: 'Chapter 58: Societal Impact and Adoption' },
        { type: 'doc', id: 'modules/module-10/chapter-59', label: 'Chapter 59: Future Research Directions' },
        { type: 'doc', id: 'modules/module-10/chapter-60', label: 'Chapter 60: Conclusions and Future Outlook' },
      ],
    },
  ],
};

export default sidebars;
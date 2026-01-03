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
      label: 'Module 1: Foundations of Humanoid Design Principles',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-1/chapter-1', label: 'Chapter 1: Fundamentals of Humanoid Design' },
        { type: 'doc', id: 'modules/module-1/chapter-2', label: 'Chapter 2: Anthropomorphic Design Principles' },
        { type: 'doc', id: 'modules/module-1/chapter-3', label: 'Chapter 3: Biomechanics and Biomimicry in Humanoid Design' },
        { type: 'doc', id: 'modules/module-1/chapter-4', label: 'Chapter 4: Humanoid Kinematics and Dynamics' },
        { type: 'doc', id: 'modules/module-1/chapter-5', label: 'Chapter 5: Humanoid Actuation Systems' },
        { type: 'doc', id: 'modules/module-1/chapter-6', label: 'Chapter 6: Sensory Systems for Humanoid Robots' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Locomotion and Mobility in Humanoid Design',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-2/chapter-7', label: 'Chapter 7: Bipedal Locomotion Principles' },
        { type: 'doc', id: 'modules/module-2/chapter-8', label: 'Chapter 8: Balance Control and Stability' },
        { type: 'doc', id: 'modules/module-2/chapter-9', label: 'Chapter 9: Gait Generation and Adaptation' },
        { type: 'doc', id: 'modules/module-2/chapter-10', label: 'Chapter 10: Terrain Adaptation and Navigation' },
        { type: 'doc', id: 'modules/module-2/chapter-11', label: 'Chapter 11: Whole-Body Motion Control' },
        { type: 'doc', id: 'modules/module-2/chapter-12', label: 'Chapter 12: Manipulation and Locomotion Coordination' },
      ],
    },
    {
      type: 'category',
      label: 'Module 3: Manipulation and Grasping Systems',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-3/chapter-13', label: 'Chapter 13: Humanoid Manipulation Systems' },
        { type: 'doc', id: 'modules/module-3/chapter-14', label: 'Chapter 14: Dexterous Hands and Grasping' },
        { type: 'doc', id: 'modules/module-3/chapter-15', label: 'Chapter 15: Force Control in Manipulation' },
        { type: 'doc', id: 'modules/module-3/chapter-16', label: 'Chapter 16: Bimanual Manipulation' },
        { type: 'doc', id: 'modules/module-3/chapter-17', label: 'Chapter 17: Tool Use and Object Interaction' },
        { type: 'doc', id: 'modules/module-3/chapter-18', label: 'Chapter 18: Manipulation Planning and Control' },
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Sensory Systems and Perception',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-4/chapter-19', label: 'Chapter 19: Multimodal Perception Systems' },
        { type: 'doc', id: 'modules/module-4/chapter-20', label: 'Chapter 20: 3D Perception and Reconstruction' },
        { type: 'doc', id: 'modules/module-4/chapter-21', label: 'Chapter 21: Tactile and Proprioceptive Sensing' },
        { type: 'doc', id: 'modules/module-4/chapter-22', label: 'Chapter 22: Sensor Fusion for Humanoid Robots' },
        { type: 'doc', id: 'modules/module-4/chapter-23', label: 'Chapter 23: Real-time Perception Systems' },
        { type: 'doc', id: 'modules/module-4/chapter-24', label: 'Chapter 24: Perception for Interaction and Manipulation' },
      ],
    },
    {
      type: 'category',
      label: 'Module 5: Control Systems and Architecture',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-5/chapter-25', label: 'Chapter 25: Control Architecture for Humanoid Robots' },
        { type: 'doc', id: 'modules/module-5/chapter-26', label: 'Chapter 26: Real-time Control Systems' },
        { type: 'doc', id: 'modules/module-5/chapter-27', label: 'Chapter 27: Adaptive Control for Humanoid Systems' },
        { type: 'doc', id: 'modules/module-5/chapter-28', label: 'Chapter 28: Model Predictive Control for Humanoids' },
        { type: 'doc', id: 'modules/module-5/chapter-29', label: 'Chapter 29: Learning-based Control Approaches' },
        { type: 'doc', id: 'modules/module-5/chapter-30', label: 'Chapter 30: Hierarchical Control Systems' },
      ],
    },
    {
      type: 'category',
      label: 'Module 6: Human-Robot Interaction Design',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-6/chapter-31', label: 'Chapter 31: Social Interaction Design' },
        { type: 'doc', id: 'modules/module-6/chapter-32', label: 'Chapter 32: Trust and Acceptance in Human-Robot Interaction' },
        { type: 'doc', id: 'modules/module-6/chapter-33', label: 'Chapter 33: Communication Modalities for Human-Robot Interaction' },
        { type: 'doc', id: 'modules/module-6/chapter-34', label: 'Chapter 34: Ethical Considerations in Human-Robot Interaction' },
        { type: 'doc', id: 'modules/module-6/chapter-35', label: 'Chapter 35: Cultural Adaptation in Social Robotics' },
        { type: 'doc', id: 'modules/module-6/chapter-36', label: 'Chapter 36: Long-term Human-Robot Relationships' },
      ],
    },
    {
      type: 'category',
      label: 'Module 7: Materials and Manufacturing',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-7/chapter-37', label: 'Chapter 37: Materials for Humanoid Robotics' },
        { type: 'doc', id: 'modules/module-7/chapter-38', label: 'Chapter 38: Soft Robotics and Compliant Materials' },
        { type: 'doc', id: 'modules/module-7/chapter-39', label: 'Chapter 39: Manufacturing Techniques for Humanoid Robots' },
        { type: 'doc', id: 'modules/module-7/chapter-40', label: 'Chapter 40: Rapid Prototyping and 3D Printing' },
        { type: 'doc', id: 'modules/module-7/chapter-41', label: 'Chapter 41: Assembly and Integration Techniques' },
        { type: 'doc', id: 'modules/module-7/chapter-42', label: 'Chapter 42: Cost-Effective Manufacturing Approaches' },
      ],
    },
    {
      type: 'category',
      label: 'Module 8: Safety and Ethics in Design',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-8/chapter-43', label: 'Chapter 43: Safety Systems and Fail-Safe Mechanisms' },
        { type: 'doc', id: 'modules/module-8/chapter-44', label: 'Chapter 44: Risk Assessment and Mitigation' },
        { type: 'doc', id: 'modules/module-8/chapter-45', label: 'Chapter 45: Ethical Design Principles' },
        { type: 'doc', id: 'modules/module-8/chapter-46', label: 'Chapter 46: Privacy and Data Protection' },
        { type: 'doc', id: 'modules/module-8/chapter-47', label: 'Chapter 47: Human Safety in Humanoid Design' },
        { type: 'doc', id: 'modules/module-8/chapter-48', label: 'Chapter 48: Regulatory Compliance and Standards' },
      ],
    },
    {
      type: 'category',
      label: 'Module 9: Applications and Use Cases',
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
      label: 'Module 10: Future Trends and Innovation',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-10/chapter-55', label: 'Chapter 55: Emerging Technologies in Humanoid Design' },
        { type: 'doc', id: 'modules/module-10/chapter-56', label: 'Chapter 56: Humanoid Robotics and AI Integration' },
        { type: 'doc', id: 'modules/module-10/chapter-57', label: 'Chapter 57: Cognitive Humanoid Robots' },
        { type: 'doc', id: 'modules/module-10/chapter-58', label: 'Chapter 58: Humanoid Swarms and Collective Behavior' },
        { type: 'doc', id: 'modules/module-10/chapter-59', label: 'Chapter 59: Future Research Directions' },
        { type: 'doc', id: 'modules/module-10/chapter-60', label: 'Chapter 60: Societal Impact and Future Outlook' },
      ],
    },
  ],
};

export default sidebars;
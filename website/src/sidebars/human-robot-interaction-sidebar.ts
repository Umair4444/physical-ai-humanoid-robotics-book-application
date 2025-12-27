import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Sidebar for the Human-Robot Interaction Textbook
 */
const sidebars: SidebarsConfig = {
  humanRobotInteractionSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '📘 Human-Robot Interaction Textbook',
      className: 'sidebar-title-intro',
    },
    {
      type: 'category',
      label: 'Module 1: Foundations',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Human-Robot Interaction' },
        { type: 'doc', id: 'modules/module-1/chapter-2', label: 'Chapter 2: Historical Development of HRI' },
        { type: 'doc', id: 'modules/module-1/chapter-3', label: 'Chapter 3: Theoretical Foundations of Social Interaction' },
        { type: 'doc', id: 'modules/module-1/chapter-4', label: 'Chapter 4: Psychological and Cognitive Aspects' },
        { type: 'doc', id: 'modules/module-1/chapter-5', label: 'Chapter 5: Social Psychology Principles in HRI' },
        { type: 'doc', id: 'modules/module-1/chapter-6', label: 'Chapter 6: Research Methods in Human-Robot Interaction' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Social Cues and Communication Modalities',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-2/chapter-7', label: 'Chapter 7: Understanding Social Cues in Human-Robot Interaction' },
        { type: 'doc', id: 'modules/module-2/chapter-8', label: 'Chapter 8: Verbal and Non-Verbal Communication Modalities' },
        { type: 'doc', id: 'modules/module-2/chapter-9', label: 'Chapter 9: Gestures and Body Language in Robot Communication' },
        { type: 'doc', id: 'modules/module-2/chapter-10', label: 'Chapter 10: Speech and Prosody in Robot Communication' },
        { type: 'doc', id: 'modules/module-2/chapter-11', label: 'Chapter 11: Multimodal Communication Integration in HRI' },
        { type: 'doc', id: 'modules/module-2/chapter-12', label: 'Chapter 12: Cultural and Contextual Considerations in Multimodal Communication' },
      ],
    },
    {
      type: 'category',
      label: 'Module 3: Robot Embodiment and Appearance Design',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-3/chapter-13', label: 'Chapter 13: Physical Safety in Human-Robot Interaction' },
        { type: 'doc', id: 'modules/module-3/chapter-14', label: 'Chapter 14: Robot Appearance and Design for Social Interaction' },
        { type: 'doc', id: 'modules/module-3/chapter-15', label: 'Chapter 15: Anthropomorphism and the Uncanny Valley in HRI' },
        { type: 'doc', id: 'modules/module-3/chapter-16', label: 'Chapter 16: Material Selection and Tactile Design for Social Robots' },
        { type: 'doc', id: 'modules/module-3/chapter-17', label: 'Chapter 17: Facial Expression and Emotional Display Systems' },
        { type: 'doc', id: 'modules/module-3/chapter-18', label: 'Chapter 18: Embodied Interaction Principles' },
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Trust, Acceptance, and User Experience',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-4/chapter-19', label: 'Chapter 19: Building Trust in Human-Robot Interaction' },
        { type: 'doc', id: 'modules/module-4/chapter-20', label: 'Chapter 20: Factors Influencing Robot Acceptance' },
        { type: 'doc', id: 'modules/module-4/chapter-21', label: 'Chapter 21: User Experience Design for Social Robots' },
        { type: 'doc', id: 'modules/module-4/chapter-22', label: 'Chapter 22: Usability and Accessibility in HRI' },
        { type: 'doc', id: 'modules/module-4/chapter-23', label: 'Chapter 23: Long-term User Engagement and Attachment' },
        { type: 'doc', id: 'modules/module-4/chapter-24', label: 'Chapter 24: Personalization and Adaptive Interfaces' },
      ],
    },
    {
      type: 'category',
      label: 'Module 5: Collaboration and Teamwork with Robots',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-5/chapter-25', label: 'Chapter 25: Human-Robot Team Formation and Dynamics' },
        { type: 'doc', id: 'modules/module-5/chapter-26', label: 'Chapter 26: Communication Protocols for Human-Robot Teams' },
        { type: 'doc', id: 'modules/module-5/chapter-27', label: 'Chapter 27: Task Allocation and Coordination in Human-Robot Teams' },
        { type: 'doc', id: 'modules/module-5/chapter-28', label: 'Chapter 28: Trust and Leadership in Human-Robot Teams' },
        { type: 'doc', id: 'modules/module-5/chapter-29', label: 'Chapter 29: Conflict Resolution in Human-Robot Teams' },
        { type: 'doc', id: 'modules/module-5/chapter-30', label: 'Chapter 30: Performance Evaluation in Human-Robot Teams' },
      ],
    },
    {
      type: 'category',
      label: 'Module 6: Cultural and Social Context in HRI',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-6/chapter-31', label: 'Chapter 31: Cross-Cultural Considerations in HRI' },
        { type: 'doc', id: 'modules/module-6/chapter-32', label: 'Chapter 32: Social Norms and Cultural Etiquette in Robot Design' },
        { type: 'doc', id: 'modules/module-6/chapter-33', label: 'Chapter 33: Cultural Adaptation Mechanisms for Social Robots' },
        { type: 'doc', id: 'modules/module-6/chapter-34', label: 'Chapter 34: Social Status and Hierarchy in Human-Robot Interaction' },
        { type: 'doc', id: 'modules/module-6/chapter-35', label: 'Chapter 35: Group Dynamics and Robot Integration in Social Settings' },
        { type: 'doc', id: 'modules/module-6/chapter-36', label: 'Chapter 36: Community Acceptance and Social Integration of Robots' },
      ],
    },
    {
      type: 'category',
      label: 'Module 7: Learning and Adaptation in Human-Robot Teams',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-7/chapter-37', label: 'Chapter 37: Machine Learning for Personalized HRI' },
        { type: 'doc', id: 'modules/module-7/chapter-38', label: 'Chapter 38: Reinforcement Learning in Social Robotics' },
        { type: 'doc', id: 'modules/module-7/chapter-39', label: 'Chapter 39: Learning from Demonstration in HRI' },
        { type: 'doc', id: 'modules/module-7/chapter-40', label: 'Chapter 40: Adaptation to User Preferences and Behavior' },
        { type: 'doc', id: 'modules/module-7/chapter-41', label: 'Chapter 41: Transfer Learning Across Users and Contexts' },
        { type: 'doc', id: 'modules/module-7/chapter-42', label: 'Chapter 42: Ethical Considerations in Robot Learning' },
      ],
    },
    {
      type: 'category',
      label: 'Module 8: Applications in Service and Care Robotics',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-8/chapter-43', label: 'Chapter 43: Healthcare Robotics and Patient Care' },
        { type: 'doc', id: 'modules/module-8/chapter-44', label: 'Chapter 44: Elderly Care and Companionship Robots' },
        { type: 'doc', id: 'modules/module-8/chapter-45', label: 'Chapter 45: Educational Robotics and Tutoring Systems' },
        { type: 'doc', id: 'modules/module-8/chapter-46', label: 'Chapter 46: Domestic Service Robots and Home Automation' },
        { type: 'doc', id: 'modules/module-8/chapter-47', label: 'Chapter 47: Retail and Customer Service Applications' },
        { type: 'doc', id: 'modules/module-8/chapter-48', label: 'Chapter 48: Assistive Robotics for People with Disabilities' },
      ],
    },
    {
      type: 'category',
      label: 'Module 9: Ethical and Psychological Implications',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-9/chapter-49', label: 'Chapter 49: Ethical Frameworks in Human-Robot Interaction' },
        { type: 'doc', id: 'modules/module-9/chapter-50', label: 'Chapter 50: Psychological Effects of Human-Robot Relationships' },
        { type: 'doc', id: 'modules/module-9/chapter-51', label: 'Chapter 51: Deception and Authenticity in Robot Interactions' },
        { type: 'doc', id: 'modules/module-9/chapter-52', label: 'Chapter 52: Robot Rights and Moral Status Considerations' },
        { type: 'doc', id: 'modules/module-9/chapter-53', label: 'Chapter 53: Impact of Robots on Human Social Behavior' },
        { type: 'doc', id: 'modules/module-9/chapter-54', label: 'Chapter 54: Balancing Benefits and Risks in HRI Ethics' },
      ],
    },
    {
      type: 'category',
      label: 'Module 10: Future Directions and Societal Impact',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-10/chapter-55', label: 'Chapter 55: Future Directions in Human-Robot Interaction Technology' },
        { type: 'doc', id: 'modules/module-10/chapter-56', label: 'Chapter 56: Societal Implications of Human-Robot Integration' },
        { type: 'doc', id: 'modules/module-10/chapter-57', label: 'Chapter 57: Preparing Society for Human-Robot Coexistence' },
        { type: 'doc', id: 'modules/module-10/chapter-58', label: 'Chapter 58: Policy and Governance for Human-Robot Interaction' },
        { type: 'doc', id: 'modules/module-10/chapter-59', label: 'Chapter 59: Economic Models and Business Applications in HRI' },
        { type: 'doc', id: 'modules/module-10/chapter-60', label: 'Chapter 60: Conclusion and Future Research Directions' },
      ],
    },
  ],
};

export default sidebars;
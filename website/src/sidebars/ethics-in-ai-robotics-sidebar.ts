import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Sidebar for the Ethics in AI & Robotics Textbook
 */
const sidebars: SidebarsConfig = {
  ethicsInAIRoboticsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '📘 Ethics in AI & Robotics Textbook',
      className: 'sidebar-title-intro',
    },
    {
      type: 'category',
      label: 'Module 1: Foundations of Ethics in AI and Robotics',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Ethics in AI and Robotics' },
        { type: 'doc', id: 'modules/module-1/chapter-2', label: 'Chapter 2: Historical Context of AI Ethics' },
        { type: 'doc', id: 'modules/module-1/chapter-3', label: 'Chapter 3: Moral Philosophy Foundations' },
        { type: 'doc', id: 'modules/module-1/chapter-4', label: 'Chapter 4: Legal Frameworks and Regulations' },
        { type: 'doc', id: 'modules/module-1/chapter-5', label: 'Chapter 5: Cultural and Societal Considerations' },
        { type: 'doc', id: 'modules/module-1/chapter-6', label: 'Chapter 6: Professional Ethics in Robotics' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Bias, Fairness, and Algorithmic Justice',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-2/chapter-7', label: 'Chapter 7: Understanding Bias in AI and Robotic Systems' },
        { type: 'doc', id: 'modules/module-2/chapter-8', label: 'Chapter 8: Algorithmic Fairness and Its Measures' },
        { type: 'doc', id: 'modules/module-2/chapter-9', label: 'Chapter 9: Addressing Bias Through Algorithmic Interventions' },
        { type: 'doc', id: 'modules/module-2/chapter-10', label: 'Chapter 10: Fairness in Data Collection and Representation' },
        { type: 'doc', id: 'modules/module-2/chapter-11', label: 'Chapter 11: Case Studies in Bias and Fairness' },
        { type: 'doc', id: 'modules/module-2/chapter-12', label: 'Chapter 12: Future Challenges in Bias and Fairness' },
      ],
    },
    {
      type: 'category',
      label: 'Module 3: Privacy, Surveillance, and Data Rights',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-3/chapter-13', label: 'Chapter 13: Privacy in AI and Robotic Systems' },
        { type: 'doc', id: 'modules/module-3/chapter-14', label: 'Chapter 14: Surveillance Technologies and Ethical Implications' },
        { type: 'doc', id: 'modules/module-3/chapter-15', label: 'Chapter 15: Data Rights and Ownership' },
        { type: 'doc', id: 'modules/module-3/chapter-16', label: 'Chapter 16: Consent and Transparency in Data Collection' },
        { type: 'doc', id: 'modules/module-3/chapter-17', label: 'Chapter 17: Data Protection and Security' },
        { type: 'doc', id: 'modules/module-3/chapter-18', label: 'Chapter 18: Balancing Security and Privacy' },
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Safety, Security, and Risk Management',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-4/chapter-19', label: 'Chapter 19: Safety in AI and Robotic Systems' },
        { type: 'doc', id: 'modules/module-4/chapter-20', label: 'Chapter 20: Risk Assessment and Management' },
        { type: 'doc', id: 'modules/module-4/chapter-21', label: 'Chapter 21: Security Vulnerabilities in Robotic Systems' },
        { type: 'doc', id: 'modules/module-4/chapter-22', label: 'Chapter 22: Ethical Implications of Autonomous Weapons' },
        { type: 'doc', id: 'modules/module-4/chapter-23', label: 'Chapter 23: Fail-Safe Mechanisms and Emergency Protocols' },
        { type: 'doc', id: 'modules/module-4/chapter-24', label: 'Chapter 24: Human Oversight and Control' },
      ],
    },
    {
      type: 'category',
      label: 'Module 5: Human-Robot Interaction Ethics',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-5/chapter-25', label: 'Chapter 25: Trust and Deception in Human-Robot Interaction' },
        { type: 'doc', id: 'modules/module-5/chapter-26', label: 'Chapter 26: Anthropomorphism and Its Ethical Implications' },
        { type: 'doc', id: 'modules/module-5/chapter-27', label: 'Chapter 27: Emotional Attachment to Robots' },
        { type: 'doc', id: 'modules/module-5/chapter-28', label: 'Chapter 28: Social Robots and Human Relationships' },
        { type: 'doc', id: 'modules/module-5/chapter-29', label: 'Chapter 29: Robot Rights and Moral Status' },
        { type: 'doc', id: 'modules/module-5/chapter-30', label: 'Chapter 30: Ethical Design Principles for Social Robots' },
      ],
    },
    {
      type: 'category',
      label: 'Module 6: Labor, Economy, and Social Justice',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-6/chapter-31', label: 'Chapter 31: Automation and Employment Displacement' },
        { type: 'doc', id: 'modules/module-6/chapter-32', label: 'Chapter 32: Economic Inequality and AI' },
        { type: 'doc', id: 'modules/module-6/chapter-33', label: 'Chapter 33: Universal Basic Income and Robot Tax' },
        { type: 'doc', id: 'modules/module-6/chapter-34', label: 'Chapter 34: Access to AI and Digital Divide' },
        { type: 'doc', id: 'modules/module-6/chapter-35', label: 'Chapter 35: Social Justice and AI Governance' },
        { type: 'doc', id: 'modules/module-6/chapter-36', label: 'Chapter 36: Ethical Implications of AI in Healthcare' },
      ],
    },
    {
      type: 'category',
      label: 'Module 7: Military, Law Enforcement, and Autonomous Weapons',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-7/chapter-37', label: 'Chapter 37: Autonomous Weapons and Lethal Autonomous Weapons Systems' },
        { type: 'doc', id: 'modules/module-7/chapter-38', label: 'Chapter 38: AI in Law Enforcement and Policing' },
        { type: 'doc', id: 'modules/module-7/chapter-39', label: 'Chapter 39: Surveillance and Privacy in Public Spaces' },
        { type: 'doc', id: 'modules/module-7/chapter-40', label: 'Chapter 40: Ethical Implications of Military AI' },
        { type: 'doc', id: 'modules/module-7/chapter-41', label: 'Chapter 41: International Law and Autonomous Weapons' },
        { type: 'doc', id: 'modules/module-7/chapter-42', label: 'Chapter 42: Accountability and Responsibility in Military AI' },
      ],
    },
    {
      type: 'category',
      label: 'Module 8: Care, Companionship, and Emotional Robotics',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-8/chapter-43', label: 'Chapter 43: Care Robots and Elderly Care' },
        { type: 'doc', id: 'modules/module-8/chapter-44', label: 'Chapter 44: Therapeutic Robots and Mental Health' },
        { type: 'doc', id: 'modules/module-8/chapter-45', label: 'Chapter 45: Child-Robot Interaction and Development' },
        { type: 'doc', id: 'modules/module-8/chapter-46', label: 'Chapter 46: Emotional Attachment and Dependency' },
        { type: 'doc', id: 'modules/module-8/chapter-47', label: 'Chapter 47: Ethical Considerations in Care Robotics' },
        { type: 'doc', id: 'modules/module-8/chapter-48', label: 'Chapter 48: Privacy and Data Security in Care Settings' },
      ],
    },
    {
      type: 'category',
      label: 'Module 9: Governance, Regulation, and Professional Ethics',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-9/chapter-49', label: 'Chapter 49: Regulatory Frameworks for AI and Robotics' },
        { type: 'doc', id: 'modules/module-9/chapter-50', label: 'Chapter 50: International Cooperation and Standards' },
        { type: 'doc', id: 'modules/module-9/chapter-51', label: 'Chapter 51: Professional Ethics and Codes of Conduct' },
        { type: 'doc', id: 'modules/module-9/chapter-52', label: 'Chapter 52: Ethical Review Processes for AI Research' },
        { type: 'doc', id: 'modules/module-9/chapter-53', label: 'Chapter 53: Transparency and Explainability in AI Systems' },
        { type: 'doc', id: 'modules/module-9/chapter-54', label: 'Chapter 54: Stakeholder Engagement and Public Participation' },
      ],
    },
    {
      type: 'category',
      label: 'Module 10: Future Challenges and Ethical Frameworks',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-10/chapter-55', label: 'Chapter 55: Superintelligence and Existential Risks' },
        { type: 'doc', id: 'modules/module-10/chapter-56', label: 'Chapter 56: Ethical Implications of Human Enhancement' },
        { type: 'doc', id: 'modules/module-10/chapter-57', label: 'Chapter 57: Robot Consciousness and Rights' },
        { type: 'doc', id: 'modules/module-10/chapter-58', label: 'Chapter 58: Future Ethical Frameworks and Principles' },
        { type: 'doc', id: 'modules/module-10/chapter-59', label: 'Chapter 59: Emerging Technologies and Ethical Considerations' },
        { type: 'doc', id: 'modules/module-10/chapter-60', label: 'Chapter 60: Building Ethical AI for the Future' },
      ],
    },
  ],
};

export default sidebars;
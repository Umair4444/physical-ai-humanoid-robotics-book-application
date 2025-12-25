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
      label: 'Module 1: Foundations',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Ethics in AI Robotics' },
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
  ],
};

export default sidebars;
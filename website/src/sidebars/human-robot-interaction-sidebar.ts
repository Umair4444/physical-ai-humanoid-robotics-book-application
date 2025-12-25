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
  ],
};

export default sidebars;
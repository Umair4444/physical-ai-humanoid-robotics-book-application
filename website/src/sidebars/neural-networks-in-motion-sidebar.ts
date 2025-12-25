import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Sidebar for the Neural Networks in Motion Textbook
 */
const sidebars: SidebarsConfig = {
  neuralNetworksInMotionSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '📘 Neural Networks in Motion Textbook',
      className: 'sidebar-title-intro',
    },
    {
      type: 'category',
      label: 'Module 1: Foundations',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Neural Networks in Motion' },
        { type: 'doc', id: 'modules/module-1/chapter-2', label: 'Chapter 2: Biological Neural Networks and Motion Control' },
        { type: 'doc', id: 'modules/module-1/chapter-3', label: 'Chapter 3: Artificial Neural Networks for Motion Prediction' },
        { type: 'doc', id: 'modules/module-1/chapter-4', label: 'Chapter 4: Recurrent Neural Networks for Sequential Motion' },
        { type: 'doc', id: 'modules/module-1/chapter-5', label: 'Chapter 5: Convolutional Networks for Motion Processing' },
        { type: 'doc', id: 'modules/module-1/chapter-6', label: 'Chapter 6: Reinforcement Learning for Motion Control' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Recurrent Neural Networks for Motion Prediction',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-2/chapter-7', label: 'Chapter 7: Introduction to Recurrent Neural Networks for Motion' },
        { type: 'doc', id: 'modules/module-2/chapter-8', label: 'Chapter 8: Long Short-Term Memory (LSTM) Networks for Motion Sequences' },
        { type: 'doc', id: 'modules/module-2/chapter-9', label: 'Chapter 9: Gated Recurrent Units (GRUs) for Real-Time Motion Prediction' },
        { type: 'doc', id: 'modules/module-2/chapter-10', label: 'Chapter 10: Motion Sequence Learning with Encoder-Decoder Architectures' },
        { type: 'doc', id: 'modules/module-2/chapter-11', label: 'Chapter 11: Attention Mechanisms in Motion Prediction Networks' },
        { type: 'doc', id: 'modules/module-2/chapter-12', label: 'Chapter 12: Advanced Motion Prediction with RNNs' },
      ],
    },
  ],
};

export default sidebars;
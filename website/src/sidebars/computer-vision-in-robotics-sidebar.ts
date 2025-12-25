import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Sidebar for the Computer Vision in Robotics Textbook
 */
const sidebars: SidebarsConfig = {
  computerVisionInRoboticsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '📘 Computer Vision in Robotics Textbook',
      className: 'sidebar-title-intro',
    },
    {
      type: 'category',
      label: 'Module 1: Foundations',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Computer Vision in Robotics' },
        { type: 'doc', id: 'modules/module-1/chapter-2', label: 'Chapter 2: Image Formation and Camera Models' },
        { type: 'doc', id: 'modules/module-1/chapter-3', label: 'Chapter 3: Digital Image Processing Fundamentals' },
        { type: 'doc', id: 'modules/module-1/chapter-4', label: 'Chapter 4: Color Spaces and Image Enhancement' },
        { type: 'doc', id: 'modules/module-1/chapter-5', label: 'Chapter 5: Filtering and Noise Reduction' },
        { type: 'doc', id: 'modules/module-1/chapter-6', label: 'Chapter 6: Feature Detection and Extraction' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Image Processing and Feature Extraction',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-2/chapter-7', label: 'Chapter 7: Edge Detection and Corner Extraction' },
        { type: 'doc', id: 'modules/module-2/chapter-8', label: 'Chapter 8: Feature Extraction and Descriptor Computation' },
        { type: 'doc', id: 'modules/module-2/chapter-9', label: 'Chapter 9: Template Matching and Object Recognition' },
        { type: 'doc', id: 'modules/module-2/chapter-10', label: 'Chapter 10: Motion Analysis and Optical Flow' },
        { type: 'doc', id: 'modules/module-2/chapter-11', label: 'Chapter 11: Stereo Vision and Depth Perception' },
        { type: 'doc', id: 'modules/module-2/chapter-12', label: 'Chapter 12: Sensor-Based Grasp Planning and Feedback Control' },
      ],
    },
  ],
};

export default sidebars;
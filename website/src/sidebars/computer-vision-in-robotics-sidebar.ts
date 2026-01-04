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
      label: 'Module 1: Foundations of Computer Vision in Robotics',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Computer Vision in Robotics' },
        { type: 'doc', id: 'modules/module-1/chapter-2', label: 'Chapter 2: Image Formation and Camera Models' },
        { type: 'doc', id: 'modules/module-1/chapter-3', label: 'Chapter 3: Color Spaces and Image Representations' },
        { type: 'doc', id: 'modules/module-1/chapter-4', label: 'Chapter 4: Image Enhancement and Preprocessing' },
        { type: 'doc', id: 'modules/module-1/chapter-5', label: 'Chapter 5: Histogram Analysis and Equalization' },
        { type: 'doc', id: 'modules/module-1/chapter-6', label: 'Chapter 6: Noise Reduction and Filtering Techniques' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Image Processing and Feature Extraction',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-2/chapter-7', label: 'Chapter 7: Edge Detection and Contour Analysis' },
        { type: 'doc', id: 'modules/module-2/chapter-8', label: 'Chapter 8: Corner Detection and Interest Point Analysis' },
        { type: 'doc', id: 'modules/module-2/chapter-9', label: 'Chapter 9: Texture Analysis and Feature Descriptors' },
        { type: 'doc', id: 'modules/module-2/chapter-10', label: 'Chapter 10: Shape Analysis and Contour Descriptors' },
        { type: 'doc', id: 'modules/module-2/chapter-11', label: 'Chapter 11: Template Matching and Cross-Correlation' },
        { type: 'doc', id: 'modules/module-2/chapter-12', label: 'Chapter 12: Morphological Operations and Binary Image Processing' },
      ],
    },
    {
      type: 'category',
      label: 'Module 3: Object Detection and Recognition',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-3/chapter-13', label: 'Chapter 13: Introduction to Object Detection' },
        { type: 'doc', id: 'modules/module-3/chapter-14', label: 'Chapter 14: Feature-Based Object Recognition' },
        { type: 'doc', id: 'modules/module-3/chapter-15', label: 'Chapter 15: Template-Based Recognition' },
        { type: 'doc', id: 'modules/module-3/chapter-16', label: 'Chapter 16: Bag of Words Models for Recognition' },
        { type: 'doc', id: 'modules/module-3/chapter-17', label: 'Chapter 17: Scale-Invariant Feature Transform (SIFT)' },
        { type: 'doc', id: 'modules/module-3/chapter-18', label: 'Chapter 18: Speeded-Up Robust Features (SURF)' },
      ],
    },
    {
      type: 'category',
      label: 'Module 4: 3D Vision and Depth Perception',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-4/chapter-19', label: 'Chapter 19: Stereo Vision and Depth Estimation' },
        { type: 'doc', id: 'modules/module-4/chapter-20', label: 'Chapter 20: Structure from Motion (SfM)' },
        { type: 'doc', id: 'modules/module-4/chapter-21', label: 'Chapter 21: Multi-View Geometry and Camera Calibration' },
        { type: 'doc', id: 'modules/module-4/chapter-22', label: 'Chapter 22: 3D Reconstruction Techniques' },
        { type: 'doc', id: 'modules/module-4/chapter-23', label: 'Chapter 23: Point Cloud Processing and Analysis' },
        { type: 'doc', id: 'modules/module-4/chapter-24', label: 'Chapter 24: RGB-D Sensors and Depth Camera Applications' },
      ],
    },
    {
      type: 'category',
      label: 'Module 5: Motion Analysis and Tracking',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-5/chapter-25', label: 'Chapter 25: Optical Flow and Motion Estimation' },
        { type: 'doc', id: 'modules/module-5/chapter-26', label: 'Chapter 26: Background Subtraction and Foreground Detection' },
        { type: 'doc', id: 'modules/module-5/chapter-27', label: 'Chapter 27: Object Tracking in Video Sequences' },
        { type: 'doc', id: 'modules/module-5/chapter-28', label: 'Chapter 28: Kalman Filters and Particle Filters for Tracking' },
        { type: 'doc', id: 'modules/module-5/chapter-29', label: 'Chapter 29: Multiple Object Tracking' },
        { type: 'doc', id: 'modules/module-5/chapter-30', label: 'Chapter 30: Activity Recognition and Human Pose Estimation' },
      ],
    },
    {
      type: 'category',
      label: 'Module 6: Visual SLAM and Navigation',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-6/chapter-31', label: 'Chapter 31: Introduction to Visual SLAM' },
        { type: 'doc', id: 'modules/module-6/chapter-32', label: 'Chapter 32: Feature-Based SLAM Systems' },
        { type: 'doc', id: 'modules/module-6/chapter-33', label: 'Chapter 33: Direct SLAM Methods' },
        { type: 'doc', id: 'modules/module-6/chapter-34', label: 'Chapter 34: Dense Reconstruction and Mapping' },
        { type: 'doc', id: 'modules/module-6/chapter-35', label: 'Chapter 35: Loop Closure Detection and Graph Optimization' },
        { type: 'doc', id: 'modules/module-6/chapter-36', label: 'Chapter 36: Visual-Inertial Odometry and Sensor Fusion' },
      ],
    },
    {
      type: 'category',
      label: 'Module 7: Human-Robot Visual Interaction',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-7/chapter-37', label: 'Chapter 37: Gaze Estimation and Eye Tracking' },
        { type: 'doc', id: 'modules/module-7/chapter-38', label: 'Chapter 38: Facial Expression Recognition' },
        { type: 'doc', id: 'modules/module-7/chapter-39', label: 'Chapter 39: Gesture Recognition and Interpretation' },
        { type: 'doc', id: 'modules/module-7/chapter-40', label: 'Chapter 40: Human Pose Estimation and Body Language' },
        { type: 'doc', id: 'modules/module-7/chapter-41', label: 'Chapter 41: Social Signal Processing' },
        { type: 'doc', id: 'modules/module-7/chapter-42', label: 'Chapter 42: Attention Mechanisms and Social Robotics' },
      ],
    },
    {
      type: 'category',
      label: 'Module 8: Deep Learning for Visual Perception',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-8/chapter-43', label: 'Chapter 43: Introduction to Deep Learning for Computer Vision' },
        { type: 'doc', id: 'modules/module-8/chapter-44', label: 'Chapter 44: Convolutional Neural Networks (CNNs) Fundamentals' },
        { type: 'doc', id: 'modules/module-8/chapter-45', label: 'Chapter 45: Object Detection with Deep Learning' },
        { type: 'doc', id: 'modules/module-8/chapter-46', label: 'Chapter 46: Semantic Segmentation and Instance Segmentation' },
        { type: 'doc', id: 'modules/module-8/chapter-47', label: 'Chapter 47: Generative Adversarial Networks (GANs) in Vision' },
        { type: 'doc', id: 'modules/module-8/chapter-48', label: 'Chapter 48: Vision Transformers and Attention Mechanisms' },
      ],
    },
    {
      type: 'category',
      label: 'Module 9: Applications in Service and Industrial Robotics',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-9/chapter-49', label: 'Chapter 49: Quality Control and Inspection Systems' },
        { type: 'doc', id: 'modules/module-9/chapter-50', label: 'Chapter 50: Autonomous Navigation and Obstacle Avoidance' },
        { type: 'doc', id: 'modules/module-9/chapter-51', label: 'Chapter 51: Robotic Grasping and Manipulation' },
        { type: 'doc', id: 'modules/module-9/chapter-52', label: 'Chapter 52: Agricultural Robotics and Crop Monitoring' },
        { type: 'doc', id: 'modules/module-9/chapter-53', label: 'Chapter 53: Medical Imaging and Surgical Robotics' },
        { type: 'doc', id: 'modules/module-9/chapter-54', label: 'Chapter 54: Surveillance and Security Applications' },
      ],
    },
    {
      type: 'category',
      label: 'Module 10: Deployment, Ethics, and Future Outlook',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'modules/module-10/chapter-55', label: 'Chapter 55: Real-Time Performance and Optimization' },
        { type: 'doc', id: 'modules/module-10/chapter-56', label: 'Chapter 56: Privacy and Data Protection in Computer Vision' },
        { type: 'doc', id: 'modules/module-10/chapter-57', label: 'Chapter 57: Bias and Fairness in Vision Systems' },
        { type: 'doc', id: 'modules/module-10/chapter-58', label: 'Chapter 58: Regulatory Frameworks and Standards' },
        { type: 'doc', id: 'modules/module-10/chapter-59', label: 'Chapter 59: Emerging Technologies and Research Frontiers' },
        { type: 'doc', id: 'modules/module-10/chapter-60', label: 'Chapter 60: Future Directions and Societal Impact' },
      ],
    },
  ],
};

export default sidebars;
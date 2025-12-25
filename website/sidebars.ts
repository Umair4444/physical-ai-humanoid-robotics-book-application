import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Main sidebar for the entire textbook collection
  textbookSidebar: [
    {
      type: 'doc',
      id: 'books/physical-ai-humanoid-robotics-book/intro',
      label: '📘 Physical AI & Humanoid Robotics Textbook',
      className: 'sidebar-title-intro',
    },
    {
      type: 'category',
      label: 'Module 1: Foundations',
      collapsible: true,
      collapsed: false,
      items: [
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Physical AI' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-1/chapter-2', label: 'Chapter 2: Biomechanics and Biomimicry' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-1/chapter-3', label: 'Chapter 3: Sensorimotor Integration' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-1/chapter-4', label: 'Chapter 4: Actuation Systems' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-1/chapter-5', label: 'Chapter 5: Perception Systems' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-1/chapter-6', label: 'Chapter 6: Cognitive Architectures' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Advanced Control',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-2/chapter-7', label: 'Chapter 7: Advanced Sensorimotor Control' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-2/chapter-8', label: 'Chapter 8: Deep Learning for Motor Skills' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-2/chapter-9', label: 'Chapter 9: Adaptive Control' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-2/chapter-10', label: 'Chapter 10: Locomotion and Balance' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-2/chapter-11', label: 'Chapter 11: Dexterous Manipulation' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-2/chapter-12', label: 'Chapter 12: Social Interaction' },
      ],
    },
    {
      type: 'category',
      label: 'Module 3: Hardware Integration',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-3/chapter-13', label: 'Chapter 13: Hardware Design' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-3/chapter-14', label: 'Chapter 14: Actuator Technologies' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-3/chapter-15', label: 'Chapter 15: Sensing Hardware' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-3/chapter-16', label: 'Chapter 16: Power Systems' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-3/chapter-17', label: 'Chapter 17: Safety Systems' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-3/chapter-18', label: 'Chapter 18: System Architecture' },
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Software Infrastructure',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-4/chapter-19', label: 'Chapter 19: Operating Systems' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-4/chapter-20', label: 'Chapter 20: Development Tools' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-4/chapter-21', label: 'Chapter 21: Robotics Frameworks' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-4/chapter-22', label: 'Chapter 22: Programming Paradigms' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-4/chapter-23', label: 'Chapter 23: Simulation and Testing' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-4/chapter-24', label: 'Chapter 24: Cloud Robotics' },
      ],
    },
    {
      type: 'category',
      label: 'Module 5: Human-Robot Interaction',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-5/chapter-25', label: 'Chapter 25: Interaction Design' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-5/chapter-26', label: 'Chapter 26: Social Cognition' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-5/chapter-27', label: 'Chapter 27: Gesture Recognition' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-5/chapter-28', label: 'Chapter 28: Natural Language Processing' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-5/chapter-29', label: 'Chapter 29: Trust and Safety' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-5/chapter-30', label: 'Chapter 30: Ethics and Implications' },
      ],
    },
    {
      type: 'category',
      label: 'Module 6: Motion Control',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-6/chapter-31', label: 'Chapter 31: Locomotion Algorithms' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-6/chapter-32', label: 'Chapter 32: Balance and Posture' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-6/chapter-33', label: 'Chapter 33: Footstep Planning' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-6/chapter-34', label: 'Chapter 34: Manipulation Control' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-6/chapter-35', label: 'Chapter 35: Whole-Body Motion' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-6/chapter-36', label: 'Chapter 36: Motion Planning' },
      ],
    },
    {
      type: 'category',
      label: 'Module 7: Perception Technologies',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-7/chapter-37', label: 'Chapter 37: Perception Systems' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-7/chapter-38', label: 'Chapter 38: 3D Perception' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-7/chapter-39', label: 'Chapter 39: Tactile Sensing' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-7/chapter-40', label: 'Chapter 40: Sensor Fusion' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-7/chapter-41', label: 'Chapter 41: SLAM for Humanoids' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-7/chapter-42', label: 'Chapter 42: Advanced Sensing' },
      ],
    },
    {
      type: 'category',
      label: 'Module 8: AI and Learning',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-8/chapter-43', label: 'Chapter 43: AI Integration' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-8/chapter-44', label: 'Chapter 44: Neural Networks' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-8/chapter-45', label: 'Chapter 45: Reinforcement Learning' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-8/chapter-46', label: 'Chapter 46: Cognitive Architectures' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-8/chapter-47', label: 'Chapter 47: Learning from Demonstration' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-8/chapter-48', label: 'Chapter 48: Ethical AI' },
      ],
    },
    {
      type: 'category',
      label: 'Module 9: Applications',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-9/chapter-49', label: 'Chapter 49: Applications and Use Cases' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-9/chapter-50', label: 'Chapter 50: Healthcare Applications' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-9/chapter-51', label: 'Chapter 51: Service Applications' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-9/chapter-52', label: 'Chapter 52: Education Applications' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-9/chapter-53', label: 'Chapter 53: Industrial Applications' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-9/chapter-54', label: 'Chapter 54: Entertainment Applications' },
      ],
    },
    {
      type: 'category',
      label: 'Module 10: Future Outlook',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-10/chapter-55', label: 'Chapter 55: Deployment Strategies' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-10/chapter-56', label: 'Chapter 56: Economic Impact' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-10/chapter-57', label: 'Chapter 57: Regulatory Framework' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-10/chapter-58', label: 'Chapter 58: Future Trends' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-10/chapter-59', label: 'Chapter 59: Societal Impact' },
        { type: 'doc', id: 'books/physical-ai-humanoid-robotics-book/modules/module-10/chapter-60', label: 'Chapter 60: Conclusion' },
      ],
    },
    
    // Ethics in AI Robotics Book
    {
      type: 'doc',
      id: 'books/ethics-in-ai-robotics/intro',
      label: '📘 Ethics in AI & Robotics Textbook',
      className: 'sidebar-title-intro',
    },
    {
      type: 'category',
      label: 'Module 1: Foundations',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/ethics-in-ai-robotics/modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Ethics in AI Robotics' },
        { type: 'doc', id: 'books/ethics-in-ai-robotics/modules/module-1/chapter-2', label: 'Chapter 2: Historical Context of AI Ethics' },
        { type: 'doc', id: 'books/ethics-in-ai-robotics/modules/module-1/chapter-3', label: 'Chapter 3: Moral Philosophy Foundations' },
        { type: 'doc', id: 'books/ethics-in-ai-robotics/modules/module-1/chapter-4', label: 'Chapter 4: Legal Frameworks and Regulations' },
        { type: 'doc', id: 'books/ethics-in-ai-robotics/modules/module-1/chapter-5', label: 'Chapter 5: Cultural and Societal Considerations' },
        { type: 'doc', id: 'books/ethics-in-ai-robotics/modules/module-1/chapter-6', label: 'Chapter 6: Professional Ethics in Robotics' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Bias, Fairness, and Algorithmic Justice',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/ethics-in-ai-robotics/modules/module-2/chapter-7', label: 'Chapter 7: Understanding Bias in AI and Robotic Systems' },
        { type: 'doc', id: 'books/ethics-in-ai-robotics/modules/module-2/chapter-8', label: 'Chapter 8: Algorithmic Fairness and Its Measures' },
        { type: 'doc', id: 'books/ethics-in-ai-robotics/modules/module-2/chapter-9', label: 'Chapter 9: Addressing Bias Through Algorithmic Interventions' },
        { type: 'doc', id: 'books/ethics-in-ai-robotics/modules/module-2/chapter-10', label: 'Chapter 10: Fairness in Data Collection and Representation' },
        { type: 'doc', id: 'books/ethics-in-ai-robotics/modules/module-2/chapter-11', label: 'Chapter 11: Case Studies in Bias and Fairness' },
        { type: 'doc', id: 'books/ethics-in-ai-robotics/modules/module-2/chapter-12', label: 'Chapter 12: Future Challenges in Bias and Fairness' },
      ],
    },
    
    // Human-Robot Interaction Book
    {
      type: 'doc',
      id: 'books/human-robot-interaction/intro',
      label: '📘 Human-Robot Interaction Textbook',
      className: 'sidebar-title-intro',
    },
    {
      type: 'category',
      label: 'Module 1: Foundations',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/human-robot-interaction/modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Human-Robot Interaction' },
        { type: 'doc', id: 'books/human-robot-interaction/modules/module-1/chapter-2', label: 'Chapter 2: Historical Development of HRI' },
        { type: 'doc', id: 'books/human-robot-interaction/modules/module-1/chapter-3', label: 'Chapter 3: Theoretical Foundations of Social Interaction' },
        { type: 'doc', id: 'books/human-robot-interaction/modules/module-1/chapter-4', label: 'Chapter 4: Psychological and Cognitive Aspects' },
        { type: 'doc', id: 'books/human-robot-interaction/modules/module-1/chapter-5', label: 'Chapter 5: Social Psychology Principles in HRI' },
        { type: 'doc', id: 'books/human-robot-interaction/modules/module-1/chapter-6', label: 'Chapter 6: Research Methods in Human-Robot Interaction' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Social Cues and Communication Modalities',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/human-robot-interaction/modules/module-2/chapter-7', label: 'Chapter 7: Understanding Social Cues in Human-Robot Interaction' },
        { type: 'doc', id: 'books/human-robot-interaction/modules/module-2/chapter-8', label: 'Chapter 8: Verbal and Non-Verbal Communication Modalities' },
        { type: 'doc', id: 'books/human-robot-interaction/modules/module-2/chapter-9', label: 'Chapter 9: Gestures and Body Language in Robot Communication' },
        { type: 'doc', id: 'books/human-robot-interaction/modules/module-2/chapter-10', label: 'Chapter 10: Speech and Prosody in Robot Communication' },
        { type: 'doc', id: 'books/human-robot-interaction/modules/module-2/chapter-11', label: 'Chapter 11: Multimodal Communication Integration in HRI' },
        { type: 'doc', id: 'books/human-robot-interaction/modules/module-2/chapter-12', label: 'Chapter 12: Cultural and Contextual Considerations in Multimodal Communication' },
      ],
    },
    
    // Humanoid Design Principles Book
    {
      type: 'doc',
      id: 'books/humanoid-design-principles/intro',
      label: '📘 Humanoid Design Principles Textbook',
      className: 'sidebar-title-intro',
    },
    {
      type: 'category',
      label: 'Module 1: Foundations',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/humanoid-design-principles/modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Humanoid Design Principles' },
        { type: 'doc', id: 'books/humanoid-design-principles/modules/module-1/chapter-2', label: 'Chapter 2: Historical Development of Humanoid Robots' },
        { type: 'doc', id: 'books/humanoid-design-principles/modules/module-1/chapter-3', label: 'Chapter 3: Biomechanical Principles for Humanoid Design' },
        { type: 'doc', id: 'books/humanoid-design-principles/modules/module-1/chapter-4', label: 'Chapter 4: Anthropometric Considerations' },
        { type: 'doc', id: 'books/humanoid-design-principles/modules/module-1/chapter-5', label: 'Chapter 5: Degrees of Freedom and Mobility Requirements' },
        { type: 'doc', id: 'books/humanoid-design-principles/modules/module-1/chapter-6', label: 'Chapter 6: Design Methodologies and Approaches' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Biomechanics and Kinematics',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/humanoid-design-principles/modules/module-2/chapter-7', label: 'Chapter 7: Introduction to Human Biomechanics for Robot Design' },
        { type: 'doc', id: 'books/humanoid-design-principles/modules/module-2/chapter-8', label: 'Chapter 8: Kinematic Analysis of Humanoid Robots' },
        { type: 'doc', id: 'books/humanoid-design-principles/modules/module-2/chapter-9', label: 'Chapter 9: Joint Design and Degrees of Freedom in Humanoid Robots' },
        { type: 'doc', id: 'books/humanoid-design-principles/modules/module-2/chapter-10', label: 'Chapter 10: Inverse Kinematics for Humanoid Motion Planning' },
        { type: 'doc', id: 'books/humanoid-design-principles/modules/module-2/chapter-11', label: 'Chapter 11: Dynamic Modeling and Control of Humanoid Robots' },
        { type: 'doc', id: 'books/humanoid-design-principles/modules/module-2/chapter-12', label: 'Chapter 12: Biomechanical Analysis of Human Movement for Robot Design' },
      ],
    },
    
    // Locomotion and Mobility Book
    {
      type: 'doc',
      id: 'books/locomotion-and-mobility/intro',
      label: '📘 Locomotion and Mobility in Robotics Textbook',
      className: 'sidebar-title-intro',
    },
    {
      type: 'category',
      label: 'Module 1: Foundations',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/locomotion-and-mobility/modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Locomotion and Mobility' },
        { type: 'doc', id: 'books/locomotion-and-mobility/modules/module-1/chapter-2', label: 'Chapter 2: Principles of Biological Locomotion' },
        { type: 'doc', id: 'books/locomotion-and-mobility/modules/module-1/chapter-3', label: 'Chapter 3: Types of Locomotion Systems' },
        { type: 'doc', id: 'books/locomotion-and-mobility/modules/module-1/chapter-4', label: 'Chapter 4: Kinematic and Dynamic Models for Locomotion' },
        { type: 'doc', id: 'books/locomotion-and-mobility/modules/module-1/chapter-5', label: 'Chapter 5: Stability and Balance in Locomotion' },
        { type: 'doc', id: 'books/locomotion-and-mobility/modules/module-1/chapter-6', label: 'Chapter 6: Energy Efficiency in Locomotion' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Legged Locomotion and Bipedal Walking',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/locomotion-and-mobility/modules/module-2/chapter-7', label: 'Chapter 7: Introduction to Legged Locomotion' },
        { type: 'doc', id: 'books/locomotion-and-mobility/modules/module-2/chapter-8', label: 'Chapter 8: Bipedal Walking Fundamentals and Gait Analysis' },
        { type: 'doc', id: 'books/locomotion-and-mobility/modules/module-2/chapter-9', label: 'Chapter 9: Balance Control and Stability in Bipedal Robots' },
        { type: 'doc', id: 'books/locomotion-and-mobility/modules/module-2/chapter-10', label: 'Chapter 10: Dynamic Walking and Gait Generation' },
        { type: 'doc', id: 'books/locomotion-and-mobility/modules/module-2/chapter-11', label: 'Chapter 11: Terrain Adaptation and Footstep Planning' },
        { type: 'doc', id: 'books/locomotion-and-mobility/modules/module-2/chapter-12', label: 'Chapter 12: Human-Inspired Locomotion and Biomimetic Approaches' },
      ],
    },
    
    // Manipulation and Grasping Book
    {
      type: 'doc',
      id: 'books/manipulation-and-grasping/intro',
      label: '📘 Manipulation and Grasping in Robotics Textbook',
      className: 'sidebar-title-intro',
    },
    {
      type: 'category',
      label: 'Module 1: Foundations',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/manipulation-and-grasping/modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Manipulation and Grasping' },
        { type: 'doc', id: 'books/manipulation-and-grasping/modules/module-1/chapter-2', label: 'Chapter 2: Historical Development of Robotic Manipulation' },
        { type: 'doc', id: 'books/manipulation-and-grasping/modules/module-1/chapter-3', label: 'Chapter 3: Biomechanics of Human Grasping' },
        { type: 'doc', id: 'books/manipulation-and-grasping/modules/module-1/chapter-4', label: 'Chapter 4: Types of Grasps and Manipulation Strategies' },
        { type: 'doc', id: 'books/manipulation-and-grasping/modules/module-1/chapter-5', label: 'Chapter 5: Kinematic and Dynamic Models for Manipulation' },
        { type: 'doc', id: 'books/manipulation-and-grasping/modules/module-1/chapter-6', label: 'Chapter 6: Sensor Integration in Manipulation' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Grasp Analysis and Planning',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/manipulation-and-grasping/modules/module-2/chapter-7', label: 'Chapter 7: Introduction to Grasp Analysis and Planning' },
        { type: 'doc', id: 'books/manipulation-and-grasping/modules/module-2/chapter-8', label: 'Chapter 8: Grasp Synthesis and Optimization' },
        { type: 'doc', id: 'books/manipulation-and-grasping/modules/module-2/chapter-9', label: 'Chapter 9: Contact Mechanics and Friction Modeling' },
        { type: 'doc', id: 'books/manipulation-and-grasping/modules/module-2/chapter-10', label: 'Chapter 10: Grasp Stability and Robustness Analysis' },
        { type: 'doc', id: 'books/manipulation-and-grasping/modules/module-2/chapter-11', label: 'Chapter 11: Sensor-Based Grasp Planning and Feedback Control' },
        { type: 'doc', id: 'books/manipulation-and-grasping/modules/module-2/chapter-12', label: 'Chapter 12: Advanced Grasp Planning Techniques' },
      ],
    },
    
    // Neural Networks in Motion Book
    {
      type: 'doc',
      id: 'books/neural-networks-in-motion/intro',
      label: '📘 Neural Networks in Motion Textbook',
      className: 'sidebar-title-intro',
    },
    {
      type: 'category',
      label: 'Module 1: Foundations',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/neural-networks-in-motion/modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Neural Networks in Motion' },
        { type: 'doc', id: 'books/neural-networks-in-motion/modules/module-1/chapter-2', label: 'Chapter 2: Biological Neural Networks and Motion Control' },
        { type: 'doc', id: 'books/neural-networks-in-motion/modules/module-1/chapter-3', label: 'Chapter 3: Artificial Neural Networks for Motion Prediction' },
        { type: 'doc', id: 'books/neural-networks-in-motion/modules/module-1/chapter-4', label: 'Chapter 4: Recurrent Neural Networks for Sequential Motion' },
        { type: 'doc', id: 'books/neural-networks-in-motion/modules/module-1/chapter-5', label: 'Chapter 5: Convolutional Networks for Motion Processing' },
        { type: 'doc', id: 'books/neural-networks-in-motion/modules/module-1/chapter-6', label: 'Chapter 6: Reinforcement Learning for Motion Control' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Recurrent Neural Networks for Motion Prediction',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/neural-networks-in-motion/modules/module-2/chapter-7', label: 'Chapter 7: Introduction to Recurrent Neural Networks for Motion' },
        { type: 'doc', id: 'books/neural-networks-in-motion/modules/module-2/chapter-8', label: 'Chapter 8: Long Short-Term Memory (LSTM) Networks for Motion Sequences' },
        { type: 'doc', id: 'books/neural-networks-in-motion/modules/module-2/chapter-9', label: 'Chapter 9: Gated Recurrent Units (GRUs) for Real-Time Motion Prediction' },
        { type: 'doc', id: 'books/neural-networks-in-motion/modules/module-2/chapter-10', label: 'Chapter 10: Motion Sequence Learning with Encoder-Decoder Architectures' },
        { type: 'doc', id: 'books/neural-networks-in-motion/modules/module-2/chapter-11', label: 'Chapter 11: Attention Mechanisms in Motion Prediction Networks' },
        { type: 'doc', id: 'books/neural-networks-in-motion/modules/module-2/chapter-12', label: 'Chapter 12: Real-Time Motion Prediction and Deployment Considerations' },
      ],
    },
    
    // Physical Computing for Robotics Book
    {
      type: 'doc',
      id: 'books/physical-computing-for-robotics/intro',
      label: '📘 Physical Computing for Robotics Textbook',
      className: 'sidebar-title-intro',
    },
    {
      type: 'category',
      label: 'Module 1: Foundations',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/physical-computing-for-robotics/modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Physical Computing for Robotics' },
        { type: 'doc', id: 'books/physical-computing-for-robotics/modules/module-1/chapter-2', label: 'Chapter 2: Electronics Fundamentals for Robotics' },
        { type: 'doc', id: 'books/physical-computing-for-robotics/modules/module-1/chapter-3', label: 'Chapter 3: Microcontrollers and Processing Units' },
        { type: 'doc', id: 'books/physical-computing-for-robotics/modules/module-1/chapter-4', label: 'Chapter 4: Digital and Analog I/O Systems' },
        { type: 'doc', id: 'books/physical-computing-for-robotics/modules/module-1/chapter-5', label: 'Chapter 5: Communication Protocols and Interfaces' },
        { type: 'doc', id: 'books/physical-computing-for-robotics/modules/module-1/chapter-6', label: 'Chapter 6: Real-Time Programming Concepts' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Sensors and Sensing Technologies',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/physical-computing-for-robotics/modules/module-2/chapter-7', label: 'Chapter 7: Introduction to Sensors and Sensing Technologies' },
        { type: 'doc', id: 'books/physical-computing-for-robotics/modules/module-2/chapter-8', label: 'Chapter 8: Inertial Measurement Units and Motion Sensors' },
        { type: 'doc', id: 'books/physical-computing-for-robotics/modules/module-2/chapter-9', label: 'Chapter 9: Vision Sensors and Camera Systems' },
        { type: 'doc', id: 'books/physical-computing-for-robotics/modules/module-2/chapter-10', label: 'Chapter 10: Force, Torque, and Tactile Sensors' },
        { type: 'doc', id: 'books/physical-computing-for-robotics/modules/module-2/chapter-11', label: 'Chapter 11: Range and Distance Sensors' },
        { type: 'doc', id: 'books/physical-computing-for-robotics/modules/module-2/chapter-12', label: 'Chapter 12: Sensor Fusion and Data Integration' },
      ],
    },
    
    // Robotics Simulation Environments Book
    {
      type: 'doc',
      id: 'books/robotics-simulation-environments/intro',
      label: '📘 Robotics Simulation Environments Textbook',
      className: 'sidebar-title-intro',
    },
    {
      type: 'category',
      label: 'Module 1: Foundations',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/robotics-simulation-environments/modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Robotics Simulation Environments' },
        { type: 'doc', id: 'books/robotics-simulation-environments/modules/module-1/chapter-2', label: 'Chapter 2: Physics Simulation Fundamentals' },
        { type: 'doc', id: 'books/robotics-simulation-environments/modules/module-1/chapter-3', label: 'Chapter 3: Robot Modeling and Representation' },
        { type: 'doc', id: 'books/robotics-simulation-environments/modules/module-1/chapter-4', label: 'Chapter 4: Environment Modeling and Scene Generation' },
        { type: 'doc', id: 'books/robotics-simulation-environments/modules/module-1/chapter-5', label: 'Chapter 5: Sensor Simulation and Perception' },
        { type: 'doc', id: 'books/robotics-simulation-environments/modules/module-1/chapter-6', label: 'Chapter 6: Control and AI Integration' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Physics Simulation and Dynamics',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/robotics-simulation-environments/modules/module-2/chapter-7', label: 'Chapter 7: Introduction to Physics Simulation in Robotics' },
        { type: 'doc', id: 'books/robotics-simulation-environments/modules/module-2/chapter-8', label: 'Chapter 8: Rigid Body Dynamics and Motion Simulation' },
        { type: 'doc', id: 'books/robotics-simulation-environments/modules/module-2/chapter-9', label: 'Chapter 9: Soft Body and Deformable Object Simulation' },
        { type: 'doc', id: 'books/robotics-simulation-environments/modules/module-2/chapter-10', label: 'Chapter 10: Constraint Solving and Joint Simulation' },
        { type: 'doc', id: 'books/robotics-simulation-environments/modules/module-2/chapter-11', label: 'Chapter 11: Collision Detection and Contact Modeling' },
        { type: 'doc', id: 'books/robotics-simulation-environments/modules/module-2/chapter-12', label: 'Chapter 12: Real-time Physics Simulation and Performance Optimization' },
      ],
    },
    
    // Computer Vision in Robotics Book
    {
      type: 'doc',
      id: 'books/computer-vision-in-robotics/intro',
      label: '📘 Computer Vision in Robotics Textbook',
      className: 'sidebar-title-intro',
    },
    {
      type: 'category',
      label: 'Module 1: Foundations',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/computer-vision-in-robotics/modules/module-1/chapter-1', label: 'Chapter 1: Introduction to Computer Vision in Robotics' },
        { type: 'doc', id: 'books/computer-vision-in-robotics/modules/module-1/chapter-2', label: 'Chapter 2: Image Formation and Camera Models' },
        { type: 'doc', id: 'books/computer-vision-in-robotics/modules/module-1/chapter-3', label: 'Chapter 3: Digital Image Processing Fundamentals' },
        { type: 'doc', id: 'books/computer-vision-in-robotics/modules/module-1/chapter-4', label: 'Chapter 4: Color Spaces and Image Enhancement' },
        { type: 'doc', id: 'books/computer-vision-in-robotics/modules/module-1/chapter-5', label: 'Chapter 5: Filtering and Noise Reduction' },
        { type: 'doc', id: 'books/computer-vision-in-robotics/modules/module-1/chapter-6', label: 'Chapter 6: Feature Detection and Extraction' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Image Processing and Feature Extraction',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'books/computer-vision-in-robotics/modules/module-2/chapter-7', label: 'Chapter 7: Edge Detection and Corner Extraction' },
        { type: 'doc', id: 'books/computer-vision-in-robotics/modules/module-2/chapter-8', label: 'Chapter 8: Feature Extraction and Descriptor Computation' },
        { type: 'doc', id: 'books/computer-vision-in-robotics/modules/module-2/chapter-9', label: 'Chapter 9: Template Matching and Object Recognition' },
        { type: 'doc', id: 'books/computer-vision-in-robotics/modules/module-2/chapter-10', label: 'Chapter 10: Motion Analysis and Optical Flow' },
        { type: 'doc', id: 'books/computer-vision-in-robotics/modules/module-2/chapter-11', label: 'Chapter 11: Stereo Vision and Depth Perception' },
        { type: 'doc', id: 'books/computer-vision-in-robotics/modules/module-2/chapter-12', label: 'Chapter 12: Sensor-Based Grasp Planning and Feedback Control' },
      ],
    },
  ],
};

export default sidebars;
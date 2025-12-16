import { Chapter } from '../../types/module';

export const getModule7Content = (): Chapter[] => {
  return [
    {
      id: 'module-7-chapter-1',
      moduleId: 'module-7',
      title: 'Human-Robot Interaction Principles',
      order: 1,
      lessonContent: `<h2>Human-Robot Interaction Principles</h2><p>Human-robot interaction (HRI) is a multidisciplinary field that focuses on designing and implementing interfaces that enable effective communication and collaboration between humans and robots.</p><p>This chapter introduces the fundamental principles of HRI, including trust, predictability, and social acceptability that are crucial for successful human-robot collaboration.</p>`,
      summaryContent: `<p>Human-robot interaction principles include trust, predictability, and social acceptability. These principles are crucial for effective human-robot collaboration.</p>`,
      duration: 16,
      imageUrl: '/img/module-7-chapter-1.jpg'
    },
    {
      id: 'module-7-chapter-2',
      moduleId: 'module-7',
      title: 'Communication Modalities',
      order: 2,
      lessonContent: `<h2>Communication Modalities</h2><p>Robots can communicate with humans through various modalities including speech, gesture, visual interfaces, and haptic feedback.</p><p>Each modality has strengths and limitations depending on the environment and user capabilities. This chapter covers multimodal interfaces that combine multiple communication channels.</p>`,
      summaryContent: `<p>Communication modalities include speech, gesture, visual interfaces, and haptics. Multimodal interfaces combine multiple channels for effective communication.</p>`,
      duration: 18,
      imageUrl: '/img/module-7-chapter-2.jpg'
    },
    {
      id: 'module-7-chapter-3',
      moduleId: 'module-7',
      title: 'Social Robotics',
      order: 3,
      lessonContent: `<h2>Social Robotics</h2><p>Social robots are designed to interact with humans in socially meaningful ways, often exhibiting human-like behaviors and emotions.</p><p>This chapter covers the design principles for social robots, including appearance, personality, and social behaviors that foster natural interactions with humans.</p>`,
      summaryContent: `<p>Social robots exhibit human-like behaviors for meaningful interactions. Design principles include appearance, personality, and appropriate social behaviors.</p>`,
      duration: 20,
      imageUrl: '/img/module-7-chapter-3.jpg'
    },
    {
      id: 'module-7-chapter-4',
      moduleId: 'module-7',
      title: 'Trust and Acceptance',
      order: 4,
      lessonContent: `<h2>Trust and Acceptance</h2><p>Trust is crucial for successful HRI, as humans must be willing to rely on robots for tasks and decisions.</p><p>This chapter examines factors that influence trust, including robot transparency, reliability, and anthropomorphism. It also covers acceptance studies and design guidelines for building trust.</p>`,
      summaryContent: `<p>Trust is crucial for HRI and depends on transparency, reliability, and anthropomorphism. This chapter covers factors influencing trust and acceptance.</p>`,
      duration: 19,
      imageUrl: '/img/module-7-chapter-4.jpg'
    },
    {
      id: 'module-7-chapter-5',
      moduleId: 'module-7',
      title: 'Collaborative Robotics',
      order: 5,
      lessonContent: `<h2>Collaborative Robotics</h2><p>Collaborative robots (cobots) are designed to work alongside humans in shared workspaces, requiring safety mechanisms and adaptive behaviors.</p><p>This chapter covers safety standards, adaptive control systems, and task allocation strategies that enable safe and efficient human-robot collaboration.</p>`,
      summaryContent: `<p>Collaborative robots work safely alongside humans. This chapter covers safety systems, adaptive controls, and task allocation strategies.</p>`,
      duration: 21,
      imageUrl: '/img/module-7-chapter-5.jpg'
    },
    {
      id: 'module-7-chapter-6',
      moduleId: 'module-7',
      title: 'Ethical Considerations in HRI',
      order: 6,
      lessonContent: `<h2>Ethical Considerations in HRI</h2><p>As robots become more prevalent in human environments, ethical considerations regarding privacy, autonomy, and robot rights become increasingly important.</p><p>This chapter examines ethical frameworks for HRI design, privacy concerns with data collection, and the societal impact of widespread robot adoption in human environments.</p>`,
      summaryContent: `<p>Ethical HRI considerations include privacy, autonomy, and societal impact. This chapter examines frameworks for ethical robot design and deployment.</p>`,
      duration: 23,
      imageUrl: '/img/module-7-chapter-6.jpg'
    }
  ];
};
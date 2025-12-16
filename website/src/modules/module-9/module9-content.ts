import { Chapter } from '../../types/module';

export const getModule9Content = (): Chapter[] => {
  return [
    {
      id: 'module-9-chapter-1',
      moduleId: 'module-9',
      title: 'Ethics in AI Robotics',
      order: 1,
      lessonContent: `<h2>Ethics in AI Robotics</h2><p>As robots become more autonomous and integrated into society, ethical considerations become increasingly important for ensuring beneficial outcomes for humanity.</p><p>This chapter examines ethical frameworks for AI and robotics, including accountability, transparency, and fairness. It discusses the impact of autonomous systems on society and human dignity.</p>`,
      summaryContent: `<p>Ethics in AI robotics addresses accountability, transparency, and fairness. This chapter examines frameworks for ensuring beneficial societal outcomes.</p>`,
      duration: 20,
      imageUrl: '/img/module-9-chapter-1.jpg'
    },
    {
      id: 'module-9-chapter-2',
      moduleId: 'module-9',
      title: 'Privacy and Data Protection',
      order: 2,
      lessonContent: `<h2>Privacy and Data Protection</h2><p>Robots collect vast amounts of data about their environments and users, raising significant privacy concerns that must be addressed in system design.</p><p>This chapter covers data minimization, consent mechanisms, and privacy-preserving technologies. It includes discussion of regulations like GDPR that apply to robotic systems.</p>`,
      summaryContent: `<p>Robots collect significant user data raising privacy concerns. This chapter covers data protection mechanisms and regulatory compliance requirements.</p>`,
      duration: 18,
      imageUrl: '/img/module-9-chapter-2.jpg'
    },
    {
      id: 'module-9-chapter-3',
      moduleId: 'module-9',
      title: 'Safety and Security',
      order: 3,
      lessonContent: `<h2>Safety and Security</h2><p>Safety in robotics involves preventing harm to humans and the environment, while security involves protecting systems from malicious attacks.</p><p>This chapter examines safety standards, risk assessment methodologies, and security measures. It addresses the challenge of balancing safety and security with system functionality and user experience.</p>`,
      summaryContent: `<p>Safety prevents harm while security prevents malicious attacks. This chapter covers standards, risk assessment, and security measures for robotics.</p>`,
      duration: 21,
      imageUrl: '/img/module-9-chapter-3.jpg'
    },
    {
      id: 'module-9-chapter-4',
      moduleId: 'module-9',
      title: 'Autonomous Systems and Accountability',
      order: 4,
      lessonContent: `<h2>Autonomous Systems and Accountability</h2><p>As robots become more autonomous, determining accountability for their actions becomes complex, involving designers, manufacturers, operators, and the systems themselves.</p><p>This chapter discusses legal frameworks for autonomous systems, liability distribution, and the challenges of attributing responsibility when autonomous robots cause harm.</p>`,
      summaryContent: `<p>Autonomous systems complicate accountability. This chapter covers legal frameworks and liability distribution for robotic systems.</p>`,
      duration: 23,
      imageUrl: '/img/module-9-chapter-4.jpg'
    },
    {
      id: 'module-9-chapter-5',
      moduleId: 'module-9',
      title: 'Bias and Fairness in Robotic Systems',
      order: 5,
      lessonContent: `<h2>Bias and Fairness in Robotic Systems</h2><p>Robots can perpetuate or amplify existing biases in society through biased training data or design choices, leading to unfair treatment of different user groups.</p><p>This chapter examines sources of bias in robotic systems, metrics for fairness, and techniques for developing equitable robotic systems that serve all users fairly.</p>`,
      summaryContent: `<p>Robots can perpetuate societal biases. This chapter examines bias sources and techniques for developing equitable robotic systems.</p>`,
      duration: 19,
      imageUrl: '/img/module-9-chapter-5.jpg'
    },
    {
      id: 'module-9-chapter-6',
      moduleId: 'module-9',
      title: 'Responsible Innovation in Robotics',
      order: 6,
      lessonContent: `<h2>Responsible Innovation in Robotics</h2><p>Developing robotic technology responsibly requires considering societal impact throughout the design and deployment process.</p><p>This chapter covers stakeholder engagement, impact assessment, and frameworks for responsible innovation that maximize benefits while minimizing potential negative consequences.</p>`,
      summaryContent: `<p>Responsible innovation considers societal impact throughout design and deployment. This chapter covers stakeholder engagement and impact assessment.</p>`,
      duration: 17,
      imageUrl: '/img/module-9-chapter-6.jpg'
    }
  ];
};
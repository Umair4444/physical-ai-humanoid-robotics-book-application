import { Chapter } from '../../types/module';

export const getModule10Content = (): Chapter[] => {
  return [
    {
      id: 'module-10-chapter-1',
      moduleId: 'module-10',
      title: 'Emerging Technologies in Robotics',
      order: 1,
      lessonContent: `<h2>Emerging Technologies in Robotics</h2><p>The field of robotics continues to evolve rapidly with new technologies enabling capabilities that seemed impossible just years ago.</p><p>This chapter examines cutting-edge technologies including soft robotics, swarm robotics, and bio-hybrid systems that promise to expand the boundaries of what robots can achieve.</p>`,
      summaryContent: `<p>Emerging robotics technologies include soft robotics, swarms, and bio-hybrid systems. These technologies expand robot capabilities and applications.</p>`,
      duration: 19,
      imageUrl: '/img/module-10-chapter-1.jpg'
    },
    {
      id: 'module-10-chapter-2',
      moduleId: 'module-10',
      title: 'Quantum Computing and Robotics',
      order: 2,
      lessonContent: `<h2>Quantum Computing and Robotics</h2><p>Quantum computing has the potential to revolutionize robotics by solving complex optimization problems that are intractable for classical computers.</p><p>This chapter explores potential applications including quantum machine learning for robot perception and quantum algorithms for motion planning and control.</p>`,
      summaryContent: `<p>Quantum computing may solve intractable robotics problems. Applications include optimization, machine learning, and motion planning algorithms.</p>`,
      duration: 21,
      imageUrl: '/img/module-10-chapter-2.jpg'
    },
    {
      id: 'module-10-chapter-3',
      moduleId: 'module-10',
      title: 'Advances in Humanoid Robotics',
      order: 3,
      lessonContent: `<h2>Advances in Humanoid Robotics</h2><p>Humanoid robots continue to advance with improvements in actuation, control, and AI that bring us closer to truly human-like robots.</p><p>This chapter examines recent advances in humanoid locomotion, manipulation, and interaction, along with the challenges that remain for widespread deployment.</p>`,
      summaryContent: `<p>Humanoid robotics advances in locomotion, manipulation, and interaction. This chapter examines recent progress and remaining challenges.</p>`,
      duration: 20,
      imageUrl: '/img/module-10-chapter-3.jpg'
    },
    {
      id: 'module-10-chapter-4',
      moduleId: 'module-10',
      title: 'Swarm Robotics',
      order: 4,
      lessonContent: `<h2>Swarm Robotics</h2><p>Swarm robotics draws inspiration from collective behavior in nature to create systems with emergent capabilities from simple individual agents.</p><p>This chapter covers coordination algorithms, communication strategies, and applications where decentralized systems outperform centralized approaches.</p>`,
      summaryContent: `<p>Swarm robotics creates emergent capabilities from simple agents. This chapter covers coordination algorithms and decentralized system applications.</p>`,
      duration: 22,
      imageUrl: '/img/module-10-chapter-4.jpg'
    },
    {
      id: 'module-10-chapter-5',
      moduleId: 'module-10',
      title: 'Robotics in Space Exploration',
      order: 5,
      lessonContent: `<h2>Robotics in Space Exploration</h2><p>Robots have been essential for space exploration, from lunar rovers to Mars exploration missions, extending human presence to distant worlds.</p><p>This chapter examines the unique challenges of space robotics, including extreme environments, communication delays, and autonomous operation requirements.</p>`,
      summaryContent: `<p>Space robotics extends human presence to distant worlds. Challenges include extreme environments, communication delays, and autonomous operation.</p>`,
      duration: 18,
      imageUrl: '/img/module-10-chapter-5.jpg'
    },
    {
      id: 'module-10-chapter-6',
      moduleId: 'module-10',
      title: 'Future of Robotics and Society',
      order: 6,
      lessonContent: `<h2>Future of Robotics and Society</h2><p>As robotics technology continues advancing, it will increasingly shape society, economy, and human interaction.</p><p>This chapter synthesizes the course material and explores future scenarios, societal implications, and the role of robotics in addressing global challenges like aging populations and environmental sustainability.</p>`,
      summaryContent: `<p>The future of robotics will shape society and address global challenges. This chapter synthesizes course material and explores future scenarios.</p>`,
      duration: 24,
      imageUrl: '/img/module-10-chapter-6.jpg'
    }
  ];
};
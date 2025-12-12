import { Chapter } from '../../types/module';

export const getModule6Content = (): Chapter[] => {
  return [
    {
      id: 'module-6-chapter-1',
      moduleId: 'module-6',
      title: 'Machine Learning in Robotics',
      order: 1,
      lessonContent: `<h2>Machine Learning in Robotics</h2><p>Machine learning enables robots to improve their performance through experience, adapt to new environments, and handle tasks that are difficult to program explicitly.</p><p>Supervised learning is used for perception tasks, reinforcement learning for control, and unsupervised learning for pattern discovery. This chapter establishes the foundation for ML applications in robotics.</p>`,
      summaryContent: `<p>Machine learning enables robot adaptation and performance improvement through experience. Applications range from perception to control using various learning paradigms.</p>`,
      duration: 18,
      imageUrl: '/img/module-6-chapter-1.jpg'
    },
    {
      id: 'module-6-chapter-2',
      moduleId: 'module-6',
      title: 'Supervised Learning for Perception',
      order: 2,
      lessonContent: `<h2>Supervised Learning for Perception</h2><p>Supervised learning is widely applied to robotic perception tasks like object recognition, scene classification, and sensor data interpretation.</p><p>Convolutional neural networks excel at visual recognition, while recurrent networks handle temporal sensor data. This chapter covers training data requirements and validation methods for robotic applications.</p>`,
      summaryContent: `<p>Supervised learning is applied to perception tasks like object recognition. CNNs and RNNs are particularly effective for visual and temporal data respectively.</p>`,
      duration: 20,
      imageUrl: '/img/module-6-chapter-2.jpg'
    },
    {
      id: 'module-6-chapter-3',
      moduleId: 'module-6',
      title: 'Reinforcement Learning for Control',
      order: 3,
      lessonContent: `<h2>Reinforcement Learning for Control</h2><p>Reinforcement learning (RL) is particularly well-suited for robotic control as it learns control policies through trial and error interaction with the environment.</p><p>Deep RL methods like DQN and policy gradient methods have shown success on complex robotic tasks. This chapter covers the challenges of applying RL to physical robots.</p>`,
      summaryContent: `<p>Reinforcement learning learns control policies through environment interaction. Deep RL methods like DQN are effective for complex robotic tasks.</p>`,
      duration: 22,
      imageUrl: '/img/module-6-chapter-3.jpg'
    },
    {
      id: 'module-6-chapter-4',
      moduleId: 'module-6',
      title: 'Imitation Learning',
      order: 4,
      lessonContent: `<h2>Imitation Learning</h2><p>Imitation learning enables robots to learn from demonstrations, making it possible to transfer human skills to robotic systems.</p><p>Behavioral cloning and inverse reinforcement learning are key approaches. Imitation learning can accelerate learning compared to pure reinforcement learning and provide safe exploration.</p>`,
      summaryContent: `<p>Imitation learning transfers human skills to robots through demonstrations. Approaches include behavioral cloning and inverse reinforcement learning.</p>`,
      duration: 19,
      imageUrl: '/img/module-6-chapter-4.jpg'
    },
    {
      id: 'module-6-chapter-5',
      moduleId: 'module-6',
      title: 'Transfer Learning in Robotics',
      order: 5,
      lessonContent: `<h2>Transfer Learning in Robotics</h2><p>Transfer learning leverages knowledge gained from one task or robot to improve learning on related tasks or different robot platforms.</p><p>This chapter discusses domain adaptation, sim-to-real transfer, and few-shot learning techniques that help robots acquire new skills more efficiently.</p>`,
      summaryContent: `<p>Transfer learning leverages existing knowledge for new tasks, including domain adaptation and sim-to-real transfer for efficient skill acquisition.</p>`,
      duration: 21,
      imageUrl: '/img/module-6-chapter-5.jpg'
    },
    {
      id: 'module-6-chapter-6',
      moduleId: 'module-6',
      title: 'Safety in Learning-Based Robotics',
      order: 6,
      lessonContent: `<h2>Safety in Learning-Based Robotics</h2><p>Safety is paramount when applying learning algorithms to physical robots that operate near humans and valuable equipment.</p><p>This chapter covers constrained learning, safe exploration techniques, and verification methods that ensure learning-based robotic systems meet safety requirements.</p>`,
      summaryContent: `<p>Safety in learning-based robotics requires constrained learning, safe exploration, and verification to meet safety requirements for physical robots.</p>`,
      duration: 17,
      imageUrl: '/img/module-6-chapter-6.jpg'
    }
  ];
};
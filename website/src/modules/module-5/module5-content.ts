import { Chapter } from '../../types/module';

export const getModule5Content = (): Chapter[] => {
  return [
    {
      id: 'module-5-chapter-1',
      moduleId: 'module-5',
      title: 'Control Theory Basics',
      order: 1,
      lessonContent: `<h2>Control Theory Basics</h2><p>Control systems are essential for robots to achieve desired behaviors in the presence of disturbances, uncertainties, and dynamic environments.</p><p>This chapter introduces fundamental concepts like feedback control, system modeling, and stability analysis that form the foundation for advanced robotic control.</p>`,
      summaryContent: `<p>Control systems enable robots to achieve desired behaviors through feedback and system modeling. This chapter covers fundamental control theory concepts.</p>`,
      duration: 16,
      imageUrl: '/img/module-5-chapter-1.jpg'
    },
    {
      id: 'module-5-chapter-2',
      moduleId: 'module-5',
      title: 'PID Controllers',
      order: 2,
      lessonContent: `<h2>PID Controllers</h2><p>Proportional-Integral-Derivative (PID) controllers are the workhorse of control systems, widely used due to their simplicity and effectiveness for many robotic applications.</p><p>This chapter covers PID tuning methods, limitations, and modifications like feedforward control that enhance performance in robotic systems.</p>`,
      summaryContent: `<p>PID controllers are widely used in robotics due to simplicity and effectiveness. This chapter covers tuning methods and performance enhancements.</p>`,
      duration: 18,
      imageUrl: '/img/module-5-chapter-2.jpg'
    },
    {
      id: 'module-5-chapter-3',
      moduleId: 'module-5',
      title: 'Adaptive Control',
      order: 3,
      lessonContent: `<h2>Adaptive Control</h2><p>Adaptive control systems adjust their parameters in response to changing conditions or uncertainties in the system model, making them suitable for robotic systems with variable loads or changing dynamics.</p><p>This chapter explores model reference adaptive control and self-tuning regulators, with applications to robotic manipulators and mobile robots.</p>`,
      summaryContent: `<p>Adaptive control adjusts parameters in response to changing conditions. Applications include robotic manipulators with variable loads and changing dynamics.</p>`,
      duration: 20,
      imageUrl: '/img/module-5-chapter-3.jpg'
    },
    {
      id: 'module-5-chapter-4',
      moduleId: 'module-5',
      title: 'Optimal Control',
      order: 4,
      lessonContent: `<h2>Optimal Control</h2><p>Optimal control determines control policies that minimize a specific cost function, enabling robots to perform tasks efficiently in terms of energy, time, or other performance metrics.</p><p>Techniques like LQR (Linear Quadratic Regulator) and model predictive control are widely used in robotics for their optimality properties and robustness.</p>`,
      summaryContent: `<p>Optimal control minimizes cost functions for efficient robot performance. Techniques include LQR and model predictive control for robustness.</p>`,
      duration: 22,
      imageUrl: '/img/module-5-chapter-4.jpg'
    },
    {
      id: 'module-5-chapter-5',
      moduleId: 'module-5',
      title: 'Nonlinear Control',
      order: 5,
      lessonContent: `<h2>Nonlinear Control</h2><p>Many robotic systems exhibit nonlinear behavior that cannot be adequately controlled using linear techniques. Nonlinear control methods exploit the system's structure for improved performance.</p><p>Backstepping, sliding mode control, and feedback linearization are powerful techniques for controlling complex robotic systems with nonlinear dynamics.</p>`,
      summaryContent: `<p>Nonlinear control exploits system structure for improved performance in robots with nonlinear dynamics. Techniques include backstepping and sliding mode control.</p>`,
      duration: 24,
      imageUrl: '/img/module-5-chapter-5.jpg'
    },
    {
      id: 'module-5-chapter-6',
      moduleId: 'module-5',
      title: 'Learning-Based Control',
      order: 6,
      lessonContent: `<h2>Learning-Based Control</h2><p>Learning-based control approaches combine traditional control theory with machine learning to adapt to unknown dynamics and improve performance through experience.</p><p>Reinforcement learning techniques, neural network controllers, and iterative learning control are increasingly important for complex robotic tasks where traditional methods are insufficient.</p>`,
      summaryContent: `<p>Learning-based control combines traditional methods with ML to adapt to unknown dynamics. Includes reinforcement learning and neural network controllers.</p>`,
      duration: 21,
      imageUrl: '/img/module-5-chapter-6.jpg'
    }
  ];
};
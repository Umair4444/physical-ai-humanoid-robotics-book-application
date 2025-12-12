import { Chapter } from '../../types/module';

export const getModule1Content = (): Chapter[] => {
  return [
    {
      id: 'module-1-chapter-1',
      moduleId: 'module-1',
      title: 'History and Evolution of Robotics',
      order: 1,
      lessonContent: `
        <h2>History and Evolution of Robotics</h2>
        <p>Robotics has a rich history that dates back to ancient civilizations, where myths and mechanical devices first sparked imagination about artificial beings. However, the modern robotics era began in the early 20th century with the term "robot" being coined by Czech writer Karel Čapek in his 1920 play "R.U.R. (Rossum's Universal Robots".</p>
        <p>The 1950s marked a significant turning point with the development of the first industrial robots. George Devol created the first programmable robot, called Unimate, in 1954. This was followed by Joseph Engelberger, who developed the first industrial robot arm in 1961, which was used in a General Motors plant.</p>
        <p>The evolution of robotics has been driven by advances in computing, materials science, and artificial intelligence. The 1980s saw the introduction of microprocessor-controlled robots, while the 1990s brought about more sophisticated mobile robots and early human-robot interaction systems.</p>
        <p>Today's robotics landscape is characterized by autonomous systems, AI integration, and collaborative robots (cobots) that work alongside humans. The field continues to evolve rapidly with applications ranging from manufacturing and healthcare to space exploration and domestic assistance.</p>
      `,
      summaryContent: `
        <p>The history of robotics spans from ancient concepts to modern AI-integrated systems. Key milestones include the term "robot" (1920s), first industrial robots (1950s-60s), and AI integration (modern era).</p>
      `,
      duration: 15,
      imageUrl: '/img/module-1-chapter-1.jpg'
    },
    {
      id: 'module-1-chapter-2',
      moduleId: 'module-1',
      title: 'Fundamentals of AI in Robotics',
      order: 2,
      lessonContent: `
        <h2>Fundamentals of AI in Robotics</h2>
        <p>Artificial Intelligence (AI) and robotics are deeply interconnected. AI provides the cognitive capabilities that allow robots to perceive, reason, and act in complex environments. The integration of AI has transformed robots from simple programmable machines to sophisticated autonomous systems.</p>
        <p>Perception is a critical component where AI enables robots to interpret sensory data. Computer vision allows robots to recognize objects, people, and environments. Machine learning algorithms help robots to adapt to new situations and improve their performance over time.</p>
        <p>Planning and control systems powered by AI enable robots to navigate through complex environments, avoid obstacles, and execute multi-step tasks. Reinforcement learning and other AI techniques allow robots to learn from experience and optimize their behavior.</p>
        <p>Modern applications include autonomous vehicles, robotic surgery systems, and service robots that can understand natural language commands. The synergy between AI and robotics continues to enable increasingly sophisticated and capable robotic systems.</p>
      `,
      summaryContent: `
        <p>AI provides cognitive capabilities for robotics, enabling perception, reasoning, and adaptive behavior. Applications range from autonomous vehicles to robotic surgery.</p>
      `,
      duration: 20,
      imageUrl: '/img/module-1-chapter-2.jpg'
    },
    {
      id: 'module-1-chapter-3',
      moduleId: 'module-1',
      title: 'Sensors and Perception in Robotics',
      order: 3,
      lessonContent: `
        <h2>Sensors and Perception in Robotics</h2>
        <p>Sensors are the eyes, ears, and sensory organs of robots, providing crucial data about the internal state of the robot and its external environment. Effective sensing is fundamental to robot autonomy and interaction with the world.</p>
        <p>Vision sensors (cameras) are among the most important, enabling robots to identify objects, navigate spaces, and interpret visual information. Advanced computer vision techniques allow robots to recognize patterns, understand scenes, and react to visual stimuli.</p>
        <p>Tactile sensors provide information about touch, pressure, and texture, essential for manipulation tasks. Proximity sensors detect nearby objects, while range finders measure distances to obstacles. IMUs (Inertial Measurement Units) provide information about robot orientation and motion.</p>
        <p>Integration of multiple sensor types through sensor fusion creates a more complete understanding of the environment. AI algorithms process and interpret sensor data, enabling robots to make informed decisions based on their perceptions.</p>
      `,
      summaryContent: `
        <p>Sensors provide crucial environmental data for robots. Key types include vision, tactile, proximity, and IMU sensors. Sensor fusion and AI integration enable informed decision-making.</p>
      `,
      duration: 18,
      imageUrl: '/img/module-1-chapter-3.jpg'
    },
    {
      id: 'module-1-chapter-4',
      moduleId: 'module-1',
      title: 'Actuators and Movement Systems',
      order: 4,
      lessonContent: `
        <h2>Actuators and Movement Systems</h2>
        <p>Actuators are the components that enable robots to move and interact with their environment. They convert energy (usually electrical, hydraulic, or pneumatic) into mechanical motion, forming the basis of robot mobility and manipulation.</p>
        <p>Electric motors are the most common actuators in robotics, offering precise control and varied configurations. Servomotors and stepper motors provide accurate positioning, while DC motors offer simplicity and speed control. Gear systems modify the motor output for different force and speed requirements.</p>
        <p>Hydraulic and pneumatic actuators provide high force-to-weight ratios, making them suitable for heavy-duty applications. However, they require more complex control systems and can be less precise than electric actuators.</p>
        <p>Biomimetic actuators, such as artificial muscles, represent emerging technologies that could revolutionize robot mobility. These systems aim to replicate the efficiency and adaptability of biological movement systems.</p>
      `,
      summaryContent: `
        <p>Actuators enable robot movement by converting energy to mechanical motion. Common types include electric motors, hydraulic, and pneumatic systems. Emerging technologies include artificial muscles.</p>
      `,
      duration: 22,
      imageUrl: '/img/module-1-chapter-4.jpg'
    },
    {
      id: 'module-1-chapter-5',
      moduleId: 'module-1',
      title: 'Control Systems and Algorithms',
      order: 5,
      lessonContent: `
        <h2>Control Systems and Algorithms</h2>
        <p>Control systems are the brain of robotic systems, processing sensor data and generating actuator commands to achieve desired behaviors. They bridge the gap between perception and action in robotic systems.</p>
        <p>Classical control methods like PID (Proportional-Integral-Derivative) controllers are widely used for simple, stable systems. They provide reliable control for predictable environments and well-modeled systems.</p>
        <p>Modern robotics increasingly relies on adaptive control, where the controller adjusts its parameters based on changing conditions. Model Predictive Control (MPC) uses predictive models to optimize control inputs over a future time horizon.</p>
        <p>Learning-based control methods, including reinforcement learning and neural network controllers, are becoming more prevalent as they can handle complex, non-linear systems where traditional methods struggle. These systems can improve their performance over time through experience.</p>
      `,
      summaryContent: `
        <p>Control systems process sensor data and generate actuator commands. Approaches range from classical PID control to modern learning-based methods that improve through experience.</p>
      `,
      duration: 25,
      imageUrl: '/img/module-1-chapter-5.jpg'
    },
    {
      id: 'module-1-chapter-6',
      moduleId: 'module-1',
      title: 'Human-Robot Interaction',
      order: 6,
      lessonContent: `
        <h2>Human-Robot Interaction</h2>
        <p>Human-Robot Interaction (HRI) is a multidisciplinary field focusing on how humans and robots communicate and collaborate. As robots become more prevalent in daily life, effective HRI is crucial for safety, efficiency, and user acceptance.</p>
        <p>Communication modalities include visual interfaces, audio feedback, and gesture recognition. Natural language processing allows robots to understand and respond to spoken commands, making them more accessible to non-technical users.</p>
        <p>Social robotics explores how robots can recognize and respond to human emotions, intentions, and social cues. This involves complex AI systems that can interpret facial expressions, voice tones, and body language.</p>
        <p>Trust and acceptance are critical factors in HRI. Robots must be predictable, transparent in their intentions, and respectful of human autonomy. Ethical considerations are prominent in HRI design to ensure robots enhance rather than replace human capabilities.</p>
      `,
      summaryContent: `
        <p>Human-Robot Interaction involves communication methods, social awareness, and trust-building. Key challenges include natural language understanding and ethical design considerations.</p>
      `,
      duration: 20,
      imageUrl: '/img/module-1-chapter-6.jpg'
    }
  ];
};
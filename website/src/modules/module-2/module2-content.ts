import { Chapter } from '../../types/module';

export const getModule2Content = (): Chapter[] => {
  return [
    {
      id: 'module-2-chapter-1',
      moduleId: 'module-2',
      title: 'Robotics Hardware Components',
      order: 1,
      lessonContent: `
        <h2>Robotics Hardware Components</h2>
        <p>Robotic systems are built upon a foundation of hardware components that work together to enable perception, processing, and action. Understanding these components is crucial for designing, building, and maintaining robots.</p>
        <p>The mechanical structure of a robot provides the framework that supports all other components. This includes the chassis, joints, and mounting points for various subsystems. Materials selection affects weight, strength, durability, and cost.</p>
        <p>Power systems supply energy to all components. Batteries are common for mobile robots, with lithium-ion being the prevalent choice due to energy density and rechargeability. Power management systems regulate voltage and current to protect components.</p>
        <p>Processing units, from microcontrollers to powerful computers, execute control algorithms and process sensor data. The choice of processor depends on computational requirements, power constraints, and environmental conditions.</p>
      `,
      summaryContent: `
        <p>Robotic hardware includes mechanical structures, power systems, processing units, and integration components. Component selection affects performance, durability, and functionality.</p>
      `,
      duration: 18,
      imageUrl: '/img/module-2-chapter-1.jpg'
    },
    {
      id: 'module-2-chapter-2',
      moduleId: 'module-2',
      title: 'Electronic Systems for Robotics',
      order: 2,
      lessonContent: `
        <h2>Electronic Systems for Robotics</h2>
        <p>Electronic systems form the nervous system of robotic platforms, connecting sensors, actuators, and processors to enable coordinated behavior. Proper electronic design is essential for robot reliability and performance.</p>
        <p>Circuit design must consider power requirements, signal integrity, and electromagnetic compatibility. Power distribution networks must efficiently deliver electricity while minimizing losses and voltage drops.</p>
        <p>Communication buses like CAN, I2C, and SPI connect various components. Each has advantages in terms of speed, distance, and complexity. The choice depends on specific requirements and constraints.</p>
        <p>Protection circuits safeguard against overcurrent, overvoltage, and reverse polarity. These systems prevent damage from electrical faults that could cause system failures or safety hazards.</p>
      `,
      summaryContent: `
        <p>Electronic systems connect robot components through power distribution, communication buses, and protection circuits. Proper design ensures reliability and safety.</p>
      `,
      duration: 20,
      imageUrl: '/img/module-2-chapter-2.jpg'
    },
    {
      id: 'module-2-chapter-3',
      moduleId: 'module-2',
      title: 'Motor Controllers and Drivers',
      order: 3,
      lessonContent: `
        <h2>Motor Controllers and Drivers</h2>
        <p>Motor controllers and drivers are critical interfaces between low-power control signals and high-power motor systems. They enable precise control of motor speed, direction, and torque.</p>
        <p>H-bridge circuits allow bidirectional control of DC motors. PWM (Pulse Width Modulation) signals control motor speed by adjusting the duty cycle of power delivery. Advanced controllers include feedback systems for precise positioning.</p>
        <p>Stepper motor drivers provide precise angular control by sequencing electrical pulses to motor windings. Microstepping increases resolution but may reduce torque at low speeds.</p>
        <p>Brushless DC motor controllers require more complex electronics to commutate the motor phases. These systems offer higher efficiency and longer life compared to brushed motors.</p>
      `,
      summaryContent: `
        <p>Motor controllers interface between control signals and motors. Technologies include H-bridges for DC motors, stepper drivers, and brushless controllers.</p>
      `,
      duration: 19,
      imageUrl: '/img/module-2-chapter-3.jpg'
    },
    {
      id: 'module-2-chapter-4',
      moduleId: 'module-2',
      title: 'Robotic Manipulation Systems',
      order: 4,
      lessonContent: `
        <h2>Robotic Manipulation Systems</h2>
        <p>Manipulation systems enable robots to physically interact with objects in their environment. These systems range from simple grippers to complex anthropomorphic hands with sophisticated control algorithms.</p>
        <p>Parallel jaw grippers provide simple, reliable grasping for objects with appropriate geometry. Vacuum-based grippers are effective for flat, smooth objects. More complex end-effectors may include multiple fingers with tactile sensors.</p>
        <p>Robotic arms use multiple joints to achieve desired positions and orientations. Degrees of freedom determine the range of possible configurations. Kinematic models describe the geometric relationships between joints and end-effector position.</p>
        <p>Force control allows robots to apply precise forces during manipulation tasks. This is crucial for assembly operations, delicate object handling, and safe human-robot interaction.</p>
      `,
      summaryContent: `
        <p>Manipulation systems enable physical interaction with objects. Components include grippers, robotic arms, and force control systems.</p>
      `,
      duration: 23,
      imageUrl: '/img/module-2-chapter-4.jpg'
    },
    {
      id: 'module-2-chapter-5',
      moduleId: 'module-2',
      title: 'Mobile Robot Platforms',
      order: 5,
      lessonContent: `
        <h2>Mobile Robot Platforms</h2>
        <p>Mobile robots are designed to move through their environment to perform tasks. Platform selection affects mobility, stability, and task capabilities.</p>
        <p>Wheeled robots offer efficient movement on smooth surfaces. Configurations include differential drive, Ackermann steering, and omnidirectional platforms. Each has advantages for different applications and environments.</p>
        <p>Tracked robots provide superior traction and stability on rough terrain. They can climb obstacles and traverse loose surfaces where wheeled robots might fail, but typically move more slowly and require more maintenance.</p>
        <p>Legged robots offer maximum terrain adaptability but require complex control systems. Multi-legged platforms provide stability, while bipedal systems are anthropomorphic but challenging to control.</p>
      `,
      summaryContent: `
        <p>Mobile robot platforms include wheeled, tracked, and legged systems. Each configuration offers different mobility and stability characteristics.</p>
      `,
      duration: 21,
      imageUrl: '/img/module-2-chapter-5.jpg'
    },
    {
      id: 'module-2-chapter-6',
      moduleId: 'module-2',
      title: 'Robot Safety Systems',
      order: 6,
      lessonContent: `
        <h2>Robot Safety Systems</h2>
        <p>Safety is paramount in robotic system design, especially as robots operate in closer proximity to humans. Safety systems prevent harm to humans, property, and the robot itself.</p>
        <p>Physical safety features include emergency stops, protective barriers, and fail-safe mechanisms. Emergency stops instantly halt robot motion when activated. Barriers prevent humans from entering hazardous robot workspaces.</p>
        <p>Software safety includes motion limits, error handling, and validation of control commands. Limit checking prevents robots from moving beyond safe operational boundaries.</p>
        <p>Standards like ISO 10218 for industrial robots and ISO 13482 for service robots provide guidelines for safe robot design. Compliance with relevant standards is essential for commercial applications.</p>
      `,
      summaryContent: `
        <p>Robot safety systems include physical features, software checks, and compliance with relevant standards to prevent harm.</p>
      `,
      duration: 17,
      imageUrl: '/img/module-2-chapter-6.jpg'
    }
  ];
};
import { Chapter } from '../../types/module';

export const getModule3Content = (): Chapter[] => {
  return [
    {
      id: 'module-3-chapter-1',
      moduleId: 'module-3',
      title: 'Computer Vision for Robotics',
      order: 1,
      lessonContent: `
        <h2>Computer Vision for Robotics</h2>
        <p>Computer vision enables robots to interpret and understand visual information from cameras and other imaging systems. It is crucial for navigation, object recognition, and interaction with the environment.</p>
        <p>Image acquisition involves cameras with various specifications - resolution, frame rate, and spectral sensitivity. Monocular cameras provide color and intensity information, while stereo cameras add depth perception through parallax.</p>
        <p>Feature detection identifies distinctive elements in images - corners, edges, and blobs. These features enable object recognition, tracking, and spatial understanding. SIFT, SURF, and ORB are common feature detection algorithms.</p>
        <p>Object recognition identifies specific objects within an image. Deep learning approaches using convolutional neural networks have significantly improved recognition accuracy and robustness to variations in lighting and orientation.</p>
      `,
      summaryContent: `
        <p>Computer vision enables robots to interpret visual information. Key components include image acquisition, feature detection, and object recognition.</p>
      `,
      duration: 20,
      imageUrl: '/img/module-3-chapter-1.jpg'
    },
    {
      id: 'module-3-chapter-2',
      moduleId: 'module-3',
      title: 'Sensing Technologies',
      order: 2,
      lessonContent: `
        <h2>Sensing Technologies</h2>
        <p>Robots rely on diverse sensing technologies to perceive their environment. Each sensor type provides unique information, and sensor fusion combines multiple sources for comprehensive understanding.</p>
        <p>LIDAR (Light Detection and Ranging) provides accurate 3D mapping by measuring distances to objects using laser pulses. It is widely used in autonomous vehicles and mobile robotics for navigation and obstacle detection.</p>
        <p>Time-of-flight sensors measure distance by timing light pulses. They provide depth information similar to LIDAR but at lower cost and resolution. Structured light systems project known patterns to calculate depth.</p>
        <p>Thermal imaging detects infrared radiation, revealing temperature variations. This is useful for detecting humans, electrical faults, and environmental conditions not visible in standard imagery.</p>
      `,
      summaryContent: `
        <p>Sensing technologies include LIDAR, time-of-flight sensors, and thermal imaging. Each provides unique environmental information for robotic perception.</p>
      `,
      duration: 18,
      imageUrl: '/img/module-3-chapter-2.jpg'
    },
    {
      id: 'module-3-chapter-3',
      moduleId: 'module-3',
      title: 'Sensor Fusion Techniques',
      order: 3,
      lessonContent: `
        <h2>Sensor Fusion Techniques</h2>
        <p>Sensor fusion combines data from multiple sensors to create a more accurate and reliable understanding of the environment than any single sensor could provide.</p>
        <p>Bayesian filtering, including Kalman and particle filters, provides probabilistic estimates of robot state by combining sensor measurements with motion models. These approaches handle uncertainty and sensor noise effectively.</p>
        <p>Early fusion combines raw sensor data, while late fusion combines processed information. Early fusion may preserve more information but requires synchronization. Late fusion is more modular but may lose information.</p>
        <p>Deep learning approaches use neural networks to learn complex relationships between sensor inputs and environmental states. These methods can handle non-linearities that traditional approaches struggle with.</p>
      `,
      summaryContent: `
        <p>Sensor fusion combines multiple sensor inputs for better environmental understanding. Techniques include Bayesian filtering and deep learning approaches.</p>
      `,
      duration: 22,
      imageUrl: '/img/module-3-chapter-3.jpg'
    },
    {
      id: 'module-3-chapter-4',
      moduleId: 'module-3',
      title: 'Perception in Dynamic Environments',
      order: 4,
      lessonContent: `
        <h2>Perception in Dynamic Environments</h2>
        <p>Dynamic environments present unique challenges for robotic perception. Moving objects, changing lighting conditions, and temporary occlusions require adaptive perception systems.</p>
        <p>Background subtraction techniques identify moving objects by comparing current images to a learned background model. Adaptive background models update slowly to accommodate gradual environmental changes.</p>
        <p>Tracking algorithms maintain identity of objects as they move through the environment. Multiple object tracking algorithms manage identity across occlusions and handle entry/exit of objects from the field of view.</p>
        <p>Change detection identifies environmental modifications. This is important for long-term autonomy where the robot must recognize that its map may be outdated.</p>
      `,
      summaryContent: `
        <p>Dynamic environment perception handles moving objects, changing conditions, and temporary occlusions using background subtraction, tracking, and change detection.</p>
      `,
      duration: 21,
      imageUrl: '/img/module-3-chapter-4.jpg'
    },
    {
      id: 'module-3-chapter-5',
      moduleId: 'module-3',
      title: '3D Mapping and Reconstruction',
      order: 5,
      lessonContent: `
        <h2>3D Mapping and Reconstruction</h2>
        <p>3D mapping creates representations of the environment that enable navigation and interaction. These maps are essential for autonomous robots operating in unknown or partially known spaces.</p>
        <p>Simultaneous Localization and Mapping (SLAM) algorithms build maps while estimating robot position within them. Visual SLAM uses cameras, while LiDAR SLAM uses laser scanners. Each has advantages depending on the environment.</p>
        <p>Voxel mapping divides space into 3D pixels to represent occupancy. Octree representations adapt resolution based on environmental complexity. These approaches balance memory usage with map accuracy.</p>
        <p>Surface reconstruction algorithms create continuous surfaces from point cloud data. These techniques are essential for creating smooth, realistic representations of observed environments.</p>
      `,
      summaryContent: `
        <p>3D mapping techniques include SLAM, voxel mapping, and surface reconstruction for creating environmental representations.</p>
      `,
      duration: 24,
      imageUrl: '/img/module-3-chapter-5.jpg'
    },
    {
      id: 'module-3-chapter-6',
      moduleId: 'module-3',
      title: 'Perception for Human-Robot Interaction',
      order: 6,
      lessonContent: `
        <h2>Perception for Human-Robot Interaction</h2>
        <p>Robots that interact with humans must accurately perceive human behavior, gestures, and intentions. This requires specialized sensing and interpretation algorithms.</p>
        <p>Face detection and recognition algorithms identify and track humans in the environment. These systems provide information about identity, attention direction, and emotional state through facial expressions.</p>
        <p>Gesture recognition interprets human body movements as commands or communication. This includes hand gestures, body pose, and full-body movements that convey meaning to the robot.</p>
        <p>Attention modeling algorithms predict where humans are focusing their attention, helping robots to understand human intent and to direct their own attention appropriately.</p>
      `,
      summaryContent: `
        <p>Human interaction perception includes face recognition, gesture interpretation, and attention modeling to understand human behavior.</p>
      `,
      duration: 19,
      imageUrl: '/img/module-3-chapter-6.jpg'
    }
  ];
};
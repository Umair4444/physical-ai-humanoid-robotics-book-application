import { Chapter } from '../../types/module';

export const getModule4Content = (): Chapter[] => {
  return [
    {
      id: 'module-4-chapter-1',
      moduleId: 'module-4',
      title: 'Motion Planning Fundamentals',
      order: 1,
      lessonContent: `<h2>Motion Planning Fundamentals</h2><p>Motion planning is a critical component of robotics that determines how a robot should move from its current state to a desired goal state while avoiding obstacles and respecting constraints.</p><p>This chapter introduces the fundamental concepts of motion planning, including configuration spaces, collision detection, and basic planning algorithms.</p>`,
      summaryContent: `<p>Motion planning determines how robots move from current to goal states while avoiding obstacles. This chapter covers configuration spaces and basic planning algorithms.</p>`,
      duration: 17,
      imageUrl: '/img/module-4-chapter-1.jpg'
    },
    {
      id: 'module-4-chapter-2',
      moduleId: 'module-4',
      title: 'Sampling-Based Planning',
      order: 2,
      lessonContent: `<h2>Sampling-Based Planning</h2><p>Sampling-based planners are effective for high-dimensional motion planning problems where traditional grid-based approaches become computationally infeasible.</p><p>These methods construct a graph in the configuration space by randomly sampling points and connecting them if feasible, enabling efficient pathfinding in complex environments.</p>`,
      summaryContent: `<p>Sampling-based planners efficiently solve high-dimensional motion planning problems by randomly sampling the configuration space and connecting feasible points.</p>`,
      duration: 21,
      imageUrl: '/img/module-4-chapter-2.jpg'
    },
    {
      id: 'module-4-chapter-3',
      moduleId: 'module-4',
      title: 'Optimal Motion Planning',
      order: 3,
      lessonContent: `<h2>Optimal Motion Planning</h2><p>Optimal motion planning extends basic planning to find not just any feasible path, but the best path according to a specific cost function.</p><p>Algorithms like RRT* and PRM* asymptotically converge to optimal solutions, balancing path quality with computational efficiency.</p>`,
      summaryContent: `<p>Optimal motion planning finds the best path according to a cost function. Algorithms like RRT* converge to optimal solutions over time.</p>`,
      duration: 19,
      imageUrl: '/img/module-4-chapter-3.jpg'
    },
    {
      id: 'module-4-chapter-4',
      moduleId: 'module-4',
      title: 'Path Execution and Control',
      order: 4,
      lessonContent: `<h2>Path Execution and Control</h2><p>Planning a path is only the first step; robots must execute the path while adapting to real-world uncertainties and disturbances.</p><p>Tracking controllers adjust robot motion to follow the planned path as closely as possible, while replanning methods adapt when obstacles appear that weren't in the original plan.</p>`,
      summaryContent: `<p>Path execution involves tracking controllers to follow planned paths and replanning when unexpected obstacles appear in the environment.</p>`,
      duration: 20,
      imageUrl: '/img/module-4-chapter-4.jpg'
    },
    {
      id: 'module-4-chapter-5',
      moduleId: 'module-4',
      title: 'Multi-Robot Motion Planning',
      order: 5,
      lessonContent: `<h2>Multi-Robot Motion Planning</h2><p>Planning motion for multiple robots requires coordination to avoid collisions not only with static obstacles but with other robots.</p><p>Approaches range from centralized methods that plan for all robots simultaneously to decentralized methods where robots communicate and negotiate paths.</p>`,
      summaryContent: `<p>Multi-robot motion planning coordinates multiple agents to avoid collisions with each other and static obstacles. Methods range from centralized to decentralized approaches.</p>`,
      duration: 23,
      imageUrl: '/img/module-4-chapter-5.jpg'
    },
    {
      id: 'module-4-chapter-6',
      moduleId: 'module-4',
      title: 'Motion Planning for Manipulation',
      order: 6,
      lessonContent: `<h2>Motion Planning for Manipulation</h2><p>Manipulation tasks require motion planning that considers object interactions, grasping, and dynamic environments where objects move as a result of robot actions.</p><p>These problems often involve planning in hybrid discrete-continuous spaces, where the robot must plan both geometric motion and discrete contact states.</p>`,
      summaryContent: `<p>Manipulation planning considers object interactions and dynamic environments where objects move due to robot actions, requiring hybrid discrete-continuous planning.</p>`,
      duration: 22,
      imageUrl: '/img/module-4-chapter-6.jpg'
    }
  ];
};
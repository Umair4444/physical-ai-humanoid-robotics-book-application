// Define the Book type
export interface Book {
  id: number | string;
  title: string;
  description: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
  href?: string;
  rating?: number;
  price?: number;
}

// All books data
export const allBooks: Book[] = [
  {
    id: 1,
    title: 'Physical AI Humanoid Robotics',
    description: 'Learn the fundamentals of humanoid robotics',
    image: '/img/book1-cover.jpg',
    featured: true,
    tags: ['Physical AI', 'Robotics', 'Humanoid Robotics'],
    href: '/books/physical-ai-humanoid-robotics-book/intro',
  },
  {
    id: 2,
    title: 'Humanoid Design Principles',
    description: 'Deep dive into the design and engineering of humanoid robots',
    image: '/img/book2-cover.jpg',
    featured: true,
    tags: ['Humanoid Design', 'Engineering', 'Robotics'],
    href: '/books/humanoid-design-principles/intro',
  },
  {
    id: 3,
    title: 'Neural Networks in Motion',
    description: 'Explore how neural networks enable complex robotic movements',
    image: '/img/book3-cover.jpg',
    featured: true,
    tags: ['Neural Networks', 'Movement Control', 'AI'],
    href: '/books/neural-networks-in-motion/intro',
  },
  {
    id: 4,
    title: 'Ethics in AI Robotics',
    description: 'Critical examination of ethical considerations in AI-powered robotics',
    image: '/img/book4-cover.jpg',
    featured: true,
    tags: ['Ethics', 'AI', 'Society'],
    href: '/books/ethics-in-ai-robotics/intro',
  },
  {
    id: 5,
    title: 'Physical Computing for Robotics',
    description: 'Understanding sensors, actuators, and control systems in robotic applications',
    image: '/img/book1-cover.jpg',
    featured: false,
    tags: ['Physical Computing', 'Sensors', 'Actuators'],
    href: '/books/physical-computing-for-robotics/intro',
  },
  {
    id: 6,
    title: 'Computer Vision in Robotics',
    description: 'How robots perceive and interpret visual information from their environment',
    image: '/img/book2-cover.jpg',
    featured: false,
    tags: ['Computer Vision', 'Perception', 'AI'],
    href: '/books/computer-vision-in-robotics/intro',
  },
  {
    id: 7,
    title: 'Robotics Simulation Environments',
    description: 'Building and testing robotic systems in virtual environments',
    image: '/img/book3-cover.jpg',
    featured: false,
    tags: ['Simulation', 'Testing', 'Virtual Environments'],
    href: '/books/robotics-simulation-environments/intro',
  },
  {
    id: 8,
    title: 'Manipulation and Grasping',
    description: 'Understanding how robots interact with and manipulate objects',
    image: '/img/book4-cover.jpg',
    featured: false,
    tags: ['Manipulation', 'Grasping', 'Interaction'],
    href: '/books/manipulation-and-grasping/intro',
  },
  {
    id: 9,
    title: 'Locomotion and Mobility',
    description: 'Principles of robot movement and navigation in various terrains',
    image: '/img/book1-cover.jpg',
    featured: false,
    tags: ['Locomotion', 'Navigation', 'Mobility'],
    href: '/books/locomotion-and-mobility/intro',
  },
  {
    id: 10,
    title: 'Human-Robot Interaction',
    description: 'Designing interfaces and behaviors for effective human-robot collaboration',
    image: '/img/book2-cover.jpg',
    featured: false,
    tags: ['Human-Robot Interaction', 'UX', 'Collaboration'],
    href: '/books/human-robot-interaction/intro',
  },
];

// Featured books data (subset of all books)
export const featuredBooks: Book[] = allBooks.filter(book => book.featured);

// Export default
export default { allBooks, featuredBooks };
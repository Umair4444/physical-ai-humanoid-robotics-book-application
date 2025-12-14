import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import MainLayout from '@site/src/components/MainLayout';

// Define the module type
type Module = {
  id: number;
  title: string;
  description: string;
  chapters: Chapter[];
};

type Chapter = {
  id: number;
  title: string;
  description: string;
};

// SVG Icons
const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const ChapterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const AIIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const RobotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
  </svg>
);

const PhysicalAIHumanoidRoboticsBook: React.FC = () => {
  const {siteConfig} = useDocusaurusContext();
  
  // Modules and chapters data for the Physical AI Humanoid Robotics Textbook
  const modules: Module[] = [
    {
      id: 1,
      title: 'Foundations of Physical AI and Humanoid Robotics',
      description: 'Introduction to the core concepts of physical AI and the basics of humanoid robotics',
      chapters: [
        { id: 1, title: 'Introduction to Physical AI and Humanoid Robotics', description: 'Overview of physical AI concepts and the fundamentals of humanoid robotics' },
        { id: 2, title: 'History and Evolution of Humanoid Robots', description: 'A historical perspective on the development of humanoid robots' },
        { id: 3, title: 'Fundamental Principles of Embodied Intelligence', description: 'Understanding how intelligence emerges from physical interaction' },
        { id: 4, title: 'Hardware Components and Architecture', description: 'Key hardware elements that form the basis of humanoid robots' },
        { id: 5, title: 'Software Frameworks and Platforms', description: 'Overview of popular robotics software frameworks' },
        { id: 6, title: 'Applications and Use Cases', description: 'Current and future applications of humanoid robotics' },
      ]
    },
    {
      id: 2,
      title: 'Sensory Systems and Perception',
      description: 'Understanding how humanoid robots perceive and interpret their environment',
      chapters: [
        { id: 1, title: 'Vision Systems and Computer Vision', description: 'Cameras, sensors, and computer vision techniques for humanoid robots' },
        { id: 2, title: 'Tactile Sensing and Haptic Feedback', description: 'Touch sensors and haptic interfaces for humanoid robots' },
        { id: 3, title: 'Audio Processing and Speech Recognition', description: 'Processing sound and spoken language for human-robot interaction' },
        { id: 4, title: 'Proprioception and Balance', description: 'Internal sensing for position, movement, and balance' },
        { id: 5, title: 'Multi-Sensor Fusion', description: 'Combining information from multiple sensors for robust perception' },
        { id: 6, title: 'Environmental Mapping', description: 'Creating representations of the environment for navigation and interaction' },
      ]
    },
    {
      id: 3,
      title: 'Motor Control and Movement',
      description: 'Controlling actuators and achieving coordinated movement in humanoid robots',
      chapters: [
        { id: 1, title: 'Actuator Technologies', description: 'Types of actuators used in humanoid robotics and their properties' },
        { id: 2, title: 'Inverse Kinematics and Motion Planning', description: 'Calculating joint positions for desired end-effector poses' },
        { id: 3, title: 'Dynamic Balance and Stability', description: 'Maintaining balance during locomotion and manipulation' },
        { id: 4, title: 'Walking and Locomotion Patterns', description: 'Algorithms for bipedal walking and other movement patterns' },
        { id: 5, title: 'Manipulation and Grasping', description: 'Controlling arms and hands for object manipulation' },
        { id: 6, title: 'Expressive Gestures and Body Language', description: 'Creating meaningful movements for communication' },
      ]
    },
    {
      id: 4,
      title: 'Learning and Adaptation',
      description: 'Enabling humanoid robots to learn from experience and adapt to new situations',
      chapters: [
        { id: 1, title: 'Machine Learning in Robotics', description: 'Applying ML techniques to robotic problems' },
        { id: 2, title: 'Reinforcement Learning for Robot Control', description: 'Using RL to teach robots complex behaviors' },
        { id: 3, title: 'Imitation Learning and Demonstration', description: 'Learning behaviors through observation and imitation' },
        { id: 4, title: 'Adaptive Control Systems', description: 'Systems that adjust to environmental changes' },
        { id: 5, title: 'Transfer Learning in Physical Systems', description: 'Transferring learned skills between tasks and robots' },
        { id: 6, title: 'Continual Learning and Skill Accumulation', description: 'Accumulating skills over time without forgetting previous ones' },
      ]
    },
    {
      id: 5,
      title: 'Human-Robot Interaction',
      description: 'Designing interfaces and behaviors for effective interaction with humans',
      chapters: [
        { id: 1, title: 'Natural Language Processing', description: 'Enabling verbal communication between humans and robots' },
        { id: 2, title: 'Social Cues and Behavior', description: 'Recognizing and responding appropriately to social signals' },
        { id: 3, title: 'Personality and Character Design', description: 'Creating consistent personality traits for robots' },
        { id: 4, title: 'Trust and Acceptance', description: 'Building trust and gaining acceptance from human users' },
        { id: 5, title: 'Collaborative Task Execution', description: 'Working together with humans on shared tasks' },
        { id: 6, title: 'Cultural Considerations', description: 'Accounting for cultural differences in HRI' },
      ]
    },
    {
      id: 6,
      title: 'Social Robotics and Ethics',
      description: 'Addressing ethical considerations and societal implications of humanoid robots',
      chapters: [
        { id: 1, title: 'Ethics of Humanoid Robotics', description: 'Moral considerations in the design and use of humanoid robots' },
        { id: 2, title: 'Privacy and Security Concerns', description: 'Protecting privacy and securing humanoid robots' },
        { id: 3, title: 'Legal Framework and Responsibility', description: 'Liability and legal issues in human-robot interaction' },
        { id: 4, title: 'Impact on Employment and Society', description: 'Understanding the economic and social impact' },
        { id: 5, title: 'Human Identity and Relationships', description: 'Examining how robots affect human identity and relationships' },
        { id: 6, title: 'Long-term Implications', description: 'Considering the long-term consequences of advanced humanoid robots' },
      ]
    },
    {
      id: 7,
      title: 'Applications in Healthcare and Assistive Robotics',
      description: 'Specialized applications of humanoid robots in healthcare and assistance',
      chapters: [
        { id: 1, title: 'Assistive Technologies for Elderly Care', description: 'Robots supporting elderly individuals in daily activities' },
        { id: 2, title: 'Therapeutic and Rehabilitation Applications', description: 'Robots aiding in recovery and therapy' },
        { id: 3, title: 'Support for Individuals with Disabilities', description: 'Assistive solutions for people with various disabilities' },
        { id: 4, title: 'Surgical Assistance and Medical Procedures', description: 'Precision robots assisting in medical interventions' },
        { id: 5, title: 'Companionship and Mental Health Support', description: 'Addressing loneliness and mental health needs' },
        { id: 6, title: 'Training and Education in Medical Fields', description: 'Robots as teaching aids for medical professionals' },
      ]
    },
    {
      id: 8,
      title: 'Manufacturing and Industrial Robotics',
      description: 'Industrial applications of humanoid and humanoid-like robots',
      chapters: [
        { id: 1, title: 'Collaborative Robotics in Manufacturing', description: 'Safe human-robot collaboration in industrial settings' },
        { id: 2, title: 'Flexible Automation Solutions', description: 'Adaptable robots for variable manufacturing tasks' },
        { id: 3, title: 'Quality Control and Inspection', description: 'Using humanoid robots for precision quality assessment' },
        { id: 4, title: 'Maintenance and Repair Tasks', description: 'Robots performing routine maintenance activities' },
        { id: 5, title: 'Warehouse and Logistics Operations', description: 'Humanoid robots in supply chain management' },
        { id: 6, title: 'Safety and Risk Management', description: 'Ensuring safety in industrial environments' },
      ]
    },
    {
      id: 9,
      title: 'Autonomous Navigation and Mobility',
      description: 'Enabling humanoid robots to move independently in various environments',
      chapters: [
        { id: 1, title: 'Mapping and Localization Techniques', description: 'SLAM and other techniques for spatial awareness' },
        { id: 2, title: 'Path Planning in Dynamic Environments', description: 'Navigating safely in changing conditions' },
        { id: 3, title: 'Obstacle Detection and Avoidance', description: 'Identifying and navigating around obstacles' },
        { id: 4, title: 'Multi-Terrain Navigation', description: 'Moving effectively across different surface types' },
        { id: 5, title: 'Crowd Navigation', description: 'Moving safely among groups of people' },
        { id: 6, title: 'Energy-Efficient Movement Strategies', description: 'Optimizing battery life and operational duration' },
      ]
    },
    {
      id: 10,
      title: 'Future Directions and Advanced Topics',
      description: 'Emerging trends and advanced research areas in humanoid robotics',
      chapters: [
        { id: 1, title: 'Advanced AI Integration', description: 'Next-generation AI approaches for humanoid robots' },
        { id: 2, title: 'Biologically-Inspired Robotics', description: 'Learning from biological systems for improved designs' },
        { id: 3, title: 'Swarm Robotics and Collective Behavior', description: 'Coordinating multiple robots for collective tasks' },
        { id: 4, title: 'Brain-Machine Interfaces', description: 'Direct neural control of humanoid robots' },
        { id: 5, title: 'Quantum Computing in Robotics', description: 'Potential applications of quantum computing to robotics' },
        { id: 6, title: 'The Road to General-Purpose Humanoids', description: 'Challenges and possibilities for truly versatile robots' },
      ]
    }
  ];

  return (
    <MainLayout
      title={`${siteConfig.title} - Physical AI Humanoid Robotics Textbook`}
      description="Complete textbook on Physical AI and Humanoid Robotics">
      <main className="container margin-vert--lg">
        <div className="text-center margin-bottom--lg">
          <div className="hero__icon">
            <AIIcon />
            <RobotIcon />
          </div>
          <h1 className="hero__title">Physical AI Humanoid Robotics Textbook</h1>
          <p className="hero__subtitle">A comprehensive guide to embodied artificial intelligence and humanoid robotics</p>
        </div>

        <div className="text--center margin-bottom--lg">
          <p className="text--large">
            This textbook is structured into 10 comprehensive modules, each containing multiple chapters that 
            progressively build your understanding of physical AI systems and humanoid robotics.
          </p>
        </div>

        <div className="modules-container">
          {modules.map((module, index) => (
            <div 
              key={module.id} 
              className="module-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="module-header">
                <div className="module-icon">
                  <BookIcon />
                </div>
                <div className="module-info">
                  <h3 className="module-title">Module {module.id}: {module.title}</h3>
                  <p className="module-description">{module.description}</p>
                </div>
              </div>
              
              <div className="chapters-list">
                <h4 className="chapters-header">Chapters:</h4>
                <ul className="chapters-ul">
                  {module.chapters.map((chapter) => (
                    <li key={chapter.id} className="chapter-item">
                      <div className="chapter-icon">
                        <ChapterIcon />
                      </div>
                      <div className="chapter-info">
                        <h5 className="chapter-title">Chapter {module.id}.{chapter.id}: {chapter.title}</h5>
                        <p className="chapter-desc">{chapter.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="module-footer">
                <a 
                  href={`/docs/physical-ai-robotics/modules/module-${module.id}/chapter-${module.chapters[0].id}`}
                  className="button button--primary button--lg module-button"
                >
                  Start Reading Module {module.id}
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="note-card">
          <h4 className="note-title">Note:</h4>
          <p className="note-content">
            Each module in this textbook contains detailed explanations, practical examples, exercises, 
            and references for further reading. Navigate through the book using the sidebar menu 
            to access specific chapters in sequential order for optimal learning progression.
          </p>
        </div>
      </main>
      
      <style jsx>{`
        .hero__icon {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .icon {
          width: 3rem;
          height: 3rem;
          color: var(--ifm-color-primary);
        }
        
        .modules-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }
        
        @media (max-width: 768px) {
          .modules-container {
            grid-template-columns: 1fr;
          }
        }
        
        .module-card {
          background: var(--ifm-card-background-color);
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease forwards;
        }
        
        .module-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .module-header {
          padding: 1.5rem;
          background: var(--ifm-color-primary-lightest);
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        
        .module-icon {
          flex-shrink: 0;
          width: 2.5rem;
          height: 2.5rem;
          color: var(--ifm-color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .module-info {
          flex: 1;
        }
        
        .module-title {
          margin: 0 0 0.5rem 0;
          font-size: 1.3rem;
          color: var(--ifm-heading-color);
        }
        
        .module-description {
          margin: 0;
          color: var(--ifm-color-secondary-darkest);
        }
        
        .chapters-list {
          padding: 1.5rem;
          border-bottom: 1px solid var(--ifm-toc-border-color);
        }
        
        .chapters-header {
          margin: 0 0 1rem 0;
          color: var(--ifm-color-primary);
          font-size: 1.1rem;
        }
        
        .chapters-ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        
        .chapter-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px dashed var(--ifm-toc-border-color);
        }
        
        .chapter-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        
        .chapter-icon {
          flex-shrink: 0;
          width: 1.5rem;
          height: 1.5rem;
          color: var(--ifm-color-secondary);
          margin-top: 0.25rem;
        }
        
        .chapter-info {
          flex: 1;
        }
        
        .chapter-title {
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
          font-weight: 600;
        }
        
        .chapter-desc {
          margin: 0;
          color: var(--ifm-color-secondary-darkest);
          font-size: 0.9rem;
        }
        
        .module-footer {
          padding: 1.5rem;
          text-align: center;
        }
        
        .module-button {
          transition: all 0.3s ease;
        }
        
        .module-button:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
        }
        
        .note-card {
          background: var(--ifm-color-info-lightest);
          border-left: 4px solid var(--ifm-color-info);
          border-radius: 0 8px 8px 0;
          padding: 1.5rem;
          margin-top: 2rem;
        }
        
        .note-title {
          margin: 0 0 0.5rem 0;
          color: var(--ifm-color-info-dark);
        }
        
        .note-content {
          margin: 0;
          color: var(--ifm-color-info-darkest);
        }
      `}</style>
    </MainLayout>
  );
};

export default PhysicalAIHumanoidRoboticsBook;
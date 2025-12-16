import { Chapter } from '../../types/module';

export const getModule8Content = (): Chapter[] => {
  return [
    {
      id: 'module-8-chapter-1',
      moduleId: 'module-8',
      title: 'Robotics Applications in Manufacturing',
      order: 1,
      lessonContent: `<h2>Robotics Applications in Manufacturing</h2><p>Manufacturing was the first major application domain for robotics, beginning with simple pick-and-place operations and evolving to complex assembly tasks.</p><p>This chapter covers traditional applications like welding, painting, and material handling, as well as emerging applications in flexible manufacturing and human-robot collaboration lines.</p>`,
      summaryContent: `<p>Manufacturing robotics began with simple operations and evolved to complex assembly. Applications include welding, painting, and collaborative lines.</p>`,
      duration: 17,
      imageUrl: '/img/module-8-chapter-1.jpg'
    },
    {
      id: 'module-8-chapter-2',
      moduleId: 'module-8',
      title: 'Agricultural Robotics',
      order: 2,
      lessonContent: `<h2>Agricultural Robotics</h2><p>Agricultural robots address labor shortages, increase efficiency, and enable precise farming practices that reduce resource consumption.</p><p>Applications include autonomous tractors, harvesting robots, and precision agriculture systems that monitor crop health and apply treatments selectively.</p>`,
      summaryContent: `<p>Agricultural robots address labor shortages and enable precision farming. Applications include autonomous tractors and selective treatment systems.</p>`,
      duration: 19,
      imageUrl: '/img/module-8-chapter-2.jpg'
    },
    {
      id: 'module-8-chapter-3',
      moduleId: 'module-8',
      title: 'Service Robotics',
      order: 3,
      lessonContent: `<h2>Service Robotics</h2><p>Service robots operate in human environments performing tasks that serve humans directly or provide services in commercial settings.</p><p>Applications include cleaning robots, delivery robots, and personal assistants. This chapter covers the unique challenges of operating in unstructured human environments.</p>`,
      summaryContent: `<p>Service robots serve humans directly in human environments. Applications include cleaning, delivery, and personal assistance robots.</p>`,
      duration: 18,
      imageUrl: '/img/module-8-chapter-3.jpg'
    },
    {
      id: 'module-8-chapter-4',
      moduleId: 'module-8',
      title: 'Healthcare Robotics',
      order: 4,
      lessonContent: `<h2>Healthcare Robotics</h2><p>Healthcare robotics spans applications from surgical assistance to rehabilitation, with strict safety and reliability requirements.</p><p>Robotic surgical systems enable minimally invasive procedures, while rehabilitation robots assist in patient recovery. This chapter covers safety standards and regulatory requirements.</p>`,
      summaryContent: `<p>Healthcare robotics includes surgical and rehabilitation applications with strict safety requirements. This chapter covers standards and regulatory requirements.</p>`,
      duration: 22,
      imageUrl: '/img/module-8-chapter-4.jpg'
    },
    {
      id: 'module-8-chapter-5',
      moduleId: 'module-8',
      title: 'Logistics and Warehousing',
      order: 5,
      lessonContent: `<h2>Logistics and Warehousing</h2><p>Logistics robots have revolutionized warehouse operations, enabling faster processing and reduced error rates in e-commerce and distribution centers.</p><p>Applications include autonomous mobile robots (AMRs) for material transport, automated storage and retrieval systems, and robotic packaging solutions.</p>`,
      summaryContent: `<p>Logistics robots have transformed warehousing with AMRs, storage systems, and automated packaging for increased efficiency.</p>`,
      duration: 20,
      imageUrl: '/img/module-8-chapter-5.jpg'
    },
    {
      id: 'module-8-chapter-6',
      moduleId: 'module-8',
      title: 'Exploration and Inspection Robotics',
      order: 6,
      lessonContent: `<h2>Exploration and Inspection Robotics</h2><p>Robots excel in environments that are dangerous or inaccessible to humans, including space, underwater, and disaster zones.</p><p>This chapter covers planetary exploration rovers, underwater inspection robots, and search and rescue systems, highlighting specialized design requirements for extreme environments.</p>`,
      summaryContent: `<p>Exploration robots access dangerous environments like space, underwater, and disaster zones. Specialized designs address extreme environmental challenges.</p>`,
      duration: 21,
      imageUrl: '/img/module-8-chapter-6.jpg'
    }
  ];
};
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './BookNavigation.module.css';

const BookNavigation = () => {
  const modules = [
    { number: 1, title: "Foundations of Physical AI and Humanoid Robotics", path: "/docs/modules/module-1/chapter-1" },
    { number: 2, title: "Advanced Control and Learning in Physical AI", path: "/docs/modules/module-2/chapter-7" },
    { number: 3, title: "Hardware and System Integration in Humanoid Robotics", path: "/docs/modules/module-3/chapter-13" },
    { number: 4, title: "Software Infrastructure and Development Tools", path: "/docs/modules/module-4/chapter-19" },
    { number: 5, title: "Human-Robot Interaction and Social Robotics", path: "/docs/modules/module-5/chapter-25" },
    { number: 6, title: "Motion Control and Locomotion", path: "/docs/modules/module-6/chapter-31" },
    { number: 7, title: "Perception and Sensing Technologies", path: "/docs/modules/module-7/chapter-37" },
    { number: 8, title: "AI and Learning Systems", path: "/docs/modules/module-8/chapter-43" },
    { number: 9, title: "Applications and Deployment", path: "/docs/modules/module-9/chapter-49" },
    { number: 10, title: "Deployment, Economics, and Future Outlook", path: "/docs/modules/module-10/chapter-55" }
  ];

  return (
    <div className={styles.navigation}>
      <h3>Book Modules</h3>
      <div className={styles.moduleList}>
        {modules.map((module) => (
          <div key={module.number} className={styles.moduleItem}>
            <h4>Module {module.number}: {module.title}</h4>
            <Link 
              to={useBaseUrl(module.path)} 
              className={styles.moduleLink}
            >
              Explore Module {module.number}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookNavigation;
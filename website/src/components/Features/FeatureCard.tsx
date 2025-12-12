import type { ReactNode } from 'react';
import clsx from 'clsx';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './FeatureCard.module.css';

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: string;
  color?: string;
};

export default function FeatureCard({
  title,
  description,
  icon = '🤖',
  color = '#2563EB',
}: FeatureCardProps): ReactNode {
  const { isDarkMode } = useTheme();

  const iconStyle = {
    backgroundColor: color,
    color: 'white',
  };

  return (
    <div 
      className={clsx(
        styles.featureCard,
        isDarkMode ? styles.darkMode : styles.lightMode
      )}
    >
      <div className={styles.icon} style={iconStyle}>
        <span className={styles.iconText}>{icon}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
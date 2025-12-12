import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './PricingCard.module.css';

type PricingCardProps = {
  id: string;
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
};

export default function PricingCard({
  id,
  name,
  price,
  features,
  popular = false,
}: PricingCardProps): ReactNode {
  const { isDarkMode } = useTheme();

  return (
    <div 
      className={clsx(
        styles.pricingCard,
        popular && styles.popular,
        isDarkMode ? styles.darkMode : styles.lightMode
      )}
    >
      {popular && (
        <div className={styles.popularTag}>
          Most Popular
        </div>
      )}
      <h3 className={styles.planName}>{name}</h3>
      <div className={styles.price}>{price}</div>
      <ul className={styles.featuresList}>
        {features.map((feature, index) => (
          <li key={index} className={styles.featureItem}>
            <span className={styles.checkmark}>✓</span> {feature}
          </li>
        ))}
      </ul>
      <Link 
        to={`/pricing/${id}`} 
        className={clsx(
          'button',
          popular ? 'button--primary' : 'button--secondary'
        )}
      >
        Get Started
      </Link>
    </div>
  );
}
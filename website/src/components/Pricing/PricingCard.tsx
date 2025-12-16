import type { ReactNode } from 'react';
import clsx from 'clsx';
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

  const handleClick = () => {
    window.location.href = `/pricing/${id}`;
  };

  return (
    <div
      className={clsx(
        styles.pricingCard,
        popular && styles.popular,
        isDarkMode ? styles.darkMode : styles.lightMode,
        'cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1'
      )}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${name} plan - ${price}`}
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
      <div className="mt-auto">
        <button
          className={`mt-6 w-full px-4 py-2 rounded-lg font-semibold transition-colors ${
            popular
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
          }`}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
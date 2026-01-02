import React, { useState } from 'react';
import { useTheme } from '@site/src/contexts/ThemeContext';
import styles from './PricingCard.module.css';

interface PricingTier {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

interface PricingCardProps {
  pricingTiers: PricingTier[];
}

const PricingCard: React.FC<PricingCardProps> = ({ pricingTiers }) => {
  const { isDarkMode } = useTheme();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const getDisplayPrice = (tier: PricingTier) => {
    if (billingCycle === 'annual') {
      const monthlyAmount = tier.annualPrice / 12;
      return `$${monthlyAmount.toFixed(2)}`;
    }
    return `$${tier.monthlyPrice}`;
  };

  return (
    <div className={styles.pricingSection}>
      <div className={styles.sectionTitle}>
        <h1 className={styles.titleGradient}>Pricing Plans</h1>
        <p className={styles.sectionSubtitle}>
          Choose the plan that works best for you. All plans include a free
          14-day trial.
        </p>

        {/* Billing Toggle */}
        <div className={styles.billingToggle}>
          <span className={styles.billingLabel}>Monthly</span>

          <button
            onClick={() =>
              setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')
            }
            className={`relative rounded-full w-16 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 focus:outline-none`}
          >
            <span
              className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-white transition-transform ${billingCycle === 'annual' ? 'left-9' : 'left-1'}`}
            ></span>
          </button>

          <span className={styles.billingLabel}>
            Annual{' '}
            <span className="text-green-500 font-semibold">(Save 20%)</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className={styles.priceCardsGrid}>
        {pricingTiers.map(tier => (
          <div
            key={tier.id}
            className={`${styles.priceCard} ${tier.popular ? styles.priceCardPopular : ''}`}
          >
            {tier.popular && <div className={styles.ribbon}>POPULAR</div>}

            <div className={styles.priceCardHeader}>
              <h3 className={styles.priceCardName}>{tier.name}</h3>
              <p className={styles.priceCardDescription}>{tier.description}</p>

              <div className={styles.priceCardPricing}>
                <div className={styles.priceValue}>
                  <span>{getDisplayPrice(tier)}</span>
                  <span className={styles.pricePeriod}>/month</span>
                </div>

                {billingCycle === 'annual' && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Billed annually at ${tier.annualPrice}
                  </div>
                )}
              </div>
            </div>

            <ul className={styles.priceCardFeatures}>
              {tier.features.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  <svg
                    className={styles.featureIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span className={styles.featureText}>{feature}</span>
                </li>
              ))}
            </ul>

            <div className={styles.priceCardButton}>
              <button
                className={`${styles.pricingButton} ${tier.popular ? styles.pricingButtonPrimary : styles.pricingButtonSecondary}`}
              >
                <span className={styles.pricingButtonText}>{tier.cta}</span>
                <svg
                  className={styles.pricingButtonIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </button>

              {billingCycle === 'annual' && tier.popular && (
                <div className="mt-4 text-center text-green-600 font-semibold">
                  Save $120/year
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCard;
import React, { useState } from 'react';
import { useTheme } from '@site/src/contexts/ThemeContext';
// We'll no longer need the Button component since we're using custom buttons
import styles from './Pricing.module.css';

const Pricing: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(
    'monthly'
  );
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const pricingTiers = [
    {
      id: 'starter',
      name: 'Starter',
      monthlyPrice: 29,
      annualPrice: 290, // $24.17/month billed annually
      description: 'Perfect for students and hobbyists',
      features: [
        'Full textbook access',
        'Basic AI chatbot support',
        'Community forums',
        'Mobile app access',
        'Basic learning analytics',
        'Up to 500MB cloud storage',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      id: 'professional',
      name: 'Professional',
      monthlyPrice: 59,
      annualPrice: 590, // $49.17/month billed annually
      description: 'For professionals and researchers',
      features: [
        'Full textbook access',
        'Priority AI chatbot support',
        'Certification exam',
        'Mobile app access',
        'Advanced learning analytics',
        'Up to 5GB cloud storage',
        'Exclusive content access',
        'Monthly live Q&A sessions',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      monthlyPrice: 99,
      annualPrice: 990, // $82.50/month billed annually
      description: 'For teams and institutions',
      features: [
        'Full textbook access',
        '24/7 AI chatbot support',
        'Certification exam',
        'Mobile app access',
        'Advanced learning analytics',
        'Unlimited cloud storage',
        'Team management & analytics',
        'Custom integrations',
        'Dedicated account manager',
        'Live training sessions',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  // Features for comparison table
  const comparisonFeatures = [
    {
      name: 'Full textbook access',
      starter: true,
      professional: true,
      enterprise: true,
    },
    {
      name: 'AI chatbot support',
      starter: 'Basic',
      professional: 'Priority',
      enterprise: '24/7',
    },
    {
      name: 'Certification exam',
      starter: true,
      professional: true,
      enterprise: true,
    },
    {
      name: 'Mobile app access',
      starter: true,
      professional: true,
      enterprise: true,
    },
    {
      name: 'Learning analytics',
      starter: 'Basic',
      professional: 'Advanced',
      enterprise: 'Advanced',
    },
    {
      name: 'Cloud storage',
      starter: '500MB',
      professional: '5GB',
      enterprise: 'Unlimited',
    },
    {
      name: 'Community forums',
      starter: true,
      professional: true,
      enterprise: true,
    },
    {
      name: 'Priority support',
      starter: false,
      professional: true,
      enterprise: true,
    },
    {
      name: 'Live Q&A sessions',
      starter: false,
      professional: 'Monthly',
      enterprise: 'Weekly',
    },
    {
      name: 'Team management',
      starter: false,
      professional: false,
      enterprise: true,
    },
    {
      name: 'Account manager',
      starter: false,
      professional: false,
      enterprise: 'Dedicated',
    },
    {
      name: 'Custom integrations',
      starter: false,
      professional: false,
      enterprise: true,
    },
    {
      name: 'Free trial',
      starter: false,
      professional: true,
      enterprise: 'Consultation',
    },
  ];

  const getDisplayPrice = (tier: (typeof pricingTiers)[0]) => {
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

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg mb-20 w-full">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <h3 className="text-3xl font-bold text-center">
            Detailed Plan Comparison
          </h3>
        </div>

        <table className="w-full table-fixed border-collapse">
          <colgroup>
            <col className="w-6/12" />
            <col className="w-2/12" />
            <col className="w-6/12" />
            <col className="w-6/12" />
          </colgroup>

          <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}>
            <tr>
              <th className="py-4 px-6 text-left font-semibold">Features</th>
              <th className="py-4 px-6 text-center font-semibold">Starter</th>
              <th className="py-4 px-6 text-center font-semibold">
                Professional
              </th>
              <th className="py-4 px-6 text-center font-semibold">
                Enterprise
              </th>
            </tr>
          </thead>

          <tbody>
            {comparisonFeatures.map((feature, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? isDarkMode
                      ? 'bg-gray-800'
                      : 'bg-white'
                    : isDarkMode
                      ? 'bg-gray-900'
                      : 'bg-gray-50'
                }
              >
                <td
                  className={`py-4 px-6 font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                >
                  {feature.name}
                </td>

                <td className={styles.comparisonCell}>
                  {feature.starter === true
                    ? '✓'
                    : feature.starter === false
                      ? '—'
                      : feature.starter}
                </td>

                <td className={styles.comparisonCell}>
                  {feature.professional === true
                    ? '✓'
                    : feature.professional === false
                      ? '—'
                      : feature.professional}
                </td>

                <td className={styles.comparisonCell}>
                  {feature.enterprise === true
                    ? '✓'
                    : feature.enterprise === false
                      ? '—'
                      : feature.enterprise}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQ Section */}
      <div className={styles.faqSection}>
        <h3 className={styles.faqTitle}>Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div className={styles.faqItem}>
            <button
              className={styles.faqQuestion}
              onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
              aria-expanded={openFaqIndex === 0}
            >
              <span>Can I change plans later?</span>
              <svg
                className={`w-5 h-5 ml-2 transform ${openFaqIndex === 0 ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {openFaqIndex === 0 && (
              <div className={styles.faqAnswer}>
                Yes, you can upgrade, downgrade, or cancel your subscription
                anytime. Changes will take effect at the end of your billing
                cycle.
              </div>
            )}
          </div>

          <div className={styles.faqItem}>
            <button
              className={styles.faqQuestion}
              onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
              aria-expanded={openFaqIndex === 1}
            >
              <span>Is there a free trial available?</span>
              <svg
                className={`w-5 h-5 ml-2 transform ${openFaqIndex === 1 ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {openFaqIndex === 1 && (
              <div className={styles.faqAnswer}>
                Yes, all plans come with a 14-day free trial. No credit card
                required. If you decide to cancel during the trial, you won't be
                charged.
              </div>
            )}
          </div>

          <div className={styles.faqItem}>
            <button
              className={styles.faqQuestion}
              onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}
              aria-expanded={openFaqIndex === 2}
            >
              <span>What payment methods do you accept?</span>
              <svg
                className={`w-5 h-5 ml-2 transform ${openFaqIndex === 2 ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {openFaqIndex === 2 && (
              <div className={styles.faqAnswer}>
                We accept all major credit cards including Visa, Mastercard,
                American Express, and Discover. Enterprise customers can also
                pay via invoice.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

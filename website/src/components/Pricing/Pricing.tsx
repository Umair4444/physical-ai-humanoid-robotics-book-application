import React, { useState } from 'react';
import { useTheme } from '@site/src/contexts/ThemeContext';
import PricingCard from './PricingCard';
import styles from './Pricing.module.css';
import { pricingTiers } from '../../data/pricingtier';

const Pricing: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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

  return (
    <div className={styles.pricingSection}>
      {/* Pricing Cards */}
      <PricingCard pricingTiers={pricingTiers} />

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

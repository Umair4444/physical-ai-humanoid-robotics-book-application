import React, { useState } from 'react';
import { useTheme } from '@site/src/contexts/ThemeContext';
import { Button } from '../Button/Button';

const Pricing: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(
    'monthly'
  );

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

  const getPrice = (tier: (typeof pricingTiers)[0]) => {
    return billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice;
  };

  const getDisplayPrice = (tier: (typeof pricingTiers)[0]) => {
    if (billingCycle === 'annual') {
      const monthlyAmount = tier.annualPrice / 12;
      return `$${monthlyAmount.toFixed(2)}`;
    }
    return `$${tier.monthlyPrice}`;
  };

  return (
    <div className="">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold pb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Pricing Plan
        </h1>
        <p
          className={`text-xl max-w-2xl mx-auto mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          Choose the plan that works best for you. All plans include a free
          14-day trial.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center">
          <span
            className={`mr-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Monthly
          </span>
          <button
            onClick={() =>
              setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')
            }
            className="relative rounded-full w-14 h-7 bg-indigo-600 focus:outline-none"
          >
            <span
              className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-white transition-transform ${billingCycle === 'annual' ? 'left-7' : 'left-0.5'}`}
            ></span>
          </button>
          <span
            className={`ml-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Annual{' '}
            <span className="text-green-500 font-semibold">(Save 20%)</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        {pricingTiers.map(tier => (
          <div
            key={tier.id}
            className={`rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
              tier.popular
                ? 'ring-4 ring-indigo-500 relative'
                : 'ring-1 ring-gray-200 dark:ring-gray-700'
            } ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            {tier.popular && (
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-3">
                <span className="font-bold">Most Popular</span>
              </div>
            )}
            <div className="p-8">
              <h3
                className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              >
                {tier.name}
              </h3>
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">
                    {getDisplayPrice(tier)}
                  </span>
                  <span
                    className={`text-lg ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    {billingCycle === 'annual' ? '/month' : '/month'}
                  </span>
                </div>
                {billingCycle === 'annual' && (
                  <div className="text-sm text-gray-500 mt-1">
                    Billed annually at ${tier.annualPrice}
                  </div>
                )}
              </div>
              <p
                className={`mb-8 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                {tier.description}
              </p>

              <ul className="mb-10 space-y-4">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5"
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
                    <span
                      className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.popular ? 'primary' : 'secondary'}
                size="lg"
                className="w-full py-3 text-lg font-semibold"
              >
                {tier.cta}
              </Button>

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

                <td className="py-4 px-6 text-center">
                  {feature.starter === true
                    ? '✓'
                    : feature.starter === false
                      ? '—'
                      : feature.starter}
                </td>

                <td className="py-4 px-6 text-center">
                  {feature.professional === true
                    ? '✓'
                    : feature.professional === false
                      ? '—'
                      : feature.professional}
                </td>

                <td className="py-4 px-6 text-center">
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
      <div className="mt-20 max-w-3xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h3>
        <div className="space-y-6">
          <div
            className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
          >
            <h4
              className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Can I change plans later?
            </h4>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              Yes, you can upgrade, downgrade, or cancel your subscription
              anytime. Changes will take effect at the end of your billing
              cycle.
            </p>
          </div>
          <div
            className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
          >
            <h4
              className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Is there a free trial available?
            </h4>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              Yes, all plans come with a 14-day free trial. No credit card
              required. If you decide to cancel during the trial, you won't be
              charged.
            </p>
          </div>
          <div
            className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
          >
            <h4
              className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              What payment methods do you accept?
            </h4>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              We accept all major credit cards including Visa, Mastercard,
              American Express, and Discover. Enterprise customers can also pay
              via invoice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

  export const pricingTiers = [
    {
      id: 'starter',
      name: 'Starter',
      monthlyPrice: 0.00,
      annualPrice: 0.00, // $0/month billed annually
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
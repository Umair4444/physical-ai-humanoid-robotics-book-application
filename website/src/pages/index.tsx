import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { useTheme } from '../contexts/ThemeContext';
import styles from './index.module.css';
import BookCard from '../components/BookCard/BookCard';
import { Link } from 'react-router-dom';
import NewsletterSignup from '../components/NewsletterSignup/NewsletterSignup';
import Features from '../components/Features/Features';
import { Button } from '../components/Button/Button';

const HomePage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(
    'monthly'
  );

  // Sample book data
  const books = [
    {
      id: 'book-1',
      title: 'Introduction to AI Robotics',
      description:
        'Learn the fundamentals of artificial intelligence in robotics applications',
      coverImage: '/img/book1-cover.jpg',
      rating: 4.8,
      price: 29.99,
    },
    {
      id: 'book-2',
      title: 'Humanoid Design Principles',
      description:
        'Deep dive into the design and engineering of humanoid robots',
      coverImage: '/img/book2-cover.jpg',
      rating: 4.7,
      price: 39.99,
    },
    {
      id: 'book-3',
      title: 'Neural Networks in Motion',
      description:
        'Explore how neural networks enable complex robotic movements',
      coverImage: '/img/book3-cover.jpg',
      rating: 4.9,
      price: 44.99,
    },
    {
      id: 'book-4',
      title: 'Ethics in AI Robotics',
      description:
        'Critical examination of ethical considerations in AI-powered robotics',
      coverImage: '/img/book4-cover.jpg',
      rating: 4.6,
      price: 34.99,
    },
  ];

  const pricingTiers = [
    {
      id: 'starter',
      name: 'Starter',
      monthlyPrice: 0,
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

  const getDisplayPrice = (tier: (typeof pricingTiers)[0]) => {
    if (billingCycle === 'annual') {
      const monthlyAmount = tier.annualPrice / 12;
      return `$${monthlyAmount.toFixed(2)}`;
    }
    return `$${tier.monthlyPrice}`;
  };

  return (
    <MainLayout
      title="AI Robotics Textbook"
      description="Learn about embodied artificial intelligence and humanoid robotics"
    >
      <div className="w-full">
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroBackground}></div>
          <div className={styles.heroOverlay}></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1
              className={`${styles.heroTitle} text-4xl md:text-6xl lg:text-7xl font-bold mb-6`}
            >
              AI Robotics Textbook
            </h1>
            <p
              className={`${styles.heroSubtitle} text-xl md:text-2xl max-w-3xl mx-auto mb-10`}
              style={{
                color: 'var(--ifm-color-primary)',
              }}
            >
              Learn about embodied artificial intelligence and humanoid robotics
            </p>
            <div
              className={`${styles.heroButtons} flex flex-col sm:flex-row justify-center gap-4`}
            >
              <a
                href="/modules"
                className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${styles.primaryButton}`}
                style={{
                  backgroundColor: 'var(--ifm-color-primary)',
                  color: 'white',
                }}
              >
                Start Learning
              </a>
              <a
                href="/about"
                className="px-8 py-4 rounded-full font-semibold border-2 transition-all duration-300 transform hover:bg-[var(--ifm-color-primary)]/70 hover:scale-105 hover:shadow-lg"
                style={{
                  borderColor: 'var(--ifm-color-primary)',
                  color: 'white',
                }}
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={`${styles.featuresSection} mb-16`}>
          <div className="container mx-auto px-4">
            <h2
              className="text-3xl font-bold mb-10 text-center"
              style={{
                color: 'var(--ifm-color-text)',
              }}
            >
              What You'll Learn
            </h2>
            <div className={styles.featuresGrid}>
              {[
                {
                  title: 'Physical AI',
                  description:
                    'Understanding how AI agents can interact with physical environments',
                  icon: '🤖',
                },
                {
                  title: 'Humanoid Robotics',
                  description:
                    'Designing and controlling humanoid robots with advanced behaviors',
                  icon: '🦾',
                },
                {
                  title: 'Embodied Intelligence',
                  description:
                    'How intelligence emerges from the interaction between mind and body',
                  icon: '🧠',
                },
              ].map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Books Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Featured Books
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {books.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <Features />
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="container pt-4 bg-gray-100 dark:bg-gray-800">
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
                  setBillingCycle(
                    billingCycle === 'monthly' ? 'annual' : 'monthly'
                  )
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 ">
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
                          className={
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }
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
        </section>

        {/* Testimonials Section - Scrolling */}
        <section
          className={`${styles.testimonialsSection} mb-8`}
          id="testimonials"
        >
          <div className="container mx-auto px-4">
            <h2
              className="text-3xl font-bold mb-10 text-center"
              style={{
                color: 'var(--ifm-color-text)',
              }}
            >
              What Students Say
            </h2>
            <div className={styles.testimonialsContainer}>
              <div className={styles.testimonialsTrack}>
                {[
                  {
                    id: 1,
                    quote:
                      'This textbook completely changed my understanding of embodied AI. The practical examples make complex concepts accessible.',
                    author: 'Alex Johnson, Robotics Engineer',
                    avatar: 'AJ',
                  },
                  {
                    id: 2,
                    quote:
                      'The step-by-step approach to humanoid robotics concepts is unmatched. Highly recommended for serious learners.',
                    author: 'Samantha Lee, AI Researcher',
                    avatar: 'SL',
                  },
                  {
                    id: 3,
                    quote:
                      'The combination of theory and practical applications helped me build my first humanoid robot successfully.',
                    author: 'Michael Chen, PhD Student',
                    avatar: 'MC',
                  },
                  {
                    id: 4,
                    quote:
                      'As a professional in the field, I found this book to be the most comprehensive resource on humanoid robotics.',
                    author: 'Dr. Emma Rodriguez, Research Lead',
                    avatar: 'ER',
                  },
                  {
                    id: 5,
                    quote:
                      'The interactive exercises and simulations made learning complex AI concepts much more engaging and intuitive.',
                    author: 'James Wilson, Software Developer',
                    avatar: 'JW',
                  },
                  {
                    id: 6,
                    quote:
                      'Finally, a textbook that bridges the gap between academic research and real-world applications in robotics.',
                    author: 'Priya Sharma, AI Specialist',
                    avatar: 'PS',
                  },
                  // Repeat testimonials to create continuous scrolling effect
                  {
                    id: 7,
                    quote:
                      'The depth of information is incredible. I refer back to this book regularly in my research work.',
                    author: 'David Park, AI Professor',
                    avatar: 'DP',
                  },
                  {
                    id: 8,
                    quote:
                      'As a beginner in robotics, this book provided the perfect foundation with practical, real-world examples.',
                    author: 'Lisa Thompson, Undergraduate Student',
                    avatar: 'LT',
                  },
                  {
                    id: 9,
                    quote:
                      'The advanced concepts are explained in a way that makes them accessible without oversimplifying.',
                    author: 'Robert Zhang, PhD Candidate',
                    avatar: 'RZ',
                  },
                ].map(testimonial => (
                  <div
                    key={testimonial.id}
                    className={`${styles.testimonialCard} transform transition-transform duration-300 hover:scale-105`}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-3">
                        {testimonial.avatar}
                      </div>
                      <p
                        style={{
                          color: 'var(--ifm-color-primary)',
                          fontWeight: 'bold',
                        }}
                      >
                        {testimonial.author}
                      </p>
                    </div>
                    <p
                      className="mb-4 italic"
                      style={{
                        color: 'var(--ifm-color-text)',
                      }}
                    >
                      "{testimonial.quote}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup Section */}
        <section className="pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <NewsletterSignup />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of students and professionals learning about the
              future of robotics.
            </p>
            <Link
              to="/signup"
              className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Create Free Account
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default HomePage;

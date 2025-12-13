import React from 'react';
import MainLayout from '../components/MainLayout';
import { useTheme } from '../contexts/ThemeContext';
import PricingCard from '../components/Pricing/PricingCard';
import ScrollTopButton from '../components/ScrollButton/ScrollTopButton';
import styles from './index.module.css';

const HomePage: React.FC = () => {
  const { theme } = useTheme();

  // Define pricing plans
  const pricingPlans = [
    {
      id: 'free',
      name: 'Free Access',
      price: '$0',
      features: [
        'Access to first 2 chapters',
        'Basic learning materials',
        'Community support',
        'Weekly updates',
      ],
    },
    {
      id: 'pro',
      name: 'Pro Access',
      price: '$29.99/mo',
      features: [
        'Full textbook access',
        'Interactive exercises',
        'Priority support',
        'Early access to new content',
        'Progress tracking',
      ],
      popular: true,
    },
    {
      id: 'premium',
      name: 'Premium Access',
      price: '$59.99/mo',
      features: [
        'Complete course materials',
        'One-on-one mentorship',
        'Certificate of completion',
        'Career guidance',
        'Custom learning paths',
      ],
    },
  ];

  return (
    <MainLayout
      title="AI Robotics Textbook"
      description="Learn about embodied artificial intelligence and humanoid robotics"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{
              color: 'var(--ifm-color-primary)',
            }}
          >
            AI Robotics Textbook
          </h1>
          <p
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-10"
            style={{
              color: 'var(--ifm-color-text',
            }}
          >
            Learn about embodied artificial intelligence and humanoid robotics
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/modules"
              className="px-6 py-3 rounded-full font-semibold transition-colors"
              style={{
                backgroundColor: 'var(--ifm-color-primary)',
                color: 'white',
              }}
            >
              Start Learning
            </a>
            <a
              href="/about"
              className="px-6 py-3 rounded-full font-semibold border transition-colors"
              style={{
                borderColor: 'var(--ifm-color-primary)',
                color: 'var(--ifm-color-primary)',
              }}
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-10 text-center"
            style={{
              color: 'var(--ifm-color-text)',
            }}
          >
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div
                key={index}
                className="p-6 rounded-xl shadow-lg"
                style={{
                  backgroundColor: 'var(--ifm-card-background-color)',
                }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{
                    color: 'var(--ifm-color-primary)',
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    color: 'var(--ifm-color-text-light)',
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mb-16" id="pricing">
          <h2
            className="text-3xl font-bold mb-10 text-center"
            style={{
              color: 'var(--ifm-color-text)',
            }}
          >
            Choose Your Learning Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map(plan => (
              <div
                key={plan.id}
                className="transform transition-transform duration-300 hover:scale-[1.02]"
              >
                <PricingCard
                  id={plan.id}
                  name={plan.name}
                  price={plan.price}
                  features={plan.features}
                  popular={plan.popular || false}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section - Scrolling */}
        <section className={`${styles.testimonialsSection} mb-16`} id="testimonials">
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
              ].map((testimonial) => (
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
        </section>
      </div>
      <ScrollTopButton />
    </MainLayout>
  );
};

export default HomePage;

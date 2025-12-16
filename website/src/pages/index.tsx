import React from 'react';
import MainLayout from '../components/MainLayout';
import { useTheme } from '../contexts/ThemeContext';
import PricingCard from '../components/Pricing/PricingCard';
import styles from './index.module.css';
import BookCard from '../components/BookCard/BookCard';
import { Link } from 'react-router-dom';
import NewsletterSignup from '../components/NewsletterSignup/NewsletterSignup';
import Features from '../components/Features/Features';

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

        {/* Pricing Section */}
        <section className="mb-16" id="pricing">
          <div className="container mx-auto px-4">
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

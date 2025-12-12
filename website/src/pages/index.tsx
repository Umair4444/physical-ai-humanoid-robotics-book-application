import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import { useLanguage } from '../contexts/LanguageContext';
import BookCard from '../components/Book/BookCard';
import TestimonialCard from '../components/Testimonials/TestimonialCard';
import PricingCard from '../components/Pricing/PricingCard';
import FeatureCard from '../components/Features/FeatureCard';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { language, t } = useLanguage();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Start Learning - Physical AI & Humanoid Robotics
          </Link>
        </div>
      </div>
    </header>
  );
}

// Books section component
function BooksSection() {
  const { t } = useLanguage();

  // Mock data for the 4 books as mentioned in the spec
  const books = [
    {
      id: 1,
      title: 'Introduction to Physical AI',
      description: 'Foundational concepts and principles of Physical AI systems',
      image: '/img/book1.jpg',
      tags: ['Beginner', 'Foundations'],
    },
    {
      id: 2,
      title: 'Humanoid Robotics Fundamentals',
      description: 'Design, mechanics, and control systems for humanoid robots',
      image: '/img/book2.jpg',
      tags: ['Mechanics', 'Control Systems'],
    },
    {
      id: 3,
      title: 'AI for Embodied Systems',
      description: 'Machine learning techniques for robots with physical form',
      image: '/img/book3.jpg',
      tags: ['AI', 'Machine Learning'],
    },
    {
      id: 4,
      title: 'Advanced Humanoid Control',
      description: 'Advanced control algorithms and implementation strategies',
      image: '/img/book4.jpg',
      tags: ['Advanced', 'Algorithms'],
    },
  ];

  return (
    <section className={styles.booksSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Featured Books
        </Heading>
        <div className={styles.booksGrid}>
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              description={book.description}
              image={book.image}
              tags={book.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials section component
function TestimonialsSection() {
  const { t } = useLanguage();

  // Mock data for testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Robotics Engineer',
      content: 'This textbook transformed my understanding of Physical AI and humanoid systems. The practical examples and clear explanations made complex concepts accessible.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Alex Chen',
      role: 'AI Researcher',
      content: 'The most comprehensive resource on humanoid robotics I\'ve encountered. The AI integration concepts are cutting-edge and well-explained.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      role: 'Graduate Student',
      content: 'As a student, I found the book approachable yet thorough. The lesson/summary format makes studying very efficient.',
      rating: 4,
    },
  ];

  return (
    <section className={styles.testimonialsSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          What Learners Say
        </Heading>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing section component
function PricingSection() {
  const { t } = useLanguage();

  const tiers = [
    {
      id: 'free',
      name: 'Starter',
      price: '$0',
      features: [
        'Access to first 2 modules',
        'Basic content access',
        'Community support',
      ],
      popular: false,
    },
    {
      id: 'standard',
      name: 'Student',
      price: '$49',
      features: [
        'Access to all 10 modules',
        'Lesson and summary views',
        'Progress tracking',
        'Email support',
      ],
      popular: true,
    },
    {
      id: 'premium',
      name: 'Professional',
      price: '$99',
      features: [
        'All Student features',
        'RAG Chatbot access',
        'Interactive exercises',
        'Priority support',
        'Certificate of completion',
      ],
      popular: false,
    },
  ];

  return (
    <section className={styles.pricingSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Subscription Tiers
        </Heading>
        <div className={styles.pricingGrid}>
          {tiers.map((tier) => (
            <PricingCard
              key={tier.id}
              id={tier.id}
              name={tier.name}
              price={tier.price}
              features={tier.features}
              popular={tier.popular}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Features section component
function FeaturesSection() {
  const { t } = useLanguage();

  // Features related to physical AI and humanoid robotics
  const features = [
    {
      id: 1,
      title: 'Physical AI Fundamentals',
      description: 'Learn how AI systems can interact with the physical world through sensors and actuators.',
      icon: '🧠',
      color: '#2563EB',
    },
    {
      id: 2,
      title: 'Humanoid Design Principles',
      description: 'Explore the biomechanics and control systems that make humanoid robots possible.',
      icon: '🦾',
      color: '#7C3AED',
    },
    {
      id: 3,
      title: 'Embodied Intelligence',
      description: 'Discover how embodiment affects learning and intelligence in robotic systems.',
      icon: '🤖',
      color: '#0F172A',
    },
    {
      id: 4,
      title: 'Adaptive Control Systems',
      description: 'Master the algorithms that allow robots to adapt to changing environments.',
      icon: '⚙️',
      color: '#0F766E',
    },
  ];

  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Key Concepts
        </Heading>
        <div className={styles.featuresGrid}>
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Physical AI Humanoid Robotics Textbook - Learn about embodied artificial intelligence and humanoid robotics">
      <HomepageHeader />
      <main>
        <BooksSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
      </main>
    </Layout>
  );
}

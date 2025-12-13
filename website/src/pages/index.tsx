import React from 'react';
import MainLayout from '../components/MainLayout';
import { useTheme } from '../contexts/ThemeContext';

const HomePage: React.FC = () => {
  const { theme } = useTheme();

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

        {/* Testimonials Section */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-10 text-center"
            style={{
              color: 'var(--ifm-color-text)',
            }}
          >
            What Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                quote:
                  'This textbook completely changed my understanding of embodied AI. The practical examples make complex concepts accessible.',
                author: 'Alex Johnson, Robotics Engineer',
              },
              {
                quote:
                  'The step-by-step approach to humanoid robotics concepts is unmatched. Highly recommended for serious learners.',
                author: 'Samantha Lee, AI Researcher',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: 'var(--ifm-card-background-color)',
                }}
              >
                <p
                  className="mb-4 italic"
                  style={{
                    color: 'var(--ifm-color-text',
                  }}
                >
                  "{testimonial.quote}"
                </p>
                <p
                  style={{
                    color: 'var(--ifm-color-text-light)',
                  }}
                >
                  - {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default HomePage;

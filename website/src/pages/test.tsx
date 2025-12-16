import React from 'react';
import MainLayout from '../components/MainLayout';

const TestPage: React.FC = () => {
  return (
    <MainLayout title="Test Page - AI Robotics Textbook" description="Test page to validate custom components">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <h1 
            className="text-3xl md:text-4xl font-bold"
            style={{
              color: 'var(--ifm-color-text)',
            }}
          >
            Test Page
          </h1>
          <p 
            className="text-lg mt-2"
            style={{
              color: 'var(--ifm-color-text-light)',
            }}
          >
            This page validates our custom components implementation
          </p>
        </header>
        
        <main>
          <section className="mb-12">
            <h2 
              className="text-2xl font-semibold mb-4"
              style={{
                color: 'var(--ifm-color-text)',
              }}
            >
              Theme Switching Test
            </h2>
            <p 
              style={{
                color: 'var(--ifm-color-text-light)',
              }}
            >
              Use the theme toggle in the header to switch between light and dark modes. 
              The colors below should change appropriately based on the selected theme.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 
              className="text-2xl font-semibold mb-4"
              style={{
                color: 'var(--ifm-color-text)',
              }}
            >
              Responsive Components Test
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className="p-6 rounded-xl shadow-lg"
                style={{
                  backgroundColor: 'var(--ifm-card-background-color)',
                }}
              >
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{
                    color: 'var(--ifm-color-primary)',
                  }}
                >
                  Card Component
                </h3>
                <p 
                  style={{
                    color: 'var(--ifm-color-text-light)',
                  }}
                >
                  This card component should adapt to the selected theme and resize responsively.
                </p>
              </div>
              
              <div 
                className="p-6 rounded-xl shadow-lg"
                style={{
                  backgroundColor: 'var(--ifm-card-background-color)',
                }}
              >
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{
                    color: 'var(--ifm-color-primary)',
                  }}
                >
                  Responsive Grid
                </h3>
                <p 
                  style={{
                    color: 'var(--ifm-color-text-light)',
                  }}
                >
                  This grid should stack on mobile and become 2 columns on medium screens and above.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 
              className="text-2xl font-semibold mb-4"
              style={{
                color: 'var(--ifm-color-text)',
              }}
            >
              Button Components Test
            </h2>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#"
                className="px-6 py-3 rounded-full font-semibold transition-colors"
                style={{
                  backgroundColor: 'var(--ifm-color-primary)',
                  color: 'white',
                }}
              >
                Primary Button
              </a>
              <a 
                href="#"
                className="px-6 py-3 rounded-full font-semibold border transition-colors"
                style={{
                  borderColor: 'var(--ifm-color-primary)',
                  color: 'var(--ifm-color-primary)',
                }}
              >
                Secondary Button
              </a>
              <a 
                href="#"
                className="px-6 py-3 rounded-full font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 transition-colors"
              >
                Default Button
              </a>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 
              className="text-2xl font-semibold mb-4"
              style={{
                color: 'var(--ifm-color-text)',
              }}
            >
              Typography Test
            </h2>
            <div className="space-y-4">
              <h1 
                style={{
                  color: 'var(--ifm-color-text)',
                }}
              >
                Heading 1 - Should be responsive
              </h1>
              <h2 
                style={{
                  color: 'var(--ifm-color-text)',
                }}
              >
                Heading 2 - Should be responsive
              </h2>
              <h3 
                style={{
                  color: 'var(--ifm-color-text)',
                }}
              >
                Heading 3 - Should be responsive
              </h3>
              <p 
                className="text-lg"
                style={{
                  color: 'var(--ifm-color-text',
                }}
              >
                Large body text - This paragraph should have appropriate line height and spacing.
              </p>
              <p 
                style={{
                  color: 'var(--ifm-color-text-light)',
                }}
              >
                Regular body text - This paragraph has lighter text color for secondary information.
              </p>
            </div>
          </section>
        </main>
      </div>
    </MainLayout>
  );
};

export default TestPage;
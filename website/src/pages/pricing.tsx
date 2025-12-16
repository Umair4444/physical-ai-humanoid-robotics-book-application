import React from 'react';
import Pricing from '@site/src/components/Pricing/Pricing';
import MainLayout from '../components/MainLayout';

const PricingPage: React.FC = () => {
  return (
    <MainLayout
      title="Pricing"
      description="Physical AI Humanoid Robotics Textbook - Choose the plan that works for you"
    >
      <section className="container mx-auto px-4 py-8  mb-12">
        <Pricing />
      </section>
    </MainLayout>
  );
};

export default PricingPage;

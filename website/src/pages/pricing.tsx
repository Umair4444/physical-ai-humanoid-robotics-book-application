import React from 'react';
import Pricing from '@site/src/components/Pricing/Pricing';
import MainLayout from '../components/MainLayout';

const PricingPage: React.FC = () => {
  return (
    <MainLayout
      title="Pricing"
      description="Physical AI Humanoid Robotics Textbook - Choose the plan that works for you"
    >
      <section className="w-full mx-auto">
        <Pricing />
      </section>
    </MainLayout>
  );
};

export default PricingPage;

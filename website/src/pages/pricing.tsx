import React from 'react';
import Layout from '@theme/Layout';
import Pricing from '@site/src/components/Pricing/Pricing';

const PricingPage: React.FC = () => {
  return (
    <Layout
      title="Pricing"
      description="Physical AI Humanoid Robotics Textbook - Choose the plan that works for you"
    >
      <section className="container mx-auto px-4 py-8 my-20 mb-12">
        <Pricing />
      </section>
    </Layout>
  );
};

export default PricingPage;

import React from 'react';
import { UnifiedHeader } from '@site/src/components/Navigation';

// Using the unified Header component to replace the default Docusaurus Navbar
const CustomNavbar: React.FC = () => {
  return <UnifiedHeader />;
};

export default CustomNavbar;

import React from 'react';

module.exports = ({ to, children, ...props }) => {
  return React.createElement('a', { href: to, ...props }, children);
};
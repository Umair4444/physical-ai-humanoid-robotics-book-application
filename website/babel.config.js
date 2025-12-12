module.exports = {
  presets: [
    ['@docusaurus/core/lib/babel/preset', {
      // Specify the React version to use
      runtime: 'automatic', // Use the new JSX transform
    }],
    ['@babel/preset-env', {targets: {node: 'current'}}],
    ['@babel/preset-react', {
      runtime: 'automatic', // Use the new JSX transform
    }],
    '@babel/preset-typescript',
  ],
};
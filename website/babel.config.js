module.exports = {
  presets: [
    '@docusaurus/core/lib/babel/preset',
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
// @ts-check

/** @type {import('@docusaurus/types').PluginModule} */
const path = require('path');

module.exports = function pluginTailwindConfig(context, options) {
  return {
    name: 'tailwind-config',
    
    configurePostCss(postcssOptions) {
      // Appends the Tailwind and Autoprefixer plugins to the PostCSS options
      // Check if @tailwindcss/postcss exists, otherwise use tailwindcss directly
      let tailwindPlugin;
      try {
        tailwindPlugin = require('@tailwindcss/postcss')(path.resolve(__dirname, '../../tailwind.config.js'));
      } catch (e) {
        // Fallback to using tailwindcss directly if @tailwindcss/postcss is not available
        tailwindPlugin = require('tailwindcss')(path.resolve(__dirname, '../../tailwind.config.js'));
      }

      postcssOptions.plugins.push(
        tailwindPlugin,
        require('autoprefixer')(),
      );
      return postcssOptions;
    },
  };
};
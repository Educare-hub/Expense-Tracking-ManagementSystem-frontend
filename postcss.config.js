// postcss.config.cjs
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},  // ← THIS IS THE NEW PLUGIN (not 'tailwindcss')
    autoprefixer: {},
  },
};
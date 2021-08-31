module.exports = {
  'src/**/*.{js,jsx,vue,ts,tsx}': ['eslint --fix', 'git add'],
  'src/**/*.{html,vue,css,sass,scss}': ['stylelint --fix', 'git add'],
};

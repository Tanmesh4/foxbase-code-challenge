/** @type {import('tailwindcss').Config} */
const customTheme = require('./tailwind.theme.js');
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    ...customTheme.theme,
  },
  plugins: [],
}


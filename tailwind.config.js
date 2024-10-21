/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: { colors: { white: '#ffffff', black: '#121212' } },
  },
  plugins: [],
};

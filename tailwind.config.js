/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        black: '#000000',
        darkGray: '#333333',
        lightGray: '#f5f5f5',
        blue: '#007bff',
        hotPink: '#ff69b4',
      },
    },
  },
  plugins: [],
};

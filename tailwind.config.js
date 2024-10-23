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
        darkHotPink: '#ff3da8',
        red: '#ff0000',
      },
      boxShadow: {
        'custom-dark':
          '0 6px 8px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.4)',
        'custom-dark-hover':
          '4px 10px 15px -3px rgba(0, 0, 0, 0.5), 8px 4px 6px -2px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};

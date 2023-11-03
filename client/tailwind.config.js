/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        foreground: 'var(--foreground);',
        background: 'var(--background);',
        'background-secondary': 'var(--background-secondary)',
        accent: { 600: '#9333ea' },
      },
    },
  },
  plugins: [],
};

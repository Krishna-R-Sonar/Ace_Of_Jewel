/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Add custom colors for your jewelry shop theme
        'gold': '#FFD700',
        'silver': '#C0C0C0',
      },
      fontFamily: {
        // custom font for an elegant look
        sans: ['Open Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}


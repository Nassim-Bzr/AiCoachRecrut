/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4F6BFF',
          DEFAULT: '#3851E0',
          dark: '#2538B0',
        },
        secondary: {
          light: '#6CD5CB',
          DEFAULT: '#41C0B7',
          dark: '#339A93',
        },
        neutral: {
          lightest: '#F9FAFB',
          light: '#F1F5F9',
          DEFAULT: '#E2E8F0',
          dark: '#64748B',
          darkest: '#1E293B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 
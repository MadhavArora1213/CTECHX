
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1', // Indigo
          dark: '#4F46E5',
        },
        secondary: {
          DEFAULT: '#EC4899', // Pink
          dark: '#DB2777',
        },
        dark: {
          100: '#1F2937',
          200: '#111827',
          300: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
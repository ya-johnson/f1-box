/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      '2xl': {'min': '1535px'},
      'xl': {'max': '1279px'},
      'lg': {'max': '1023px'},
      'md': {'max': '767px'},
      'sm': {'max': '639px'},
    },
    container: {
      center: true,
      padding: '1rem',
    },
    fontFamily: {
      'Russo-one': ['Russo One', 'sans-serif'],
      'Kanit': ['Kanit', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}
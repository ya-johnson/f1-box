/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true
    },
    fontFamily: {
      'Russo-one': ['Russo One', 'sans-serif'],
      'Kanit': ['Kanit', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}
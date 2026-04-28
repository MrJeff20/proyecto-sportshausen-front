/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sportshausen-red': '#E63946',
        'sportshausen-dark': '#1D1D2B',
        'sportshausen-gold': '#F4A261',
        'sportshausen-yellow': '#FFD166',
        'sportshausen-text': '#2C3E50',
        'sportshausen-light': '#F8F9FA',
      },
      fontFamily: {
        'display': ['Bebas Neue', 'Montserrat', 'sans-serif'],
        'body': ['Inter', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
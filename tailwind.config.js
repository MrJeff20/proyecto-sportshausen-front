/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sportshausen-red':    '#CC1B33',
        'sportshausen-dark':   '#111111',
        'sportshausen-gold':   '#FFD100',
        'sportshausen-yellow': '#FFD100',
        'sportshausen-text':   '#1A1A1A',
        'sportshausen-light':  '#FFF9F2',
      },
      fontFamily: {
        'display': ['Bebas Neue', 'Montserrat', 'sans-serif'],
        'body':    ['Inter', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

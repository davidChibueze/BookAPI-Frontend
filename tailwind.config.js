/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary-color': '#002EA6',
         'normal-blue': '#8EAEFF',
         'black': '#4B4B4B',
      }
    },
  },
  plugins: [],
}

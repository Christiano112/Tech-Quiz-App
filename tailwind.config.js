/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        modal: {
          '0%, 100%' : { 'background-color': 'rgb(236, 72, 153)' },
          '50%': { 'background-color': 'rgb(236, 72, 153, .6)'}
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        }
      },
      animation: {
        modal: 'modal 2s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

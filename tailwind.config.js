/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'fondo': 'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);'
      }
    },
  },
  plugins: [],
}


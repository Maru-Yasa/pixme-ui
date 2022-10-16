/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        md: '3px 3px 0px 0px rgba(0,0,0,1)',
        xl: '7px 7px 0px 0px rgba(0,0,0,1)',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        sakura: "#f9d5e5",
        blossom: "#ffe4e1",
      },
    },
  },
  plugins: [],
}
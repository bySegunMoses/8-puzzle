/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const {nextui} = require("@nextui-org/react");
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        swiss: ['var(--font-swiss)', 'sans-serif'],
        'swiss-bold': ['var(--font-swiss-bold)', 'sans-serif'],
        'swiss-condensed': ['var(--font-swiss-condensed)', 'sans-serif'],
        'arial-bold': ['var(--font-arial-bold)', 'sans-serif'],
        arial: ['var(--font-arial)', 'sans-serif'],
        panton: ['var(--font-panton)', 'sans-serif'],
      },
      colors: {
        primary: '#141415',
        brandColor: '#4D5EF9',
        complementary: '#FF4D4F',
        goldYellow: '#E08F4B',
        secondary: colors.yellow,
        neutral: colors.gray,
      }
    },
  },
  darkMode: "class",
  screens: {
    xs: "350px",
    ss: "620px",
    sm: "768px",
    md: "1060px",
    lg: "1200px",
    xl: "1700px",
  },
  plugins: [nextui()],
};
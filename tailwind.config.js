/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fdf7ed",
          100: "#f9e7cc",
          200: "#f3ce94",
          300: "#ecaf5d",
          400: "#e89437",
          500: "#e07420",
          600: "#c55419",
          700: "#a53a18",
          800: "#862e1a",
          900: "#6e2819",
          950: "#3f1209",
        },
      },
    },
  },
  plugins: [],
};

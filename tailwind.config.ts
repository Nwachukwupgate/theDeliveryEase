/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primaryColor100: "#F4E9F4",
        primaryColor500: "#751F72",
        primaryColor600: "#581756",
        primaryColor700: "#421240",
        primaryColor800: "#330E32",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

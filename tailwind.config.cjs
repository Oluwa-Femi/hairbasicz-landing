/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xsm: { min: "320px", max: "480px" },
      // => @media (min-width: 320px) { ... }
      
      sm: { min: "481px", max: "960px" },
      // => @media (min-width: 481px) { ... }

      md: { min: "961px", max: "1023px" },
      // => @media (min-width: 961px) { ... }

      lg: { min: "1024px", max: "1279px" },
      // => @media (min-width: 1024px) { ... }

      xl: { min: "1280px", max: "1535px" },
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};

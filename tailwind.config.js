/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

delete colors["warmGray"];
delete colors["lightBlue"];
delete colors["trueGray"];
delete colors["coolGray"];
delete colors["blueGray"];

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  important: "#root",
  theme: {
    colors: {
      ...colors,
      "d-zero": "#1D2023",
      "d-one": "#262B32",
      "d-two": "#30373E",
      "d-three": "#3E4750",
      alert: "#FFA217",
      orange: "#FD4F00",
      green: "#005D63",
      primary: "#6f43d8",
      "primary-variant": "#FFA889",
      secondary: "#00A7C0",
      "w-high": "#DDDDDD",
      "w-t30": "rgba(255, 255, 255, 0.3)",
      "w-t60": "rgba(255, 255, 255, 0.6)",
      white: "#FFFFFF",
      red: "#B70B0B",
      blue: "#135D99",
      "light-green": "#54B21A",
    },
    screens: {
      ...defaultTheme.screens,
      "3xl": "1750px",
    },
    extend: {
      boxShadow: {
        "bs-initial": "2px 4px 4px rgba(0, 0, 0, 0.2)",
        "bs-hover": "2px 4px 6px rgba(0, 0, 0, 0.3)",
        "is-active": "inset 2px 2px 10px rgba(150, 150, 150, 0.1)",
        "inner-custom": "inset -5px 5px 10px 1px rgba(150, 150, 150, 0.2)",
      },
      keyframes: {
        ripple: {
          "0%": { width: "0px", height: "0px", opacity: 0.5 },
          "100%": { width: "500px", height: "500px", opacity: 1 },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        opacityCustom: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        timeToReload: {
          "0%": { width: 0, opacity: 0 },
          "100%": { width: "100%", opacity: 0.6 },
        },
        update: {
          "30%": {
            opacity: 0.3,
          },
          "0%, 100%": {
            opacity: 1,
          },
        },
      },
      animation: {
        ripple: "ripple 1s ease 1 forwards",
        wiggle: "wiggle 1s ease-in-out infinite",
        opacityCustom: "opacityCustom 0.5s ease-in-out",
        timeToReload: "timeToReload 20s ease infinite",
        update: "update 1s ease-in-out",
      },
    },
  },
  plugins: [],
};

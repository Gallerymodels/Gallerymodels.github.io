/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    colors: {
      gray: "#555656",
      white: "#FFFFFF",
      black: "#000000",
    },
    extend: {
      fontFamily: {
        dejaRegular: ["Regular"],
        dejaLight: ["Light"],
        dejaBold: ["Bold"],
      },
    },
  },
  plugins: [],
};

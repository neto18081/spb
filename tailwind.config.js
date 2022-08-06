/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: [
    "./pages/**/*.js",
    "./pages/*.js",
    "./components/**/*.js",
    "./components/*.js",
  ],

  theme: {
    extend: {
      colors: {
        black: "#35363A",
        white: "#eeeeee",
        green: "#509099",
        gold: "#C0965C",
      },
    },
  },
  plugins: [],
};

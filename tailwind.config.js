/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        transform: "transform",
        "border-color": "border-color",
        color: "color",
        background: "background",
      },
      transitionDuration: {
        300: ".3s",
      },
      transitionTimingFunction: {
        "cubic-bezier": "cubic-bezier(.25,.01,.25,1)",
      },
      transitionDelay: {
        0: "0s",
      },
    },
  },
  plugins: [],
};

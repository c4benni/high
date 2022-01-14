const theme = require("./tailwind.theme.js");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme,
  variants: {
    extend: {
      textOpacity: ["dark"],
      backgroundOpacity: ["dark"],
      borderOpacity: ["dark"],
      ringOpacity: ["dark"],
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
  important: true,
};

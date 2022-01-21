const colors = require("tailwindcss/colors");

module.exports = {
  screens: {
    xxs: "0",
    xs: "349px",
    sm: "599px",
    md: "959px",
    lg: "1279px",
    xl: "1919px",
  },
  colors: {
    primary: colors.indigo,
    secondary: colors.cyan,
    gray: colors.stone,
    "true-gray": colors.neutral,
    white: colors.white,
    black: colors.black,
    success: colors.green,
    warning: colors.amber,
    error: colors.red,
    info: colors.blue,
  },
  extend: {
    zIndex: {
      1: "1",
    },
    gridTemplateRows: {
      "[auto,auto,1fr]": "auto auto 1fr",
    },
    spacing: {
      128: "32rem",
      144: "36rem",
    },
    borderRadius: {
      xs: "1.5px",
      sm: "3px",
      md: "6px",
      lg: "12px",
      xl: "18px",
    },
  },
};

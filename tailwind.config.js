// const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // serif: [...defaultTheme.fontFamily.serif],
      },
      borderWidth: {
        1: "1px",
      },
      maxHeight: {
        "3/4": "75vh",
      },
      inset: {
        "-53": "-53%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}

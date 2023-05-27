// const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./api/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
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

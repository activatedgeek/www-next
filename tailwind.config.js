const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  // @NOTE https://github.com/tailwindlabs/tailwindcss-typography/issues/26.
  important: true,
  purge: {
    content: [
      "./components/**/*.{js,ts,jsx,tsx}",
      "./lib/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    options: {
      whitelist: [],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        "3/4": "75vh",
      },
      inset: {
        "-53": "-53%",
      },
      fontFamily: {
        serif: ['"Lora"', ...defaultTheme.fontFamily.serif],
        sans: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}

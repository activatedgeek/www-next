import colors from "tailwindcss/colors"

module.exports = {
  content: [
    "./api/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        link: colors.blue[600],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              fontFamily: "serif",
            },
            h2: {
              fontFamily: "serif",
            },
            h3: {
              fontFamily: "serif",
            },
            h4: {
              fontFamily: "serif",
            },
            summary: {
              cursor: "pointer",
              borderWidth: theme("borderWidth.1"),
              borderRadius: theme("borderRadius.md"),
              boxShadow: theme("boxShadow.sm"),
              paddingLeft: theme("padding.4"),
              paddingRight: theme("padding.4"),
              paddingTop: theme("padding.2"),
              paddingBottom: theme("padding.2"),
            },
            figcaption: {
              textAlign: "center",
            },
            img: {
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: theme("borderRadius.md"),
              boxShadow: theme("boxShadow.md"),
            },
            a: {
              fontWeight: "normal",
              textDecoration: "none",
              color: theme("colors.blue.600"),
            },
            blockquote: {
              fontWeight: "normal",
            },
            pre: {
              borderWidth: theme("borderWidth.4"),
              borderRadius: theme("borderRadius.md"),
              boxShadow: theme("boxShadow.md"),
            },
            "div.math-display": {
              overflow: "auto",
            },
            "section.footnotes": {
              borderTopWidth: theme("borderWidth.1"),
              padding: theme("padding.3"),
              backgroundColor: theme("colors.zinc.50"),
            },
            "p.hint": {
              borderRadius: theme("borderRadius.md"),
              padding: theme("padding.2"),
            },
            "p.hint.tip": {
              backgroundColor: theme("colors.green.100"),
            },
            "p.hint.warn": {
              backgroundColor: theme("colors.yellow.100"),
            },
            "p.hint.error": {
              backgroundColor: theme("colors.red.100"),
            },
          },
        },
      }),
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

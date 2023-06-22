import colors from "tailwindcss/colors"
import defaultTheme from "tailwindcss/defaultTheme"

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
      fontFamily: {
        sans: ["var(--font-assistant)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-ss4)", ...defaultTheme.fontFamily.serif],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              fontFamily: "var(--font-ss4)",
              fontWeight: theme("fontWeight.semibold"),
            },
            h2: {
              fontFamily: "var(--font-ss4)",
              fontWeight: theme("fontWeight.medium"),
            },
            h3: {
              fontFamily: "var(--font-ss4)",
              fontWeight: theme("fontWeight.medium"),
            },
            h4: {
              fontFamily: "var(--font-ss4)",
              fontWeight: theme("fontWeight.medium"),
            },
            details: {
              display: "inline-block",
              maxWidth: theme("maxWidth.full"),
              borderWidth: theme("borderWidth.1"),
              borderRadius: theme("borderRadius.lg"),
              paddingLeft: theme("padding.4"),
              paddingRight: theme("padding.4"),
              paddingTop: theme("padding.1"),
              paddingBottom: theme("padding.1"),
            },
            summary: {
              cursor: "pointer",
            },
            figcaption: {
              textAlign: "center",
            },
            img: {
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: theme("borderRadius.lg"),
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
              backgroundColor: theme("colors.gray.50"),
            },
            "p.hint": {
              borderRadius: theme("borderRadius.lg"),
              paddingTop: theme("padding.2"),
              paddingBottom: theme("padding.2"),
              paddingLeft: theme("padding.4"),
              paddingRight: theme("padding.4"),
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

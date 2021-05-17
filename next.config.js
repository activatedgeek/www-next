if (process.env.NEXT_KB_DIR === undefined) {
  throw new Error("Missing NEXT_KB_DIR environment variable.")
}

module.exports = {
  serverRuntimeConfig: {
    siteDir: process.env.NEXT_KB_DIR,
  },
  publicRuntimeConfig: {
    siteUrl:
      process.env.NODE_ENV === "production"
        ? "https://next.perhapsbay.es"
        : "http://localhost:3000",
    author: "Sanyam Kapoor",
    social: {
      scholar: "https://u.perhapsbay.es/pubs",
      github: "https://github.com/activatedgeek",
      yc: "https://news.ycombinator.com/user?id=activatedgeek",
      linkedin: "https://www.linkedin.com/in/sanyamkapoor",
      stackoverflow: "https://stackoverflow.com/users/2425365",
      twitter: "https://twitter.com/snymkpr",
      code: "https://github.com/activatedgeek/www-next",
    },
  },
}

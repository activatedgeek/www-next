const globby = require("globby")
const fs = require("fs/promises")
const matter = require("gray-matter")
const GithubSlugger = require("github-slugger")

if (process.env.NEXT_KB_DIR === undefined) {
  throw new Error("Missing NEXT_KB_DIR environment variable.")
}

/** TODO: move this to in-memory database */
async function getAllPages() {
  if (process.env.NODE_ENV !== "production") {
    return []
  }

  const rawPaths = await globby([process.env.NEXT_KB_DIR], {
    expandDirectories: { extensions: ["md"] },
  })

  const slugger = new GithubSlugger()
  return Promise.all(
    rawPaths.map(async (relPath) => {
      const rawString = await fs.readFile(relPath)
      const {
        data: { title, slug: _slug, redirectsFrom },
      } = matter(rawString)
      return {
        uri: _slug ? _slug : `/kb/${slugger.slug(title)}`,
        redirectsFrom: redirectsFrom || [],
      }
    })
  )
}

module.exports = {
  eslint: {
    dirs: ["components", "lib", "pages"],
  },
  serverRuntimeConfig: {
    siteDir: process.env.NEXT_KB_DIR,
    libraryThingUserId: process.env.LIBRARYTHING_USERID,
  },
  publicRuntimeConfig: {
    siteUrl:
      process.env.NODE_ENV === "production"
        ? "https://im.perhapsbay.es"
        : "http://localhost:3000",
    author: "Sanyam Kapoor",
    social: {
      scholar: "https://perhapsbay.es/pubs",
      github: "https://github.com/activatedgeek",
      yc: "https://news.ycombinator.com/user?id=activatedgeek",
      linkedin: "https://www.linkedin.com/in/sanyamkapoor",
      stackoverflow: "https://stackoverflow.com/users/2425365",
      twitter: "https://twitter.com/snymkpr",
      code: "https://github.com/activatedgeek/www-next",
    },
    gcCode: process.env.GC_CODE,
  },
  async redirects() {
    const allPages = await getAllPages()
    let allRedirects = [
      { source: "/about", destination: "/", permanent: false },
    ]
    allPages.map(({ uri: destination, redirectsFrom }) => {
      for (const source of redirectsFrom) {
        allRedirects.push({ source, destination, permanent: false })
      }
    })
    return allRedirects
  },
}

const fs = require("fs").promises
const matter = require("gray-matter")

async function getAllRedirects() {
  const baseDir = process.env.WWW_KB_DIR
  if (!baseDir) {
    throw new Error("Missing WWW_KB_DIR environment variable.")
  }

  const { globby } = await import("globby")
  const rawPaths = await globby([baseDir], {
    expandDirectories: { extensions: ["md"] },
  })

  const { default: GithubSlugger } = await import("github-slugger")
  const slugger = new GithubSlugger()
  let allRedirects = await Promise.all(
    rawPaths.map(async (filePath) => {
      const rawString = await fs.readFile(filePath)
      const {
        data: { title, slug: _slug, internal: _internal, redirectsFrom },
      } = matter(rawString)
      const slug = _slug ? _slug : slugger.slug(title)
      const internal = _internal ? Boolean(_internal) : false
      const uri = slug.startsWith("/")
        ? slug
        : `/${internal ? "notes" : "kb"}/${slug}`
      if (redirectsFrom) {
        return redirectsFrom.map((source) => ({
          source,
          destination: uri,
          permanent: true,
        }))
      }
    })
  )

  return allRedirects.filter((r) => r !== undefined).flat()
}

module.exports = {
  images: {
    domains: ["images-na.ssl-images-amazon.com", "pics.cdn.librarything.com"],
  },
  env: {
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: "/login",
    WWW_MD_ROOT: `${__dirname}/api/cms/kb`,
  },
  eslint: {
    dirs: ["api", "app", "components"],
  },
  async redirects() {
    return [...(await getAllRedirects())]
  },
}

const fs = require("fs").promises
const matter = require("gray-matter")
const TOML = require('@iarna/toml')

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://sanyamkapoor.com"
    : `${process.env.VERCEL_URL || "http://localhost:3000"}`
const INDEX_JSON_FILE = "public/index.toml"

async function getStorkConfig() {
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

  const allSources = await Promise.all(
    rawPaths.map(async (filePath) => {
      const rawString = await fs.readFile(filePath)
      const {
        data: { internal: _internal, title, slug: _slug },
      } = matter(rawString)
      const slug = _slug ? _slug : slugger.slug(title)
      const internal = _internal ? Boolean(_internal) : false
      const uri = slug.startsWith("/")
        ? slug
        : `/${internal ? "notes" : "kb"}/${slug}`
      if (!internal) {
        return {
          path: filePath,
          title,
          url: uri,
          filetype: "Markdown",
        }
      }
    })
  )

  const files = allSources.filter((r) => r !== undefined).flat()

  return {
    input: {
      url_prefix: BASE_URL,
      frontmatter_handling: "Omit",
      files,
    },
  }
}

getStorkConfig().then((storkConfig) => {
  fs.writeFile(INDEX_JSON_FILE, TOML.stringify(storkConfig), (err) => {
    if (err) throw err;
  });
})

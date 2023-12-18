// Use CommonJS for compatibility across the project, use dynamic imports.

async function getAllRawPages() {
  const { default: GithubSlugger } = await import("github-slugger")
  const slugger = new GithubSlugger()
  const { default: matter } = await import("gray-matter")
  const { promises: fs } = await import("fs")
  const { globby } = await import("globby")

  const baseDir = process.env.WWW_KB_DIR
  if (!baseDir) {
    throw new Error("Missing WWW_KB_DIR environment variable.")
  }

  const rawPaths = await globby(baseDir, {
    expandDirectories: { files: ["*.md"] },
  })

  let allRawPages = await Promise.all(
    rawPaths.map(async (filePath) => {
      const rawString = await fs.readFile(filePath)
      const {
        data: {
          title,
          description,
          date,
          updated: _updated,
          area,
          authors: _authors,
          slug: _slug,
          internal: _internal,
          redirectsFrom,
        },
      } = matter(rawString)
      const slug = _slug ? _slug : slugger.slug(title)
      const internal = _internal ? Boolean(_internal) : false
      const authors = _authors || []
      const uri = slug.startsWith("/")
        ? slug
        : `/${internal ? "notes" : "kb"}/${slug}`
      return {
        filePath,
        title,
        description,
        authors,
        area,
        slug,
        uri,
        date: new Date(date),
        updated: new Date(_updated || date),
        internal,
        redirectsFrom,
      }
    })
  )

  allRawPages.sort(({ updated: a }, { updated: b }) => {
    return b - a
  })

  return allRawPages
}

module.exports = {
  getAllRawPages,
}

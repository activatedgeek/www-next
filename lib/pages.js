import globby from "globby"
import fs from "fs/promises"
import matter from "gray-matter"
import GithubSlugger from "github-slugger"
import { serialize } from "next-mdx-remote/serialize"
import { getServerConfig } from "./next-config"

/** @TODO Replace all this with an in-memory DB */

export async function getAllPages(_area = undefined, _limit = undefined) {
  const { siteDir } = getServerConfig()
  const rawPaths = await globby([siteDir], {
    expandDirectories: { extensions: ["md"] },
  })

  const slugger = new GithubSlugger()
  let allPages = await Promise.all(
    rawPaths.map(async (relPath) => {
      const rawString = await fs.readFile(relPath)
      const {
        data: { title, area, cat, slug: _slug, date: _date, updated: _updated },
      } = matter(rawString)
      const uri = _slug ? _slug : `/kb/${slugger.slug(title)}`
      return { relPath, title, area, cat, uri, last_updated: _updated || _date }
    })
  )
  if (_area !== undefined) {
    allPages = allPages.filter(({ area }) => area === _area)
  }

  allPages.sort(({ last_updated: a }, { last_updated: b }) => {
    return new Date(b) - new Date(a)
  })

  if (_limit !== undefined) {
    allPages = allPages.slice(0, _limit)
  }

  return allPages
}

export async function getPageByURI(_uri = undefined, _relPath = undefined) {
  let relPath = _relPath
  if (relPath === undefined) {
    const pages = await getAllPages()
    const page = pages.filter(({ uri }) => uri === _uri)[0]
    if (page === undefined) {
      return
    }
    relPath = page.relPath
  }

  const rawString = await fs.readFile(relPath)
  const { content: rawContent, data: frontmatter } = matter(rawString)

  const mdxSource = await serialize(rawContent, {
    scope: frontmatter,
    mdxOptions: {
      remarkPlugins: [
        // @NOTE: https://github.com/remarkjs/remark-math/tree/main/packages/remark-math#important.
        require("remark-math"),
        [require("remark-external-links"), { target: "_blank" }],
        require("remark-footnotes"),
        require("remark-emoji"),
        require("remark-hint"),
        require("remark-toc"),
        require("./remark-figure-image"),
      ],
      rehypePlugins: [
        require("rehype-katex"),
        require("rehype-slug"),
        require("rehype-highlight"),
      ],
    },
  })

  return { mdxSource, frontmatter }
}

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
        data: {
          title,
          area,
          cat,
          slug: _slug,
          date: _date,
          updated: _updated,
          list: _list,
        },
      } = matter(rawString)
      const uri = _slug ? _slug : `/kb/${slugger.slug(title)}`
      const shouldList = _list === undefined ? true : _list
      return {
        relPath,
        title,
        area,
        cat,
        uri,
        last_updated: _updated || _date,
        shouldList,
      }
    })
  )

  /** @TODO: This may require better handling. */
  allPages = allPages.filter(({ shouldList }) => shouldList)

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

export async function getPageByPath(relPath) {
  const rawString = await fs.readFile(relPath)
  const { content: rawContent, data: frontmatter } = matter(rawString)

  const mdxSource = await serialize(rawContent, {
    scope: frontmatter,
    mdxOptions: {
      remarkPlugins: [
        require("./remark-figure-image"),
        require("remark-emoji"),
        [require("remark-external-links"), { target: "_blank" }],
        require("remark-footnotes"),
        require("remark-hint"),
        // @NOTE: https://github.com/remarkjs/remark-math/tree/main/packages/remark-math#important.
        require("remark-math"),
      ],
      rehypePlugins: [
        require("rehype-highlight"),
        require("rehype-katex"),
        require("rehype-slug"),
        [
          require("@jsdevtools/rehype-toc"),
          {
            headings: ["h1", "h2", "h3"],
            customizeTOC: function (toc) {
              if (toc.children[0].children.length === 0) {
                return null
              }

              function visitTOC(node) {
                if (node.tagName === "ol") {
                  node.tagName = "ul"
                }
                if (node.children !== undefined) {
                  for (let c of node.children) {
                    visitTOC(c)
                  }
                }
              }

              visitTOC(toc)

              // add ToC title.
              toc.children = [
                {
                  type: "element",
                  tagName: "h3",
                  children: [{ type: "text", value: "Table of Contents" }],
                },
                ...toc.children,
              ]
              return toc
            },
          },
        ],
      ],
    },
  })

  return { mdxSource, frontmatter }
}

export async function getPageByURI(_uri) {
  const pages = await getAllPages()
  const page = pages.filter(({ uri }) => uri === _uri)[0]
  if (page === undefined) {
    return
  }

  return getPageByPath(page.relPath)
}

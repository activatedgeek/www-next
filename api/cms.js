import fs from "fs/promises"
import { cache } from "react"
import { globby } from "globby"
import GithubSlugger from "github-slugger"
import matter from "gray-matter"

import { defaultAuthor } from "./metadata"

export const areas = {
  cult: {
    url: "/kb/culture-overview",
    label: "Culture",
    color: "bg-red-400",
    emoji_code: "performing_arts",
  },
  math: {
    label: "Mathematics",
    url: "/kb/mathematics-overview",
    color: "bg-green-500",
    emoji_code: "1234",
  },
  meta: {
    label: "Meta",
    url: "/kb/meta-overview",
    color: "bg-blue-500",
    emoji_code: "bulb",
  },
  nat: {
    label: "Natural sciences",
    url: "/kb/natural-sciences-overview",
    color: "bg-green-600",
    emoji_code: "leaves",
  },
  people: {
    label: "People",
    url: "/kb/people-overview",
    color: "bg-red-600",
    emoji_code: "information_desk_person",
  },
  phil: {
    label: "Philosophy",
    url: "/kb/philosophy-overview",
    color: "bg-pink-400",
    emoji_code: "thought_balloon",
  },
  ref: {
    label: "Reference",
    url: "/kb/reference-overview",
    color: "bg-blue-600",
    emoji_code: "books",
  },
  soc: {
    label: "Society",
    url: "/kb/society-overview",
    color: "bg-pink-700",
    emoji_code: "classical_building",
  },
  tech: {
    label: "Technology",
    url: "/kb/technology-overview",
    color: "bg-yellow-500",
    emoji_code: "rocket",
  },
}

export const getAllPages = cache(async function () {
  if (process.env.KB_DIR === undefined) {
    throw new Error("Missing KB_DIR environment variable.")
  }

  const baseDir = `${process.env.KB_DIR}/www`
  const rawPaths = await globby([baseDir], {
    expandDirectories: { extensions: ["md"] },
  })

  const slugger = new GithubSlugger()
  let allPages = await Promise.all(
    rawPaths.map(async (relPath) => {
      const rawString = await fs.readFile(relPath)
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
        },
      } = matter(rawString)
      const slug = _slug ? _slug : slugger.slug(title)
      const internal = _internal ? Boolean(_internal) : false
      const authors = _authors ? [defaultAuthor, ..._authors] : [defaultAuthor]
      return {
        relPath,
        title,
        description,
        authors,
        area,
        slug,
        date: new Date(date),
        last_updated: new Date(_updated || date),
        internal,
      }
    })
  )

  allPages.sort(({ last_updated: a }, { last_updated: b }) => {
    return b - a
  })

  return allPages
})

export const getPageInfoBySlug = cache(async function (slug) {
  const allPages = await getAllPages()

  const filteredPage = allPages.filter(({ slug: _slug }) => _slug === slug)
  if (filteredPage.length == 0) {
    return null
  }
  return filteredPage[0]
})

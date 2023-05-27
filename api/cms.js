import fs from "fs/promises"
import { cache } from "react"
import { globby } from "globby"
import GithubSlugger from "github-slugger"
import matter from "gray-matter"

import { defaultAuthor } from "./metadata"

export const areas = {
  cult: {
    label: "Culture",
    color: "bg-red-400",
    emoji_code: "performing_arts",
  },
  math: {
    label: "Mathematics",
    color: "bg-green-600",
    emoji_code: "1234",
  },
  meta: {
    label: "Meta",
    color: "bg-blue-500",
    emoji_code: "bulb",
  },
  nat: {
    label: "Natural sciences",
    color: "bg-cyan-400",
    emoji_code: "dna",
  },
  people: {
    label: "People",
    color: "bg-red-600",
    emoji_code: "information_desk_person",
  },
  phil: {
    label: "Philosophy",
    color: "bg-pink-400",
    emoji_code: "thought_balloon",
  },
  ref: {
    label: "Reference",
    color: "bg-blue-600",
    emoji_code: "books",
  },
  soc: {
    label: "Society",
    color: "bg-pink-700",
    emoji_code: "classical_building",
  },
  tech: {
    label: "Technology",
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
        },
      } = matter(rawString)
      const slug = _slug ? _slug : slugger.slug(title)
      const internal = _internal ? Boolean(_internal) : false
      const authors = _authors ? [defaultAuthor, ..._authors] : [defaultAuthor]
      return {
        filePath,
        title,
        description,
        authors,
        area,
        slug,
        date: new Date(date),
        updated: new Date(_updated || date),
        internal,
      }
    })
  )

  allPages.sort(({ updated: a }, { updated: b }) => {
    return b - a
  })

  return allPages
})

export async function getAllPublicPages() {
  const allPages = await getAllPages()
  return allPages.filter(({ internal }) => internal !== true)
}

export async function getAllInternalPages() {
  const allPages = await getAllPages()
  return allPages.filter(({ internal }) => internal !== false)
}

export async function getAllPublicPagesByArea(area) {
  const allPages = await getAllPublicPages()
  return allPages.filter(({ area: _area }) => _area === area)
}

export async function getLatestPages(limit) {
  const allPages = await getAllPublicPages()
  return allPages.filter(({ internal }) => !internal).slice(0, limit)
}

export async function getPageInfoBySlug(slug) {
  const allPages = await getAllPages()

  const filteredPage = allPages.filter(({ slug: _slug }) => _slug === slug)
  if (filteredPage.length == 0) {
    return null
  }
  return filteredPage[0]
}

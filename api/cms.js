import fs from "fs/promises"
import { cache } from "react"
import { globby } from "globby"
import GithubSlugger from "github-slugger"
import matter from "gray-matter"

import { baseAuthor } from "./metadata"

export const areas = {
  cult: {
    label: "Culture",
    bgColor: "bg-sky-400",
    emoji_code: "frame_with_picture",
  },
  math: {
    label: "Mathematics",
    bgColor: "bg-red-400",
    emoji_code: "abacus",
  },
  meta: {
    label: "Meta",
    bgColor: "bg-stone-400",
    emoji_code: "bulb",
  },
  nat: {
    label: "Natural sciences",
    bgColor: "bg-pink-400",
    emoji_code: "dna",
  },
  people: {
    label: "People",
    bgColor: "bg-purple-400",
    emoji_code: "information_desk_person",
  },
  phil: {
    label: "Philosophy",
    bgColor: "bg-amber-400",
    emoji_code: "thought_balloon",
  },
  ref: {
    label: "Reference",
    bgColor: "bg-green-400",
    emoji_code: "books",
  },
  soc: {
    label: "Society",
    bgColor: "bg-yellow-400",
    emoji_code: "classical_building",
  },
  tech: {
    label: "Technology",
    bgColor: "bg-orange-400",
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
      const authors = _authors ? [baseAuthor, ..._authors] : [baseAuthor]
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

import fs from "fs/promises"
import { cache } from "react"
import { globby } from "globby"
import GithubSlugger from "github-slugger"
import matter from "gray-matter"

import { baseAuthor } from "@/api/metadata"

export const areas = {
  cult: {
    label: "Culture",
    bgColor: "!bg-sky-100",
    ringColor: "!ring-sky-500",
    textColor: "!text-sky-500",
    emoji_code: "performing_arts",
  },
  math: {
    label: "Mathematics",
    bgColor: "!bg-rose-50",
    ringColor: "!ring-rose-500",
    textColor: "!text-rose-500",
    emoji_code: "abacus",
  },
  meta: {
    label: "Meta",
    bgColor: "!bg-slate-100",
    ringColor: "!ring-slate-500",
    textColor: "!text-slate-500",
    emoji_code: "gear",
  },
  nat: {
    label: "Natural sciences",
    bgColor: "!bg-pink-100",
    ringColor: "!ring-pink-500",
    textColor: "!text-pink-500",
    emoji_code: "dna",
  },
  people: {
    label: "People",
    bgColor: "!bg-purple-100",
    ringColor: "!ring-purple-500",
    textColor: "!text-purple-500",
    emoji_code: "information_desk_person",
  },
  phil: {
    label: "Philosophy",
    bgColor: "!bg-lime-100",
    ringColor: "!ring-lime-600",
    textColor: "!text-lime-600",
    emoji_code: "infinity",
  },
  ref: {
    label: "Reference",
    bgColor: "!bg-emerald-100",
    ringColor: "!ring-emerald-600",
    textColor: "!text-emerald-600",
    emoji_code: "books",
  },
  soc: {
    label: "Society",
    bgColor: "!bg-yellow-100",
    ringColor: "!ring-yellow-600",
    textColor: "!text-yellow-600",
    emoji_code: "classical_building",
  },
  tech: {
    label: "Technology",
    bgColor: "!bg-orange-100",
    ringColor: "!ring-orange-600",
    textColor: "!text-orange-600",
    emoji_code: "rocket",
  },
}

export const getAllPages = cache(async function () {
  const baseDir = process.env.WWW_KB_DIR
  if (!baseDir) {
    throw new Error("Missing WWW_KB_DIR environment variable.")
  }

  const rawPaths = await globby([baseDir], {
    expandDirectories: { extensions: ["md"] },
  })

  const manualPaths = [`${process.env.WWW_MD_ROOT}/demo.md`]

  const slugger = new GithubSlugger()
  let allPages = await Promise.all(
    [...rawPaths, ...manualPaths].map(async (filePath) => {
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

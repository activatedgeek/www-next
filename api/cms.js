import { getAllRawPages } from "@/api/kb"
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
    emoji_code: "adult",
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

export async function getAllPages() {
  const allRawPages = await getAllRawPages()
  return allRawPages.map(({ authors, ...attrs }) => ({
    ...attrs,
    authors: [baseAuthor, ...authors],
  }))
}

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

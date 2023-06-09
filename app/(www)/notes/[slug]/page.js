import fs from "fs"
import { notFound } from "next/navigation"

import { getAllInternalPages, getPageInfoBySlug } from "@/api/cms"
import { generateMetadataFromPageInfo } from "@/api/metadata"
import { KB } from "../../kb/[slug]/page"

export const dynamic = "force-static"

export async function generateStaticParams() {
  const allPages = await getAllInternalPages()
  return allPages.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params: { slug } }, _) {
  const pageInfo = await getPageInfoBySlug(slug)
  if (!pageInfo) {
    return null
  }

  return generateMetadataFromPageInfo({ ...pageInfo, slug: `/notes/${slug}` })
}

export default async function Page({ params: { slug } }) {
  const pageInfo = await getPageInfoBySlug(slug)
  if (!pageInfo) {
    return notFound()
  }
  const { filePath, internal, ...frontmatter } = pageInfo
  if (!internal) {
    return notFound()
  }

  const source = await fs.promises.readFile(filePath, "utf8")

  return await KB(frontmatter, source)
}

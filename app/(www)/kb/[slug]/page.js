import fs from "fs"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"

import { getAllPublicPages, getPageInfoBySlug } from "@/api/cms"
import { generateMetadataFromPageInfo } from "@/api/metadata"
import { getMDXOptions } from "@/components/mdx"
import AreaLink from "@/components/areaLink"
import PageInfo from "@/components/pageInfo"

export const dynamic = "force-static"

export async function generateStaticParams() {
  const allPages = await getAllPublicPages()
  return allPages.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params: { slug } }) {
  const pageInfo = await getPageInfoBySlug(slug)
  if (!pageInfo) {
    return null
  }

  return generateMetadataFromPageInfo(pageInfo)
}

export async function KB({ frontmatter, source }) {
  return (
    <>
      <PageInfo {...frontmatter} />
      <MDXRemote
        source={source}
        components={{ AreaLink }}
        options={{
          mdxOptions: await getMDXOptions(),
          parseFrontmatter: true,
        }}
      />
    </>
  )
}

export default async function Page({ params: { slug } }) {
  const pageInfo = await getPageInfoBySlug(slug)
  if (!pageInfo) {
    return notFound()
  }
  const { filePath, internal, ...frontmatter } = pageInfo
  if (internal) {
    return notFound()
  }

  const source = await fs.promises.readFile(filePath, "utf8")

  return await KB({ frontmatter, source })
}

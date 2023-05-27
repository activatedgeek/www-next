import fs from "fs"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"

import { getAllPublicPages, getPageInfoBySlug } from "../../../../api/cms"
import { generateMetadataFromPageInfo } from "../../../../api/metadata"
import { getMDXOptions } from "../mdx"
import PageInfo from "../pageInfo"

export async function generateStaticParams() {
  const allPages = await getAllPublicPages()
  return allPages.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params: { slug } }, _) {
  const pageInfo = await getPageInfoBySlug(slug)
  if (!pageInfo) {
    return null
  }

  return generateMetadataFromPageInfo({ ...pageInfo, slug: `/kb/${slug}` })
}

export default async function Page({ params: { slug } }) {
  const pageInfo = await getPageInfoBySlug(slug)
  if (!pageInfo) {
    return notFound()
  }

  const { filePath, ...frontmatter } = pageInfo
  const source = await fs.promises.readFile(filePath, "utf8")

  return (
    <>
      <h1 className="!mb-0">{frontmatter.title}</h1>
      <PageInfo frontmatter={frontmatter} />
      <div className="border-b border-gray-300" />
      <MDXRemote
        source={source}
        options={{
          mdxOptions: await getMDXOptions(),
          parseFrontmatter: true,
        }}
      />
    </>
  )
}

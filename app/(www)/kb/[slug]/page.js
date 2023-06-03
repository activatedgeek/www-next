import fs from "fs"
import { notFound } from "next/navigation"
import { currentUser, RedirectToSignIn } from "@clerk/nextjs"
import { MDXRemote } from "next-mdx-remote/rsc"

import { getAllPages, getPageInfoBySlug } from "../../../../api/cms"
import { generateMetadataFromPageInfo } from "../../../../api/metadata"
import { getMDXOptions } from "../mdx"
import PageInfo from "../pageInfo"

export async function generateStaticParams() {
  const allPages = await getAllPages()
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

  const { internal } = pageInfo
  if (internal) {
    const user = await currentUser()
    if (!user) {
      return <RedirectToSignIn />
    }
  }

  const { filePath, ...frontmatter } = pageInfo
  const source = await fs.promises.readFile(filePath, "utf8")

  return (
    <>
      <PageInfo {...frontmatter} />
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

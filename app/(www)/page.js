import fs from "fs"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"

import { getLatestPages, getPageInfoBySlug } from "@/api/cms"
import { generateMetadataFromPageInfo } from "@/api/metadata"
import { getMDXOptions } from "@/components/mdx"
import PageInfo from "@/components/pageInfo"
import PageList from "@/components/pageList"
import Layout from "./kb/layout"

export const dynamic = "force-static"

export async function generateMetadata() {
  const pageInfo = await getPageInfoBySlug("about")
  if (!pageInfo) {
    return null
  }

  return generateMetadataFromPageInfo({ ...pageInfo, slug: "/" })
}

export default async function Page() {
  const pageInfo = await getPageInfoBySlug("about")
  if (!pageInfo) {
    return notFound()
  }

  const latestPages = await getLatestPages(17)

  const { filePath, ...frontmatter } = pageInfo
  const source = await fs.promises.readFile(filePath, "utf8")

  return (
    <Layout>
      <PageInfo {...frontmatter} />
      <MDXRemote
        source={source}
        options={{
          mdxOptions: await getMDXOptions(),
          parseFrontmatter: true,
        }}
      />
      <PageList title="Latest Pages" pages={latestPages} />
    </Layout>
  )
}

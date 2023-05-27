import fs from "fs"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"

import { getLatestPages, getPageInfoBySlug } from "../../api/cms"
import { generateMetadataFromPageInfo } from "../../api/metadata"
import { getMDXOptions } from "./kb/mdx"
import PageInfo from "./kb/pageInfo"
import Layout from "./kb/layout"
import PageList from "./kb/pageList"

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
      <PageList title="Latest Pages" pages={latestPages} />
    </Layout>
  )
}

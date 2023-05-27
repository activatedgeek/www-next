import fs from "fs"
import { MDXRemote } from "next-mdx-remote/rsc"

import { getPageInfoBySlug, getLatestPages } from "../../api/cms"
import { creator, generateMetadataFromPageInfo } from "../../api/metadata"
import { getMDXOptions } from "./kb/mdx"
import Layout from "./kb/layout"
import PageInfo from "./kb/pageInfo"
import PageList from "./kb/pageList"

export async function generateMetadata() {
  const pageInfo = await getPageInfoBySlug("about")

  return generateMetadataFromPageInfo({ ...pageInfo, title: creator })
}

export default async function Page() {
  const { relPath: filePath, ...frontmatter } = await getPageInfoBySlug("about")
  const source = await fs.promises.readFile(filePath, "utf8")

  const latestPages = await getLatestPages(17)

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

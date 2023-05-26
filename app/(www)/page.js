import fs from "fs"
import { MDXRemote } from "next-mdx-remote/rsc"

import { getPageInfoBySlug } from "../../api/cms"
import { creator, generateMetadataFromPageInfo } from "../../api/metadata"
import { getMDXOptions } from "./kb/mdx"
import PageInfo from "./kb/pageInfo"
import Layout from "./kb/layout"

export async function generateMetadata() {
  const pageInfo = await getPageInfoBySlug("about")

  return generateMetadataFromPageInfo({...pageInfo, title: creator })
}

export default async function Page() {
  const { relPath: filePath, ...frontmatter } = await getPageInfoBySlug("about")
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
    </Layout>
  )
}

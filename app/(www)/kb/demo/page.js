import fs from "fs"
import { MDXRemote } from "next-mdx-remote/rsc"
import matter from "gray-matter"

import {
  baseAuthor,
  generateMetadataFromPageInfo,
} from "../../../../api/metadata"
import { getMDXOptions } from "../mdx"
import PageInfo from "../pageInfo"

const filePath = `${__dirname}/../../../../../../app/(www)/kb/_www/demo.md`

export async function generateMetadata() {
  const source = await fs.promises.readFile(filePath, "utf8")
  const { data: pageInfo } = matter(source)

  return generateMetadataFromPageInfo({ ...pageInfo, authors: [baseAuthor] })
}

export default async function Page() {
  const source = await fs.promises.readFile(filePath, "utf8")
  const { data: frontmatter } = matter(source)

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

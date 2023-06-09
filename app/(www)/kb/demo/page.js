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

export const dynamic = "force-static"

export async function generateMetadata() {
  const source = await fs.promises.readFile(filePath, "utf8")
  const { data: pageInfo } = matter(source)

  return generateMetadataFromPageInfo({ ...pageInfo, authors: [baseAuthor] })
}

// TODO: re-use KB slug
export default async function Page() {
  const source = await fs.promises.readFile(filePath, "utf8")
  const { data: frontmatter } = matter(source)

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

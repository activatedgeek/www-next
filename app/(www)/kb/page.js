import fs from "fs"
import { MDXRemote } from "next-mdx-remote/rsc"
import matter from "gray-matter"

import { baseAuthor, generateMetadataFromPageInfo } from "@/api/metadata"
import { getMDXOptions } from "@/components/mdx"
import PageInfo from "@/components/pageInfo"
import AreaLink from "@/components/areaLink"

const filePath = `${process.env.WWW_MD_ROOT}/page.md`

export const dynamic = "force-static"

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

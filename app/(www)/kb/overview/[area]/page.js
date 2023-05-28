import fs from "fs"
import { notFound } from "next/navigation"
import matter from "gray-matter"
import { MDXRemote } from "next-mdx-remote/rsc"

import { areas, getAllPublicPagesByArea } from "../../../../../api/cms"
import {
  baseAuthor,
  generateMetadataFromPageInfo,
} from "../../../../../api/metadata"
import { getMDXOptions } from "../../mdx"
import PageInfo from "../../pageInfo"
import PageList from "../../pageList"

const overviewFileDir = `${__dirname}/../../../../../../../app/(www)/kb/_www`

export async function generateStaticParams() {
  return Object.keys(areas).map((area) => ({ area }))
}

export async function generateMetadata({ params: { area } }) {
  if (!areas.hasOwnProperty(area)) {
    return null
  }
  const source = await fs.promises.readFile(
    `${overviewFileDir}/${area}.md`,
    "utf8"
  )
  const { data: pageInfo } = matter(source)

  return generateMetadataFromPageInfo({
    ...pageInfo,
    slug: `kb/overview/${area}`,
    authors: [baseAuthor],
  })
}

export default async function Page({ params: { area } }) {
  if (!areas.hasOwnProperty(area)) {
    return notFound()
  }

  const areaPages = await getAllPublicPagesByArea(area)
  const source = await fs.promises.readFile(
    `${overviewFileDir}/${area}.md`,
    "utf8"
  )
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
      <PageList title="All Pages" pages={areaPages} />
    </>
  )
}

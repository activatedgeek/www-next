import { MDXRemote } from "next-mdx-remote"

import Layout from "./layout"
import PostInfo from "./post-info"
import PageList from "./page-list"

export default function SinglePage({ frontmatter, children }) {
  const { title } = frontmatter
  return (
    <Layout frontmatter={frontmatter}>
      {/* <div className="z-10 md:sticky md:top-0 md:bg-white"> */}
      <h1 className="mb-2">{title}</h1>
      <PostInfo frontmatter={frontmatter} />
      <div className="border-b border-gray-300" />
      {/* </div> */}
      {children}
    </Layout>
  )
}

export function MDXPage({ mdxSource, frontmatter, extraPages, extraTitle }) {
  return (
    <SinglePage frontmatter={frontmatter}>
      <MDXRemote {...mdxSource} />
      {(extraPages || []).length ? (
        <PageList title={extraTitle} pages={extraPages} />
      ) : null}
    </SinglePage>
  )
}

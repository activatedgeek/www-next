import { getServerConfig } from "../lib/next-config"
import { getPageByURI, getAllPages } from "../lib/pages"
import MDXPage from "../components/mdx-page"

export default MDXPage

export async function getStaticProps() {
  const { siteDir } = getServerConfig()
  const { mdxSource, frontmatter } = await getPageByURI(
    undefined,
    `${siteDir}/meta/sys/404.md`
  )
  return {
    props: {
      mdxSource,
      frontmatter,
      extraPages: await getAllPages(undefined, 17),
      extraTitle: "Latest Pages",
    },
  }
}

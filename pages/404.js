import { getServerConfig } from "../lib/next-config"
import { getPageByPath, getAllPages } from "../lib/pages"
import { MDXPage } from "../components/single-page"

export default MDXPage

export async function getStaticProps() {
  const { siteDir } = getServerConfig()
  const { mdxSource, frontmatter } = await getPageByPath(
    `${siteDir}/meta/404.md`
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

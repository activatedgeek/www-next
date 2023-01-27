import { getServerConfig } from "../lib/next-config"
import { getPageByPath, getAllPages } from "../lib/pages"
import { MDXPage } from "../components/single-page"

export default MDXPage

export async function getStaticProps() {
  const { siteDir } = getServerConfig()
  const { mdxSource, frontmatter } = await getPageByPath(
    `${siteDir}/meta/db.md`
  )
  return {
    props: {
      mdxSource,
      frontmatter,
      extraPages: await getAllPages(),
      extraTitle: "Archive",
    },
  }
}

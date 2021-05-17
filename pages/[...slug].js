import { getAllPages, getPageByURI } from "../lib/pages"
import { MDXPage } from "../components/single-page"

export default MDXPage

export async function getStaticProps({ params: { slug } }) {
  const uri = `/${(slug || []).join("/")}`
  const { mdxSource, frontmatter } = await getPageByURI(uri)
  const { layout, area } = frontmatter
  let extraPages = []
  let extraTitle = ""
  /** @TODO this is ugly. Handle during page generation later. */
  if (layout === "overview") {
    extraPages = await getAllPages(area)
  }

  return {
    props: {
      mdxSource,
      frontmatter: {
        ...frontmatter,
        uri,
      },
      extraPages,
      extraTitle,
    },
  }
}

export async function getStaticPaths() {
  const allPages = await getAllPages()
  const paths = allPages.map(({ uri }) => ({
    params: { slug: uri.split("/").filter((s) => s.length) },
  }))
  return {
    paths,
    fallback: false,
  }
}

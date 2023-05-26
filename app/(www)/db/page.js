import { generateMetadataFromPageInfo } from "../../../api/metadata"
import PageInfo from "../kb/pageInfo"

const pageInfo = {
  title: "Database of Pages",
  description: "Archive of all pages on the website.",
  area: "meta",
  slug: "db",
}

export const metadata = generateMetadataFromPageInfo(pageInfo)

export default async function DB() {
  return (
    <>
      <h1 className="!mb-0">{pageInfo.title}</h1>
      <PageInfo frontmatter={pageInfo} />
      <div className="border-b border-gray-300" />
      <p className="hint warn">
        ⚠️ This is the archive of all pages on this website, but may not be the
        best way to navigate. See the <a href="/kb">Knowledge Bayes</a> for a
        more streamlined start.
      </p>
    </>
  )
}

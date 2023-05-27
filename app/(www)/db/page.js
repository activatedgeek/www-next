import { getAllPages } from "../../../api/cms"
import { generateMetadataFromPageInfo } from "../../../api/metadata"
import PageList from "../kb/pageList"

const pageInfo = {
  title: "Database of Pages",
  description: "Archive of all pages on the website.",
  slug: "db",
}

export const metadata = generateMetadataFromPageInfo(pageInfo)

export default async function DB() {
  const allPages = await getAllPages()

  return (
    <>
      <h1 className="!mb-0">{pageInfo.title}</h1>
      <p className="hint warn">
        ⚠️ This is the archive of all pages on this website, but may not be the
        best way to navigate. See the <a href="/kb">Knowledge Base</a> for a
        more streamlined start.
      </p>
      <PageList title="Archive" pages={allPages} />
    </>
  )
}

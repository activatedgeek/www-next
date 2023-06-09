import { getAllInternalPages } from "../../../api/cms"
import { generateMetadataFromPageInfo } from "../../../api/metadata"
import PageList from "../kb/pageList"

const pageInfo = {
  title: "Private Notes",
  description: "Archive of all private pages on the website.",
  slug: "notes",
  internal: true,
}

export const metadata = generateMetadataFromPageInfo(pageInfo)

export default async function PrivateDB() {
  const allPages = await getAllInternalPages()

  return (
    <>
      <h1 className="!mb-0">{pageInfo.title}</h1>
      <p className="hint warn">
        ❌ You should not be here. See the <a href="/kb">Knowledge Base</a> for
        a more streamlined start.
      </p>
      <PageList title="Archive" pages={allPages} slugPrefix="notes" />
    </>
  )
}

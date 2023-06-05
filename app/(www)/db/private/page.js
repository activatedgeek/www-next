import { getAllInternalPages } from "../../../../api/cms"
import { generateMetadataFromPageInfo } from "../../../../api/metadata"
import PageList from "../../kb/pageList"

const pageInfo = {
  title: "Private Database of Pages",
  description: "Archive of all private pages on the website.",
  slug: "db/private",
  internal: true,
}

export const metadata = generateMetadataFromPageInfo(pageInfo)

export default async function PrivateDB() {
  const allPages = await getAllInternalPages()

  return (
    <>
      <h1 className="!mb-0">{pageInfo.title}</h1>
      <p className="hint warn">
        ⚠️ This is an archive of all private pages on this website, but may not be the
        best way to navigate. See the <a href="/kb">Knowledge Base</a> for a
        more streamlined start.
      </p>
      <PageList title="Archive" pages={allPages} />
    </>
  )
}

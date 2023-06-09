import { getAllInternalPages } from "@/api/cms"
import { generateMetadataFromPageInfo } from "@/api/metadata"
import PageList from "@/components/pageList"

const pageInfo = {
  title: "Private Notes",
  description: "Archive of all private pages on the website.",
  slug: "notes",
  internal: true,
}

export const metadata = generateMetadataFromPageInfo(pageInfo)

export default async function PrivateDB() {
  const allPages = await getAllInternalPages()

  return <PageList title={pageInfo.title} pages={allPages} slugPrefix="notes" />
}

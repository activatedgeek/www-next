import { baseUrl } from "@/api/metadata"
import { getAllPublicPages } from "@/api/cms"

export default async function sitemap() {
  return (await getAllPublicPages()).map(
    ({ uri, updated: lastModified, priority }) => ({
      url: `${baseUrl}${uri}`,
      lastModified,
      priority: priority || 1,
    })
  )
}

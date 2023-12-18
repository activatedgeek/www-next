import { getAllPublicPages } from "@/api/cms"

export default async function sitemap() {
  return (await getAllPublicPages()).map(
    ({ uri: url, updated: lastModified }) => ({
      url,
      lastModified,
      priority: 1,
    })
  )
}

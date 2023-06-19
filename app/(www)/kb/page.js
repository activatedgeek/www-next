import Page, { generateMetadata as _generateMetadata } from "./[slug]/page"

export const dynamic = "force-static"

export async function generateMetadata() {
  return await _generateMetadata({ params: { slug: "/kb" } })
}

export default async function KBPage() {
  return await Page({ params: { slug: "/kb" } })
}

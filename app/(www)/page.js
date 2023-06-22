import Layout from "./kb/layout"
import { getLatestPages } from "@/api/cms"
import PageList from "@/components/pageList"
import Page, { generateMetadata as _generateMetadata } from "./kb/[slug]/page"

export const dynamic = "force-static"

export async function generateMetadata() {
  return await _generateMetadata({ params: { slug: "/" } })
}

export default async function HomePage() {
  const latestPages = await getLatestPages(23)
  return (
    <Layout>
      {await Page({ params: { slug: "/" } })}
      <PageList title="Latest Pages" pages={latestPages} />
    </Layout>
  )
}

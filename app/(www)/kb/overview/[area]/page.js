import { getAllPublicPagesByArea } from "@/api/cms"
import PageList from "@/components/pageList"
import Page, { generateMetadata as _generateMetadata } from "../../[slug]/page"

export const dynamic = "force-static"

export async function generateMetadata({ params: { area } }) {
  return await _generateMetadata({ params: { slug: `/kb/overview/${area}` } })
}

export default async function OverviewPage({ params: { area } }) {
  const areaPages = await getAllPublicPagesByArea(area)
  return (
    <>
      {await Page({ params: { slug: `/kb/overview/${area}` } })}
      <PageList title="All Pages" pages={areaPages} />
    </>
  )
}

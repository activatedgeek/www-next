import "./search.css"

import { generateMetadataFromPageInfo } from "@/api/metadata"

import StorkSearch from "@/components/search"

const pageInfo = {
  title: "Search",
  description: "Search knowledge base.",
  slug: "search",
}

export const dynamic = "force-static"

export const metadata = generateMetadataFromPageInfo(pageInfo)

export default async function Search() {
  return (
    <div>
      <h1>Search</h1>
      <StorkSearch />
    </div>
  )
}

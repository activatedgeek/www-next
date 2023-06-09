import { SignIn } from "@clerk/nextjs"

import { generateMetadataFromPageInfo } from "../../../../api/metadata"

const pageInfo = {
  title: "Login",
  slug: "login",
}

export const dynamic = "force-static"

export const metadata = generateMetadataFromPageInfo(pageInfo)

export default function Page() {
  return <SignIn />
}

import { SignIn } from "@clerk/nextjs"

import { generateMetadataFromPageInfo } from "@/api/metadata"

const pageInfo = {
  title: "Login",
  uri: "login",
  internal: true,
}

export const metadata = generateMetadataFromPageInfo(pageInfo)

export default function Page() {
  return <SignIn />
}

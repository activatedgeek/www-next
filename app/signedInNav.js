"use client"

import Link from "next/link"
import { UserButton, SignedIn } from "@clerk/nextjs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons"

export default function SignedInNav() {
  return (
    <SignedIn>
      <Link
        className="mx-1 p-2 text-link rounded-md hover:bg-blue-50"
        href="/notes"
      >
        <FontAwesomeIcon icon={faNoteSticky} /> Notes
      </Link>
      <UserButton afterSignOutUrl="/" />
    </SignedIn>
  )
}

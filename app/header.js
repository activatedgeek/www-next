import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBrain, faHome } from "@fortawesome/free-solid-svg-icons"

import SignedInNav from "./signedInNav"

export default function Header() {
  return (
    <div className="mx-auto z-10 opacity-95 flex justify-between bg-white top-0 py-3 px-3 max-w-3xl sm:px-6 lg:max-w-4xl lg:px-9 xl:max-w-6xl border-b-2">
      <div className="flex items-center">
        <Link className="cursor-pointer" href="/">
          <Image
            src="/sk.svg"
            alt="SK Logo"
            width={70}
            height={70}
            className="shadow-none"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <Link
          className="ml-6 mr-3 p-2 text-link rounded-md hover:bg-zinc-50"
          href="/"
        >
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
        <Link
          className="mr-3 p-2 text-link rounded-md hover:bg-zinc-50"
          href="/kb"
        >
          <FontAwesomeIcon icon={faBrain} /> K.B.
        </Link>
        <SignedInNav />
      </div>
    </div>
  )
}

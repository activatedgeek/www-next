import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBrain, faSearchPlus } from "@fortawesome/free-solid-svg-icons"

import SignedInNav from "./signedInNav"

export default function Header() {
  return (
    <div className="flex justify-between border-b-2 border-slate-200 mx-auto p-3 max-w-2xl sm:px-5 lg:max-w-3xl lg:px-7 xl:max-w-4xl">
      <div className="mr-3 flex items-center">
        <div className="mx-1 p-2 text-link rounded-md cursor-pointer hover:bg-blue-50">
          <Link href="/">
            <Image
              src="/sk.svg"
              alt="SK Logo"
              width={70}
              height={70}
              className="shadow-none"
            />
          </Link>
        </div>
      </div>
      <div className="ml-3 flex items-center">
        <div className="mx-1 p-2 text-link rounded-md cursor-pointer hover:bg-blue-50">
          <Link href="/search">
            <FontAwesomeIcon icon={faSearchPlus} /> Search
          </Link>
        </div>
        <div className="mx-1 p-2 text-link rounded-md cursor-pointer hover:bg-blue-50">
          <Link href="/kb">
            <FontAwesomeIcon icon={faBrain} /> K.B.
          </Link>
        </div>
        <SignedInNav />
      </div>
    </div>
  )
}

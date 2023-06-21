import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBrain,
  faHome,
  faSearchPlus,
} from "@fortawesome/free-solid-svg-icons"

import SignedInNav from "./signedInNav"

export default function Header() {
  return (
    <div className="mx-auto z-10 opacity-95 flex justify-between bg-white top-0 py-3 px-3 max-w-3xl sm:px-6 lg:max-w-4xl lg:px-9 xl:max-w-6xl border-b-2">
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

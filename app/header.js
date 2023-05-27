import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBrain, faHome } from "@fortawesome/free-solid-svg-icons"

export default function Header() {
  return (
    <div className="mx-auto z-10 opacity-95 flex justify-between bg-white top-0 py-3 px-6 max-w-3xl sm:px-9 lg:max-w-4xl lg:px-12 xl:max-w-6xl border-b-2">
      <Link className="cursor-pointer" href="/">
        <Image
          src="/sk.svg"
          alt="SK Logo"
          width={70}
          height={70}
          className="shadow-none"
        />
      </Link>
      <div className="flex items-center">
        <Link className="mx-4" href="/kb">
          <FontAwesomeIcon icon={faBrain} /> KB
        </Link>
        <Link className="mx-4" href="/">
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
      </div>
    </div>
  )
}
import emoji from "node-emoji"
import Link from "next/link"
import { areas } from "../lib/orgsys"

export default function AreaLink({ area }) {
  const { color: areaColor, emoji_code } = areas[area]
  return (
    <span className="inline-block lg:text-lg md:text-md sm:text-sm text-gray-500">
      <Link
        className={`inline-block mx-1 px-2 rounded-lg shadow-md ${areaColor} !no-underline !text-white`}
        href={`/kb/${area}-overview`}
      >
        {emoji.get(emoji_code)} {area}
      </Link>
    </span>
  )
}

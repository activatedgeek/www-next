import emoji from "node-emoji"
import Link from "next/link"
import { areas } from "../lib/orgsys"

export default function AreaLink({ area, category }) {
  const { color: areaColor, emoji_code } = areas[area]
  const catLabel = areas[area].categories[category].label
  return (
    <span className="inline-block lg:text-lg md:text-md sm:text-sm text-gray-500">
      {catLabel} in{" "}
      <Link href={`/kb/${area}-overview`}>
        <a
          className={`inline-block mx-1 px-2 rounded-lg shadow-md ${areaColor} no-underline text-white`}
        >
          {emoji.get(emoji_code)} {area}
        </a>
      </Link>
    </span>
  )
}

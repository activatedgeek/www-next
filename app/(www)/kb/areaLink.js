import emoji from "node-emoji"
import Link from "next/link"

import { areas } from "../../../api/cms"

export default function AreaLink({ area }) {
  const { color: areaColor, emoji_code } = areas[area]
  return (
    <span className="inline-block text-base">
      <Link
        className={`inline-block mx-1 px-2 py-1 rounded-md shadow-md ${areaColor} !no-underline !text-white`}
        href={`/kb/overview/${area}`}
      >
        {emoji.get(emoji_code)} {area}
      </Link>
    </span>
  )
}

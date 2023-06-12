import emoji from "node-emoji"
import Link from "next/link"

import { areas } from "@/api/cms"

export default function AreaLink({ area }) {
  const { textColor, bgColor, ringColor, emoji_code } = areas[area]
  return (
    <Link
      className={`inline-flex items-center rounded-md px-2 py-1 text-sm ${textColor} hover:shadow-md ring-1 ring-inset ${bgColor} ${ringColor}`}
      href={`/kb/overview/${area}`}
    >
      {emoji.get(emoji_code)} {area}
    </Link>
  )
}

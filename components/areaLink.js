import { get as getEmoji } from "node-emoji"
import Link from "next/link"

import { areas } from "@/api/cms"

export default function AreaLink({ area }) {
  const { textColor, bgColor, ringColor, emoji_code } = areas[area]
  return (
    <span className={`cursor-pointer inline-flex items-center rounded-md px-2 py-1 text-sm hover:shadow-md ring-1 ring-inset ${bgColor} ${ringColor}`}>
      <Link className={`${textColor}`} href={`/kb/overview/${area}`}>
        {getEmoji(`:${emoji_code}:`)} {area}
      </Link>
    </span>
  )
}

import emoji from "node-emoji"
import Link from "next/link"

import { areas } from "../../../api/cms"

export default function AreaLink({ area }) {
  const { bgColor, emoji_code } = areas[area]
  return (
    <Link
      className={`inline-flex items-center rounded-md ${bgColor} px-2 py-1 text-sm !text-white font-medium !no-underline shadow-md`}
      href={`/kb/overview/${area}`}
    >
      {emoji.get(emoji_code)} {area}
    </Link>
  )
}

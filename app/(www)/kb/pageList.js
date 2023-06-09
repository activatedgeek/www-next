import format from "date-fns/format"
import Link from "next/link"
import AreaLink from "./areaLink"

export default function PageList({ title, pages, slugPrefix }) {
  return (
    <>
      {title ? <h2>{title}</h2> : null}
      <table>
        <tbody>
          {pages.map(({ title: _t, slug, area, updated }, _i) => (
            <tr key={_i}>
              <td className="w-20 md:w-24">
                <span className="text-sm text-gray-500">
                  {format(new Date(updated), "MMM yyyy")}
                </span>
              </td>
              <td>
                <Link className="mr-3" href={`/${slugPrefix || "kb"}/${slug}`}>
                  {_t}
                </Link>
                <AreaLink area={area} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

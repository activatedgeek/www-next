import format from "date-fns/format"
import Link from "next/link"
import AreaLink from "./area-link"

export default function PageList({ title, pages }) {
  return (
    <>
      {title ? <h2>{title}</h2> : null}
      <table>
        <tbody>
          {pages.map(({ title: _t, uri, area, last_updated }, _i) => (
            <tr key={_i}>
              <td className="w-24 md:w-32">
                <span className="text-gray-500">
                  {format(new Date(last_updated), "MMM yyyy")}
                </span>
              </td>
              <td>
                <Link className="mr-3" href={uri}>
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

import format from "date-fns/format"
import Link from "next/link"
import AreaLink from "./area-link"

export default function PageList({ title, pages }) {
  return (
    <>
      {title ? <h2>{title}</h2> : null}
      <table>
        <tbody>
          {pages.map(({ title: _t, uri, area, cat, last_updated }, _i) => (
            <tr key={_i}>
              <td>
                <span className="text-gray-500">
                  {format(new Date(last_updated), "MMM d, yyyy")}
                </span>
              </td>
              <td>
                <Link href={uri}>
                  <a className="mr-3">{_t}</a>
                </Link>
                <AreaLink area={area} category={cat} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

import format from "date-fns/format"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCalendarDay,
  faCalendarPlus,
  faTags,
} from "@fortawesome/free-solid-svg-icons"

import AreaLink from "./areaLink"

export default function PageInfo({ title, description, date, updated, area }) {
  return (
    <>
      <h1 className="!mb-0">{title}</h1>
      <span className="text-gray-500">{description}</span>
      <div className="flex flex-row flex-wrap items-center py-2 text-sm">
        {date ? (
          <span className="inline-block mr-3">
            <FontAwesomeIcon icon={faCalendarDay} className="mr-2" />
            <span className="rounded-md px-2 py-1 text-slate-500 ring-1 ring-inset bg-slate-100 ring-slate-500">{format(new Date(date), "MMM d, yyyy")}</span>
          </span>
        ) : null}
        {updated ? (
          <span className="inline-block mr-3">
            <FontAwesomeIcon icon={faCalendarPlus} className="mr-2" />
            <span className="rounded-md px-2 py-1 text-slate-500 ring-1 ring-inset bg-slate-100 ring-slate-500">Last updated: {format(new Date(updated), "MMM d, yyyy")}</span>
          </span>
        ) : null}
        <div className="inline-flex flex-nowrap items-center">
          <FontAwesomeIcon icon={faTags} className="mr-2" />
          <AreaLink area={area} />
        </div>
      </div>
      <hr className="!mt-1 !mb-6 border-b border-1 border-gray-300" />
    </>
  )
}

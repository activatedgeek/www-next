import format from "date-fns/format"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCalendarDay,
  faCalendarPlus,
  faTags,
} from "@fortawesome/free-solid-svg-icons"

import AreaLink from "./areaLink"

export default function PageInfo({ title, date, updated, area }) {
  return (
    <>
      <h1 className="!mb-0">{title}</h1>
      <div className="flex flex-row flex-wrap items-center py-2 lg:text-lg md:text-md sm:text-sm text-gray-500 border-b border-gray-300">
        {date ? (
          <span className="inline-block mr-6">
            <FontAwesomeIcon icon={faCalendarDay} className="mr-2" />
            {format(new Date(date), "MMM d, yyyy")}
          </span>
        ) : null}
        {updated ? (
          <span className="inline-block mr-6">
            <FontAwesomeIcon icon={faCalendarPlus} className="mr-2" />
            Last updated: {format(new Date(updated), "MMM d, yyyy")}
          </span>
        ) : null}
        <div className="inline-flex flex-nowrap items-center">
          <FontAwesomeIcon icon={faTags} className="mr-2" />
          <AreaLink area={area} />
        </div>
      </div>
    </>
  )
}

import { MDXRemote } from "next-mdx-remote"
import format from "date-fns/format"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCalendarDay,
  faCalendarPlus,
  faTags,
} from "@fortawesome/free-solid-svg-icons"

import Layout from "./layout"
import PageList from "./page-list"
import AreaLink from "./area-link"

const components = {}

export default function MDXPage({
  mdxSource,
  frontmatter,
  extraPages,
  extraTitle,
  children,
}) {
  const { title, date, updated, area, cat } = frontmatter
  return (
    <Layout frontmatter={frontmatter}>
      <article>
        <h1 className="mb-2">{title}</h1>
        <div className="flex flex-row flex-wrap items-center py-2 border-b-4 border-gray-500 lg:text-lg md:text-md sm:text-sm text-gray-500">
          {date ? (
            <span className="inline-block mr-6">
              <FontAwesomeIcon
                icon={faCalendarDay}
                className="mr-2 text-gray-500"
              />
              {format(new Date(date), "MMM d, yyyy")}
            </span>
          ) : null}
          {updated ? (
            <span className="inline-block mr-6">
              <FontAwesomeIcon
                icon={faCalendarPlus}
                className="mr-2 text-gray-500"
              />
              Last updated: {format(new Date(updated), "MMM d, yyyy")}
            </span>
          ) : null}
          <div className="inline-flex flex-nowrap items-center">
            <FontAwesomeIcon icon={faTags} className="mr-2 text-gray-500" />
            <AreaLink area={area} category={cat} />
          </div>
        </div>
        <MDXRemote {...mdxSource} components={components} />
      </article>
      {children}
      {(extraPages || []).length ? (
        <PageList title={extraTitle} pages={extraPages} />
      ) : null}
      <div className="flex flex-row flex-wrap items-center py-2 border-b-4 border-gray-500" />
    </Layout>
  )
}

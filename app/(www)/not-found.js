import Link from "next/link"

import { getLatestPages } from "../../api/cms"

import Layout from "./kb/layout"
import PageList from "./kb/pageList"

export default async function NotFound() {
  const latestPages = await getLatestPages(17)

  return (
    <Layout>
      <h1 class="!mb-0">Oops... Not found!</h1>
      <figure class="rehype-figure">
        {
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="https://imgs.xkcd.com/comics/error_types.png"
            alt="https://xkcd.com/2303/"
            title="https://xkcd.com/2303/"
          />
        }
        <figcaption>https://xkcd.com/2303/</figcaption>
      </figure>
      <p>
        Have something in mind? Generally, a good place to start is{" "}
        <Link href="/kb">here</Link>.
      </p>
      <p>
        Or now that you&apos;ve arrived, check some of the recently updated
        pages.
      </p>
      <PageList title="Latest Pages" pages={latestPages} />
    </Layout>
  )
}

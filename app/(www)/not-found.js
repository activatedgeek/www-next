import Link from 'next/link'

import Layout from "./kb/layout"

export default function NotFound() {
    return (
      <Layout>
        <h1 class="!mb-0">Oops... Not found!</h1>
        <div class="border-b border-gray-300"></div>
        <figure class="rehype-figure"><img src="https://imgs.xkcd.com/comics/error_types.png" alt="https://xkcd.com/2303/" title="https://xkcd.com/2303/" /><figcaption>https://xkcd.com/2303/</figcaption></figure>
        <p>Have something in mind? Generally, a good place to start is <Link href="/kb">here</Link>.</p>
        {/* <p>Or now that you've arrived, check some of the recently updated pages.</p>
        <h2>Latest Pages</h2> */}
      </Layout>
    );
  }

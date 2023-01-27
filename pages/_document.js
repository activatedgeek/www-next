import Document, { Html, Head, Main, NextScript } from "next/document"

import { getConfig } from "../lib/next-config"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const { gcCode, siteUrl } = getConfig()
    return { ...initialProps, gcCode, siteUrl }
  }

  render() {
    const { siteUrl, gcCode } = this.props
    return (
      <Html lang="en">
        <Head>
          <script
            data-goatcounter={`https://${gcCode}.goatcounter.com/count`}
            async
            src="//gc.zgo.at/count.js"
          />
          <link rel="icon" href={`${siteUrl}/favicon.svg`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

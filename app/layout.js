import "./layout.css"
import "katex/dist/katex.min.css"
import "highlight.js/styles/github.css"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

import { commonMetadata, gcCode } from "../api/metadata"
import Header from "./header"
import Footer from "./footer"

export const metadata = commonMetadata

export default function Layout({ children }) {
  return (
    <html lang="en">
      <script
        data-goatcounter={`https://${gcCode}.goatcounter.com/count`}
        async
        src="//gc.zgo.at/count.js"
      />
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

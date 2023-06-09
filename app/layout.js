import { ClerkProvider } from "@clerk/nextjs"
import "katex/dist/katex.min.css"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

import "./layout.css"
import { commonMetadata, gcCode } from "../api/metadata"
import Header from "./header"
import Footer from "./footer"

export const metadata = commonMetadata

export default function Layout({ children }) {
  return (
    <ClerkProvider>
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
    </ClerkProvider>
  )
}

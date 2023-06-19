import Script from "next/script"
import { ClerkProvider } from "@clerk/nextjs"
import "katex/dist/katex.min.css"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

import "./layout.css"
import { commonMetadata } from "@/api/metadata"
import Header from "./header"
import Footer from "./footer"

export const metadata = commonMetadata

export default function Layout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: "/favicon.svg",
        },
        elements: {
          card: "mx-auto shadow-md",
          formButtonPrimary: "bg-blue-500 hover:bg-blue-600",
          footer: "hidden",
        },
      }}
    >
      <html lang="en">
        <Script
          data-goatcounter={`https://${process.env.GC_CODE}.goatcounter.com/count`}
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

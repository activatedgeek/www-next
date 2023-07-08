import Script from "next/script"
import { Assistant, Source_Serif_4 } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "katex/dist/katex.min.css"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

import "./layout.css"
import { commonMetadata } from "@/api/metadata"
import Header from "./header"
import Footer from "./footer"

const sansFont = Assistant({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-assistant",
})

const serifFont = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ss4",
})

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
      <html lang="en" className={`${sansFont.variable} ${serifFont.variable}`}>
        {process.env.GC_CODE ? (
          <Script
            data-goatcounter={`https://${process.env.GC_CODE}.goatcounter.com/count`}
            async
            src="//gc.zgo.at/count.js"
          />
        ) : null}
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}

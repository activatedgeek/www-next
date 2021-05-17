import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUserGraduate,
  faCode,
  faBrain,
  faHome,
} from "@fortawesome/free-solid-svg-icons"
import {
  faGithub,
  faYCombinator,
  faLinkedin,
  faStackOverflow,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"

import "katex/dist/katex.min.css"
import "highlight.js/styles/atom-one-dark.css"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

import { getConfig } from "../lib/next-config"

const IconLink = ({ title, icon, href, color }) => (
  <a
    title={title}
    className="m-1.5 text-gray-500"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <FontAwesomeIcon icon={icon} color={color} />
  </a>
)

const Header = () => {
  return (
    <div className="mx-auto flex justify-between bg-white sticky top-0 px-6 max-w-3xl sm:px-9 lg:max-w-4xl lg:px-12 xl:max-w-6xl border-b">
      <Image src="/sk.svg" width={70} height={70} className="shadow-none" />
      <div className="flex items-center">
        <Link href="/kb">
          <a className="mx-4">
            <FontAwesomeIcon icon={faBrain} /> kBayes
          </a>
        </Link>
        <Link href="/">
          <a className="mx-4">
            <FontAwesomeIcon icon={faHome} /> Home
          </a>
        </Link>
      </div>
    </div>
  )
}

const Footer = () => {
  const {
    author,
    social: { scholar, github, yc, linkedin, stackoverflow, twitter, code },
  } = getConfig()
  return (
    <>
      <div className="flex my-2 justify-center text-xl">
        <IconLink
          title="Semantic Scholar"
          icon={faUserGraduate}
          color="rgb(239,202,77)"
          href={scholar}
        />
        <IconLink
          title="Github"
          icon={faGithub}
          color="rgb(27,31,35)"
          href={github}
        />
        <IconLink
          title="Hacker News"
          icon={faYCombinator}
          color="rgb(251,78,9)"
          href={yc}
        />
        <IconLink
          title="LinkedIn"
          icon={faLinkedin}
          color="rgb(14,79,180)"
          href={linkedin}
        />
        <IconLink
          title="StackOverflow"
          icon={faStackOverflow}
          color="rgb(239,107,29)"
          href={stackoverflow}
        />
        <IconLink
          title="Twitter"
          icon={faTwitter}
          color="rgb(29,142,238)"
          href={twitter}
        />
        <IconLink title="Source Code" icon={faCode} href={code} />
      </div>
      <div className="flex justify-center">
        <p className="text-base text-gray-500">
          © {new Date().getFullYear()} {author}
        </p>
      </div>
    </>
  )
}

const Layout = ({
  children,
  frontmatter: { uri, title, description, area, cat, date, updated },
}) => {
  const {
    siteUrl,
    author,
    social: { twitter },
  } = getConfig()
  return (
    <>
      <Head>
        <title>
          {title} | {author}
        </title>

        <link rel="canonical" href={`${siteUrl}${uri}`} />
        <link rel="icon" href={`${siteUrl}/favicon.svg`} />

        {description ? <meta name="description" content={description} /> : null}

        <meta property="og:type" content="article" />
        <meta property="article:tag" content={`${area}, ${cat}`} />

        {date ? (
          <meta property="article:published_time" content={date} />
        ) : null}
        {updated ? (
          <meta property="article:modified_time" content={updated} />
        ) : null}

        <meta property="article:author" content={author} />
        <meta property="og:site_name" content={title} />
        <meta property="og:url" content={`${siteUrl}${uri}`} />
        <meta property="og:title" content={title} />
        {description ? (
          <meta property="og:description" content={description} />
        ) : null}

        <meta name="twitter:site" content={author} />
        <meta name="twitter:creator" content={twitter} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={`${siteUrl}${uri}`} />
        <meta name="twitter:title" content={title} />
        {description ? (
          <meta name="twitter:description" content={description} />
        ) : null}
      </Head>
      <Header />
      <div className="mx-auto px-4 py-5 max-w-3xl sm:px-6 sm:py-6 lg:max-w-4xl lg:py-8 lg:px-8 xl:max-w-6xl">
        <div className="mx-auto prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
          {children}
        </div>
        <div className="border-b my-6 border-gray-300" />
        <Footer />
      </div>
    </>
  )
}

export default Layout

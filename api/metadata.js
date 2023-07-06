export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://sanyamkapoor.com"
    : `${process.env.VERCEL_URL || "http://localhost:3000"}`

export const baseAuthor = {
  name: "Sanyam Kapoor",
  url: "https://sanyamkapoor.com",
}

export const creator = "Sanyam Kapoor"

export const publisher = "sanyamkapoor.com"

export const social = {
  scholar: "https://www.semanticscholar.org/author/153936584",
  github: "https://github.com/activatedgeek",
  linkedin: "https://www.linkedin.com/in/sanyamkapoor",
  stackoverflow: "https://stackoverflow.com/users/2425365",
  twitter: "https://twitter.com/psiyumm",
  code: "https://github.com/activatedgeek/www",
}

export const commonMetadata = {
  title: {
    default: creator,
    template: `%s | ${creator}`,
  },
  icons: {
    icon: "/favicon.svg",
  },
  metadataBase: new URL(baseUrl),
  creator,
  publisher,
  twitter: {
    card: "summary",
    creator: `@${social.twitter.split("/").slice(-1)}`,
  },
}

export function generateMetadataFromPageInfo(pageInfo) {
  const { title, description, authors, date, updated, internal, area, uri } =
    pageInfo

  return {
    title,
    description,
    keywords: [area],
    authors,
    alternates: {
      canonical: uri,
    },
    openGraph: {
      type: "article",
      title,
      description,
      authors: (authors || []).map(({ name }) => name),
      publishedTime: date,
      modifiedTime: updated,
    },
    robots: {
      index: !internal,
      follow: !internal,
      nocache: internal,
      googleBot: {
        index: !internal,
        follow: !internal,
      },
    },
    twitter: {
      title,
      description,
    },
  }
}

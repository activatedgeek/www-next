export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://sanyamkapoor.com"
    : `https://${process.env.VERCEL_URL || "localhost:3000"}`

export const baseAuthor = {
  name: "Sanyam Kapoor",
  url: "https://sanyamkapoor.com",
}

export const creator = "Sanyam Kapoor"

export const publisher = "sanyamkapoor.com"

export const social = {
  scholar: "https://go.sanyamkapoor.com/pubs",
  github: "https://github.com/activatedgeek",
  yc: "https://news.ycombinator.com/user?id=activatedgeek",
  linkedin: "https://www.linkedin.com/in/sanyamkapoor",
  stackoverflow: "https://stackoverflow.com/users/2425365",
  twitter: "https://twitter.com/snymkpr",
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

export const gcCode = process.env.GC_CODE

export function generateMetadataFromPageInfo(pageInfo) {
  const { title, description, authors, date, updated, internal, area, slug } =
    pageInfo

  return {
    title,
    description,
    keywords: [area],
    authors,
    alternates: {
      canonical: slug,
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

const { getAllRawPages } = require("./api/kb")

async function getAllRedirects() {
  return (await getAllRawPages())
    .map(({ uri, redirectsFrom }) => {
      if (redirectsFrom) {
        return redirectsFrom.map((source) => ({
          source,
          destination: uri,
          permanent: true,
        }))
      }
    })
    .filter((r) => r !== undefined)
    .flat()
}

module.exports = {
  images: {
    domains: ["images-na.ssl-images-amazon.com"],
  },
  env: {
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: "/login",
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  },
  eslint: {
    dirs: ["api", "app", "components"],
  },
  async redirects() {
    return [...(await getAllRedirects())]
  },
}

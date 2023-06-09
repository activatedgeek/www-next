export default {
  images: {
    domains: ["images-na.ssl-images-amazon.com", "pics.cdn.librarything.com"],
  },
  env: {
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: '/login',
  },
  eslint: {
    dirs: ["api", "app", "components"],
  },
  async redirects() {
    let allRedirects = [
      { source: "/kb/about", destination: "/", permanent: false },
    ]
    // allPages.map(({ slug: destination, redirectsFrom }) => {
    //   for (const source of redirectsFrom) {
    //     allRedirects.push({ source, destination, permanent: false })
    //   }
    // })
    return allRedirects
  },
}

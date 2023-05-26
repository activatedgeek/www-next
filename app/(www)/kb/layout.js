export default function Layout({ children }) {
  return (
    <div className="mx-auto px-4 py-5 max-w-3xl sm:px-6 sm:py-6 lg:max-w-4xl lg:py-8 lg:px-8 xl:max-w-6xl">
      <div className="mx-auto relative prose sm:prose lg:prose-lg xl:prose-xl 2xl:prose-2xl">
        {children}
      </div>
    </div>
  )
}

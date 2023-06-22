export default function Layout({ children }) {
  return (
    <div className="py-4">
      <div className="mx-auto p-3 max-w-2xl sm:px-5 lg:max-w-3xl lg:px-7 xl:max-w-4xl">
        <div className="mx-auto relative prose sm:prose lg:prose-lg xl:prose-xl 2xl:prose-2xl">
          {children}
        </div>
      </div>
    </div>
  )
}

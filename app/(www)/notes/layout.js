import Layout from "../kb/layout"

export default function NotesLayout({ children }) {
  return (
    <>
      <div className="mx-auto px-4 py-1 max-w-3xl sm:px-6 lg:max-w-4xl lg:px-8 xl:max-w-6xl bg-yellow-100 text-sm text-center text-yellow-500">
        <p>Private.</p>
      </div>
      <Layout>{children}</Layout>
    </>
  )
}

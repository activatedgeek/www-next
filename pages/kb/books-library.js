import { getServerConfig } from "../../lib/next-config"
import getAllBooks from "../../lib/librarything"
import SinglePage from "../../components/single-page"
import Rating from "../../components/rating"

export default function BooksLibrary({ frontmatter, books }) {
  return (
    <SinglePage frontmatter={frontmatter}>
      <p>My library of books, fetched from my account at LibraryThing.</p>
      <div className="flex flex-row flex-wrap items-center">
        {books.map(({ isbn, year, cover, title, rating }) => (
          <div key={isbn} className="flex flex-col items-center text-sm">
            <a
              href={`https://www.librarything.com/search.php?search=${encodeURIComponent(
                title
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <picture>
                <source srcSet={cover} />
                <img
                  className="inline-block m-3"
                  src={cover}
                  alt={title}
                  width={150}
                  height={300}
                  loading="lazy"
                />
              </picture>
            </a>
            <Rating value={rating} />
            <span>({year})</span>
          </div>
        ))}
      </div>
    </SinglePage>
  )
}

export async function getStaticProps() {
  const { libraryThingUserId: userid } = getServerConfig()
  const books = await getAllBooks({ userid, count: 200 })

  return {
    props: {
      frontmatter: {
        title: "My Books Library",
        description: "My collection fetched from LibraryThing",
        area: "cult",
        cat: "lit",
        date: "May 17 2021, 19:10 +0530",
      },
      books,
    },
  }
}

import getAllBooks from "@/api/librarything"
import { baseAuthor, generateMetadataFromPageInfo } from "@/api/metadata"
import PageInfo from "@/components/pageInfo"
import Rating from "@/components/rating"

const frontmatter = {
  title: "My Book Library",
  description: "My book library hosted on LibraryThing",
  area: "cult",
  uri: "library/books",
  authors: [baseAuthor],
}

export const dynamic = "force-static"

export const metadata = generateMetadataFromPageInfo(frontmatter)

export default async function Books() {
  const books = await getAllBooks({ count: 500 })
  return (
    <>
      <PageInfo {...frontmatter} />
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
    </>
  )
}

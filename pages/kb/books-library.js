import { getServerConfig } from "../../lib/next-config"
import getAllBooks from "../../lib/librarything"
import SinglePage from "../../components/single-page"
import Rating from "../../components/rating"


export default function BooksLibrary({ frontmatter, books }) {
  return (
    <SinglePage frontmatter={frontmatter}>
      <p>
        My library of books, fetched from my account at LibraryThing. Often some
        titles may have an older publication date.
      </p>
      <table>
        <tbody>
          <tr>
            <th>Year</th>
            <th>Title / Rating</th>
            <th>Author</th>
          </tr>
          {
            books.map(({ isbn, year, cover, title, author, rating }) => (
              <tr key={isbn}>
                <td>{year}</td>
                <td className="flex items-center">
                  <img className="inline-block m-0" src={cover} alt={title} width={50} height={66} loading="lazy" />
                  <div className="border-box pl-3">
                  <a href={`https://www.librarything.com/search.php?search=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer">{title}</a>
                  <Rating value={rating} />
                  </div>
                </td>
                <td>
                <i>{author}</i>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </SinglePage>
  )
}


export async function getStaticProps() {
  const { libraryThingUserId: userid } = getServerConfig()
  const books = await getAllBooks({ userid, count: 100 })

  return {
    props: {
      frontmatter: {
        title: 'My Books Library',
        description: 'My collection fetched from LibraryThing',
        area: 'cult',
        cat: 'lit',
        date: 'May 17 2021, 19:10 +0530',
      },
      books
    },
  }
}

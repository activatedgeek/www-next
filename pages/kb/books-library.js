import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons"

import { getServerConfig } from "../../lib/next-config"
import getAllBooks from "../../lib/librarything"
import SinglePage from "../../components/single-page"

const Rating = ({ value }) => {
  const rating = Math.floor(value)
  return (
    <div className="block overflow-hidden">
      {Array.apply(0, Array(rating)).map((_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className="text-yellow-400"
        />
      ))}
      {value > rating ? (
        <FontAwesomeIcon
          icon={faStarHalf}
          className="text-yellow-400"
        />
      ) : null}
    </div>
  )
}

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
            books.map(({ isbn, year, title, author, rating }) => (
              <tr key={isbn}>
                <td>{year}</td>
                <td>
                  <a href={`https://www.librarything.com/search.php?search=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer">{title}</a>
                  <Rating value={rating} />
                </td>
                <td>
                <i>{author}</i>
                </td>
                <td></td>
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

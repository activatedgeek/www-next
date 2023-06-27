import format from "date-fns/format"
import { getFavoriteMovies, getFavoriteTv } from "@/api/tmdb"
import { baseAuthor, generateMetadataFromPageInfo } from "@/api/metadata"
import PageInfo from "@/components/pageInfo"

const frontmatter = {
  title: "My Movies & Library",
  description: "My movies and TV favorites hosted on TMDb.",
  area: "cult",
  uri: "library/tv",
  authors: [baseAuthor],
}

export const dynamic = "force-static"

export const metadata = generateMetadataFromPageInfo(frontmatter)

export default async function Books() {
  const movies = await getFavoriteMovies()
  const tv = await getFavoriteTv()

  return (
    <>
      <PageInfo {...frontmatter} />
      <nav className="toc">
        <details>
          <summary className="toc-summary">
            <h4 className="toc-summary-text">Table of Contents</h4>
          </summary>
          <ul className="toc-level toc-level-1">
            <li className="toc-item toc-item-h2">
              <a className="toc-link toc-link-h2" href="#movies">
                Movies
              </a>
            </li>
            <li className="toc-item toc-item-h2">
              <a className="toc-link toc-link-h2" href="#tv">
                TV
              </a>
            </li>
          </ul>
        </details>
      </nav>
      <p>My library of favorites, fetched from my account at TMDb.</p>
      <h2 id="movies">Movies</h2>
      <div className="grid gap-3 grid-cols-4 lg:grid-cols-5 text-center text-slate-500">
        {movies.map(({ id, release_date, title, poster_path }) => (
          <div key={id}>
            <a
              href={`https://www.themoviedb.org/movie/${id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <picture>
                <source
                  srcSet={`https://www.themoviedb.org/t/p/w150_and_h225_bestv2${poster_path}`}
                />
                <img
                  className="!my-0"
                  src={`https://www.themoviedb.org/t/p/w150_and_h225_bestv2${poster_path}`}
                  alt={title}
                  loading="lazy"
                />
              </picture>
            </a>
            <p className="!my-1">({format(new Date(release_date), "yyyy")})</p>
          </div>
        ))}
      </div>
      <h2 id="tv">TV</h2>
      <div className="grid gap-3 grid-cols-4 lg:grid-cols-5 text-center text-slate-500">
        {tv.map(({ id, first_air_date, name, poster_path }) => (
          <div key={id}>
            <a
              href={`https://www.themoviedb.org/tv/${id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <picture>
                <source
                  srcSet={`https://www.themoviedb.org/t/p/w150_and_h225_bestv2${poster_path}`}
                />
                <img
                  className="!my-0"
                  src={`https://www.themoviedb.org/t/p/w150_and_h225_bestv2${poster_path}`}
                  alt={name}
                  loading="lazy"
                />
              </picture>
            </a>
            <p className="!my-1">
              ({format(new Date(first_air_date), "yyyy")})
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

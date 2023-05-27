import format from "date-fns/format"
import { getFavoriteMovies, getFavoriteTv } from "../../../../api/tmdb"
import {
  baseAuthor,
  generateMetadataFromPageInfo,
} from "../../../../api/metadata"
import PageInfo from "../../kb/pageInfo"

const pageInfo = {
  title: "My Movies & Library",
  description: "My movies and TV favorites hosted on TMDb.",
  area: "cult",
  slug: "library/tv",
  authors: [baseAuthor],
}

export const metadata = generateMetadataFromPageInfo(pageInfo)

export default async function Books() {
  const movies = await getFavoriteMovies()
  const tv = await getFavoriteTv()

  return (
    <>
      <h1 className="!mb-0">{pageInfo.title}</h1>
      <PageInfo frontmatter={pageInfo} />
      <div className="border-b border-gray-300" />
      <p>My library of favorites, fetched from my account at TMDb.</p>
      <h2 id="movies">Movies</h2>
      <div className="flex flex-row flex-wrap items-center">
        {movies.map(({ id, release_date, title, poster_path }) => (
          <div key={id} className="flex flex-col items-center text-sm">
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
                  className="inline-block m-3"
                  src={`https://www.themoviedb.org/t/p/w150_and_h225_bestv2${poster_path}`}
                  alt={title}
                  width={100}
                  height={150}
                  loading="lazy"
                />
              </picture>
            </a>
            <span>({format(new Date(release_date), "yyyy")})</span>
          </div>
        ))}
      </div>
      <h2 id="tv">TV</h2>
      <div className="flex flex-row flex-wrap items-center">
        {tv.map(({ id, first_air_date, name, poster_path }) => (
          <div key={id} className="flex flex-col items-center text-sm">
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
                  className="inline m-3"
                  src={`https://www.themoviedb.org/t/p/w150_and_h225_bestv2${poster_path}`}
                  alt={name}
                  width={100}
                  height={150}
                  loading="lazy"
                />
              </picture>
            </a>
            <span>({format(new Date(first_air_date), "yyyy")})</span>
          </div>
        ))}
      </div>
    </>
  )
}

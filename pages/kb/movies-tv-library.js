import format from "date-fns/format"

import { getServerConfig } from "../../lib/next-config"
import SinglePage from "../../components/single-page"
import { getFavoriteMovies, getFavoriteTv } from "../../lib/tmdb"

export default function MoviesLibrary({ frontmatter, movies, tv }) {
  return (
    <SinglePage frontmatter={frontmatter}>
      <div className="toc-container">
        <nav className="toc">
          <h3>Table of Contents</h3>
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
        </nav>
      </div>
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
              <img
                className="inline-block m-3"
                src={`https://www.themoviedb.org/t/p/w150_and_h225_bestv2${poster_path}`}
                alt={title}
                width={100}
                height={150}
                loading="lazy"
              />
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
              <img
                className="inline m-3"
                src={`https://www.themoviedb.org/t/p/w150_and_h225_bestv2${poster_path}`}
                alt={name}
                width={100}
                height={150}
                loading="lazy"
              />
            </a>
            <span>({format(new Date(first_air_date), "yyyy")})</span>
          </div>
        ))}
      </div>
    </SinglePage>
  )
}

export async function getStaticProps() {
  const { tmdbApiKey: apiKey, tmdbSessionId: sessionId } = getServerConfig()

  return {
    props: {
      frontmatter: {
        title: "My Movies and TV Library",
        description: "My collection fetched from TMDb",
        area: "cult",
        cat: "arts",
        date: "Jul 24 2021, 13:50 +0530",
      },
      movies: await getFavoriteMovies({ apiKey, sessionId }),
      tv: await getFavoriteTv({ apiKey, sessionId }),
    },
  }
}

import { MovieDb } from "moviedb-promise"
import format from "date-fns/format"

export async function getFavoriteMovies() {
  const apiKey = process.env.TMDB_API_KEY
  const sessionId = process.env.TMDB_SESSION_ID

  if (apiKey === undefined) {
    console.warn("Missing TMDB_API_KEY, skip fetching Movie favorites.")
    return []
  }

  const moviedb = new MovieDb(apiKey)
  moviedb.sessionId = sessionId

  let movies = []
  let { page, results, total_pages } = await moviedb.accountFavoriteMovies()
  movies.push(...results)
  while (page < total_pages) {
    ;({ page, results, total_pages } = await moviedb.accountFavoriteMovies({
      page: page + 1,
    }))
    movies.push(...results)
  }
  movies.sort(function (a, b) {
    return (
      parseInt(format(new Date(b.release_date), "yyyy")) -
      parseInt(format(new Date(a.release_date), "yyyy"))
    )
  })

  return movies
}

export async function getFavoriteTv() {
  const apiKey = process.env.TMDB_API_KEY
  const sessionId = process.env.TMDB_SESSION_ID

  if (apiKey === undefined) {
    console.warn("Missing TMDB_API_KEY, skip fetching TV favorites.")
    return []
  }

  const moviedb = new MovieDb(apiKey)
  moviedb.sessionId = sessionId

  let tv = []
  let { page, results, total_pages } = await moviedb.accountFavoriteTv()
  tv.push(...results)
  while (page < total_pages) {
    ;({ page, results, total_pages } = await moviedb.accountFavoriteTv({
      page: page + 1,
    }))
    tv.push(...results)
  }
  tv.sort(function (a, b) {
    return (
      parseInt(format(new Date(b.first_air_date), "yyyy")) -
      parseInt(format(new Date(a.first_air_date), "yyyy"))
    )
  })

  return tv
}

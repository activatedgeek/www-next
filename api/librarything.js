export default async function getAllBooks({ count }) {
  const userid = process.env.LIBRARYTHING_USERID
  if (userid === undefined) {
    console.warn(
      "Missing LIBRARYTHING_USERID environment variable. Skipping book library fetch"
    )
    return []
  }

  const url = `https://www.librarything.com/api_getdata.php?userid=${userid}&max=${count}&showTags=1&showReviews=1&showCollections=1&responseType=json`
  const lt = await fetch(url).then((res) => res.json())

  let books = []
  for (const [id, book] of Object.entries(lt.books)) {
    const { collections } = book
    if (collections["1"] === undefined) {
      continue
    }
    const {
      title,
      author_fl: author,
      ISBN_cleaned: isbn,
      publicationdate: year,
      cover,
      rating,
    } = book
    books.push({
      id,
      isbn,
      title,
      year: parseInt(year, 10),
      author,
      cover,
      rating,
    })
  }

  books.sort(({ year: a }, { year: b }) => {
    return b - a
  })

  return books
}

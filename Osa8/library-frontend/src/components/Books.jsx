import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";
const Books = (props) => {
  const [genre, setGenre] = useState(null);

  const {
    data: bookData,
    error: bookError,
    loading: bookLoading,
  } = useQuery(ALL_BOOKS, {
    variables: genre ? { genre } : {},
    skip: !props.show,
  });

  const {
    data: genreData,
    loading: genreLoading,
    error: genreError,
  } = useQuery(ALL_GENRES);

  if (!props.show) {
    return null;
  }

  if (bookLoading || genreLoading) {
    return <div>Loading...</div>;
  }

  if (bookError || genreError) {
    return <div>Error: {bookError.message || genreError.message}</div>;
  }

  const books = bookData.allBooks;
  const allGenres = genreData.allGenres;

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{genre ? genre : "all genres"}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allGenres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  );
};

export default Books;

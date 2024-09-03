import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
const Books = (props) => {
  const [genre, setGenre] = useState(null);

  const genres = [
    "refactoring",
    "agile",
    "patterns",
    "design",
    "crime",
    "classic",
  ];

  const { data, error, loading } = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !props.show,
  });

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const books = data.allBooks;

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
      {genres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  );
};

export default Books;

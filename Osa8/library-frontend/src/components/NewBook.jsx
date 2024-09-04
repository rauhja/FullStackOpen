import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from "../queries";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        };
      });
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        if (
          !allAuthors
            .map((a) => a.name)
            .includes(response.data.addBook.author.name)
        ) {
          return {
            allAuthors: allAuthors.concat({
              ...response.data.addBook.author,
              bookCount: 1,
            }),
          };
        }
        return {
          allAuthors: allAuthors.map((a) =>
            a.name === response.data.addBook.author.name
              ? { ...a, bookCount: a.bookCount + 1 }
              : a
          ),
        };
      });
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    addBook({ variables: { title, author, published, genres } });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;

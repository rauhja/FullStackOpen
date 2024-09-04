import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Recommend = ({ show, user }) => {
  const { data, error, loading } = useQuery(ALL_BOOKS, {
    variables: { genre: user?.favoriteGenre },
    skip: !show || !user,
  });

  if (!show) {
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
        books in your favorite genre <b>{user.favoriteGenre}</b>
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
    </div>
  );
};

export default Recommend;

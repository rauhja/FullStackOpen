import { useState } from "react";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommend from "./components/Recommend";

import { ME, BOOK_ADDED, ALL_BOOKS } from "./queries";
import { updateCache } from "./utils";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const result = useQuery(ME, {
    skip: !token,
  });
  const user = result?.data?.me || null;

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      window.alert(`New book added: ${addedBook.title}`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommend show={page === "recommend"} user={user} />

      <Login setToken={setToken} show={page === "login"} />
    </div>
  );
};

export default App;

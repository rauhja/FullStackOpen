export const updateCache = (cache, queryBooks, addedBook) => {
  const uniqByTitle = (books) => {
    let seen = new Set();
    return books.filter((book) => {
      let title = book.title;
      return seen.has(title) ? false : seen.add(title);
    });
  };

  cache.updateQuery(queryBooks, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    };
  });
};

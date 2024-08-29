import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";

const UpdateAuthor = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [updateAuthor, result] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log("author not found");
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();

    updateAuthor({ variables: { name, born: Number(born) } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default UpdateAuthor;

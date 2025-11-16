import { SyntheticEvent, useEffect, useState } from "react";
import { DiaryEntry, NewDiaryEntry } from "./types";
import { getAllEntries, createEntry } from "./diaryService";
import "./App.css";

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>({
    date: "",
    visibility: "",
    weather: "",
    comment: "",
  });

  useEffect(() => {
    getAllEntries().then((data) => {
      setEntries(data);
    });
  }, []);

  const entryCreation = (event: SyntheticEvent) => {
    event.preventDefault();
    createEntry(newEntry).then((data) => {
      setEntries(entries.concat(data));
    });
    setNewEntry({
      date: "",
      visibility: "",
      weather: "",
      comment: "",
    });
  };
  return (
    <>
      <div>
        <h3>Add new entry</h3>
        <form onSubmit={entryCreation} className="form">
          <div className="input-container">
            <label htmlFor="input-date">Date: </label>
            <input
              id="input-date"
              value={newEntry?.date}
              onChange={(event) =>
                setNewEntry({ ...newEntry, date: event.target.value })
              }
            />
          </div>
          <div className="input-container">
            <label htmlFor="input-visibility">Visibility: </label>
            <input
              id="input-visibility"
              value={newEntry?.visibility}
              onChange={(event) =>
                setNewEntry({ ...newEntry, visibility: event.target.value })
              }
            />
          </div>
          <div className="input-container">
            <label htmlFor="input-weather">Weather: </label>
            <input
              id="input-weather"
              value={newEntry?.weather}
              onChange={(event) =>
                setNewEntry({ ...newEntry, weather: event.target.value })
              }
            />
          </div>
          <div className="input-container">
            <label htmlFor="input-comment">Comment: </label>
            <input
              id="input-comment"
              value={newEntry?.comment}
              onChange={(event) =>
                setNewEntry({ ...newEntry, comment: event.target.value })
              }
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>

      <h3>Diary Entries</h3>
      {entries.map((entry) => {
        return (
          <div className="card" key={entry.id}>
            <h3>{entry.date}</h3>
            <p>visibility: {entry.visibility}</p>
            <p>weather: {entry.weather}</p>
          </div>
        );
      })}
    </>
  );
}

export default App;

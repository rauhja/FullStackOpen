import { SyntheticEvent, useEffect, useState } from "react";
import { DiaryEntry, NewDiaryEntry } from "./types";
import { getAllEntries, createEntry } from "./diaryService";
import axios from "axios";
import "./App.css";

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
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
    setErrorMessage("");
    createEntry(newEntry)
      .then((data) => {
        setEntries(entries.concat(data));
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An unexpected error occurred");
        }
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
      <div className="form-container">
        <h3>Add new entry</h3>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={entryCreation} className="form">
          <div className="input-container">
            <label htmlFor="input-date">Date: </label>
            <input
              id="input-date"
              type="date"
              value={newEntry?.date}
              onChange={(event) =>
                setNewEntry({ ...newEntry, date: event.target.value })
              }
            />
          </div>
          <div className="input-container">
            <label>Visibility: </label>
            <div className="radio-container">
              great
              <input
                type="radio"
                name="visibility"
                value="great"
                onChange={(event) =>
                  setNewEntry({ ...newEntry, visibility: event.target.value })
                }
              />
              good
              <input
                type="radio"
                name="visibility"
                value="good"
                onChange={(event) =>
                  setNewEntry({ ...newEntry, visibility: event.target.value })
                }
              />
              ok
              <input
                type="radio"
                name="visibility"
                value="ok"
                onChange={(event) =>
                  setNewEntry({ ...newEntry, visibility: event.target.value })
                }
              />
              poor
              <input
                type="radio"
                name="visibility"
                value="poor"
                onChange={(event) =>
                  setNewEntry({ ...newEntry, visibility: event.target.value })
                }
              />
            </div>
          </div>
          <div className="input-container">
            <label>Weather: </label>
            <div className="radio-container">
              sunny
              <input
                type="radio"
                name="weather"
                value="sunny"
                onChange={(event) =>
                  setNewEntry({ ...newEntry, weather: event.target.value })
                }
              />
              rainy
              <input
                type="radio"
                name="weather"
                value="rainy"
                onChange={(event) =>
                  setNewEntry({ ...newEntry, weather: event.target.value })
                }
              />
              cloudy
              <input
                type="radio"
                name="weather"
                value="cloudy"
                onChange={(event) =>
                  setNewEntry({ ...newEntry, weather: event.target.value })
                }
              />
              stormy
              <input
                type="radio"
                name="weather"
                value="stormy"
                onChange={(event) =>
                  setNewEntry({ ...newEntry, weather: event.target.value })
                }
              />
              windy
              <input
                type="radio"
                name="weather"
                value="windy"
                onChange={(event) =>
                  setNewEntry({ ...newEntry, weather: event.target.value })
                }
              />
            </div>
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
      <div className="entry-container">
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
      </div>
    </>
  );
}

export default App;

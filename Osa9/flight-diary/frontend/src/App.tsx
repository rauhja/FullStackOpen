import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import "./App.css";
import axios from "axios";

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3000/api/diaries")
      .then((response) => {
        setEntries(response.data);
      });
  }, []);

  return (
    <>
      <div>
        <h3>Add new entry</h3>
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

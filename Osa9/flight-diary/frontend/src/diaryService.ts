import axios from "axios";
import { NewDiaryEntry, DiaryEntry } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllEntries = () => {
  return axios
    .get<DiaryEntry[]>("http://localhost:3000/api/diaries")
    .then((response) => response.data);
};

export const createEntry = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then((response) => response.data);
};

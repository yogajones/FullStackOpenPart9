import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries/";

export const getAllEntries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

export const createEntry = (object: NewDiaryEntry) => {
  return axios
    .post<NewDiaryEntry>(baseUrl, object)
    .then((response) => response.data);
};

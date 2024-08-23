import { useState } from "react";
import { createEntry } from "../services/diaryService";
import { Visibility, Weather } from "../types";

export const NewEntryForm = () => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

  const handleNewEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await createEntry({
      date: date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment: comment,
    });
    setDate("");
    setWeather("");
    setVisibility("");
    setComment("");
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleNewEntry}>
        {" "}
        date:{" "}
        <input value={date} onChange={(event) => setDate(event.target.value)} />
        <br />
        weather:{" "}
        <input
          value={weather}
          onChange={(event) => setWeather(event.target.value)}
        />
        <br />
        visibility:{" "}
        <input
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)}
        />
        <br />
        comment:{" "}
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />{" "}
        <br />
        <button type="submit">add</button>{" "}
      </form>
    </div>
  );
};

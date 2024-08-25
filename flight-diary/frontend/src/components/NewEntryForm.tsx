import axios from "axios";
import { useState } from "react";
import { createEntry } from "../services/diaryService";
import { Visibility, Weather } from "../types";

export const NewEntryForm = () => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [visibility, setVisibility] = useState<Visibility | null>(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleNewEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!weather || !visibility) {
      setError("Both weather and visibility are required.");
      return;
    }

    try {
      await createEntry({
        date: date,
        weather: weather,
        visibility: visibility,
        comment: comment,
      });
      setDate("");
      setWeather(null);
      setVisibility(null);
      setComment("");
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      <form onSubmit={handleNewEntry}>
        {" "}
        date:{" "}
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br />
        weather:{" "}
        <label>
          sunny
          <input
            type="radio"
            name="weather"
            value={Weather.Sunny}
            checked={weather === Weather.Sunny}
            onChange={() => setWeather(Weather.Sunny)}
          />
        </label>
        <label>
          rainy
          <input
            type="radio"
            name="weather"
            value={Weather.Rainy}
            checked={weather === Weather.Rainy}
            onChange={() => setWeather(Weather.Rainy)}
          />
        </label>
        <label>
          cloudy
          <input
            type="radio"
            name="weather"
            value={Weather.Cloudy}
            checked={weather === Weather.Cloudy}
            onChange={() => setWeather(Weather.Cloudy)}
          />
        </label>
        <label>
          stormy
          <input
            type="radio"
            name="weather"
            value={Weather.Stormy}
            checked={weather === Weather.Stormy}
            onChange={() => setWeather(Weather.Stormy)}
          />
        </label>
        <label>
          windy
          <input
            type="radio"
            name="weather"
            value={Weather.Windy}
            checked={weather === Weather.Windy}
            onChange={() => setWeather(Weather.Windy)}
          />
        </label>
        <br />
        visibility:{" "}
        <label>
          great
          <input
            type="radio"
            name="visibility"
            value={Visibility.Great}
            checked={visibility === Visibility.Great}
            onChange={() => setVisibility(Visibility.Great)}
          />
        </label>
        <label>
          good
          <input
            type="radio"
            name="visibility"
            value={Visibility.Good}
            checked={visibility === Visibility.Good}
            onChange={() => setVisibility(Visibility.Good)}
          />
        </label>
        <label>
          ok
          <input
            type="radio"
            name="visibility"
            value={Visibility.Ok}
            checked={visibility === Visibility.Ok}
            onChange={() => setVisibility(Visibility.Ok)}
          />
        </label>
        <label>
          poor
          <input
            type="radio"
            name="visibility"
            value={Visibility.Poor}
            checked={visibility === Visibility.Poor}
            onChange={() => setVisibility(Visibility.Poor)}
          />
        </label>
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

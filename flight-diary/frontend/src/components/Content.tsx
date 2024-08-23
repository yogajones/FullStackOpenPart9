import { DiaryEntry } from "../types";

interface ContentProps {
  entries: DiaryEntry[];
}

export const Content = ({ entries }: ContentProps) => {
  return (
    <div>
      <h2>Diary Entries</h2>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>weather: {entry.weather}</p>
          <p>visibility: {entry.visibility}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

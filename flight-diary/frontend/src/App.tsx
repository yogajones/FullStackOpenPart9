import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import { getAllEntries } from "./services/diaryService";
import { Content } from "./components/Content";
import { NewEntryForm } from "./components/NewEntryForm";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then((data) => {
      setEntries(data);
    });
  }, []);

  return (
    <div>
      <h1>Flight Diary App</h1>
      <NewEntryForm />
      <Content entries={entries} />
    </div>
  );
};

export default App;

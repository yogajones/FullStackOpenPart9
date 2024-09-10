import { Entry } from "../../types";
import { Box, Typography } from "@mui/material";
import { EntryDetails } from "./EntryDetails";

export const EntryList = ({ entries }: { entries: Entry[] }) => {
  return (
    <Box>
      <Typography sx={{ marginTop: "2.5em" }} variant="h6">
        Entries:
      </Typography>

      {entries.length === 0 ? (
        <Typography variant="body1" sx={{ marginTop: "0.5em" }}>
          No entries found.
        </Typography>
      ) : (
        entries
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((entry) => (
            <Box key={entry.id} sx={{ marginTop: "0.5em" }}>
              <EntryDetails entry={entry} />
            </Box>
          ))
      )}
    </Box>
  );
};

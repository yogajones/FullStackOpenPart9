import { Entry } from "../../types";
import { Box, Typography as Typo, List, ListItem } from "@mui/material";

export const Entries = ({ entries }: { entries: Entry[] }) => {
  return (
    <Box>
      <Typo sx={{ marginTop: "2.5em" }} variant="h6">
        Entries:
      </Typo>

      {entries.length === 0 ? (
        <Typo variant="body1" sx={{ marginTop: "0.5em" }}>
          No entries found.
        </Typo>
      ) : (
        entries.map((entry) => (
          <Box key={entry.id} sx={{ marginTop: "0.5em" }}>
            <Typo variant="body1">
              {entry.date}: {entry.description}
            </Typo>
            {entry.diagnosisCodes && (
              <List dense={true}>
                {entry.diagnosisCodes.map((code) => (
                  <ListItem key={code} sx={{ paddingLeft: "3em" }}>
                    <Typo>{code}</Typo>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        ))
      )}
    </Box>
  );
};

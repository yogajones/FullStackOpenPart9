import { Box, Typography } from "@mui/material";
import { DetailItem } from "./DetailItem";
import { DiagnosisList } from "./DiagnosisList";

export const BaseEntryDetails = ({
  title,
  icon,
  entry,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  entry: {
    date: string;
    description: string;
    diagnosisCodes?: string[];
    specialist: string;
  };
  children?: React.ReactNode;
}) => (
  <Box
    sx={{
      border: "1px solid black",
      padding: 2,
      borderRadius: 1,
      marginBottom: 2,
    }}
  >
    <Box display="inline-flex" alignItems="center" marginBottom={2}>
      <Typography variant="h6">
        <strong>{title}</strong>
      </Typography>
      {icon}
    </Box>
    <DetailItem label="Date" value={entry.date} />
    {children}
    <DetailItem label="Description" value={entry.description} />
    {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
      <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
    )}
    <DetailItem label="Saved by" value={entry.specialist} />
  </Box>
);

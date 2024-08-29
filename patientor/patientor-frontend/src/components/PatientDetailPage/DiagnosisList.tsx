import { List, ListItem } from "@mui/material";
import { DiagnosisDetails } from "./DiagnosisDetails";
import { useFetchDiagnoses } from "../../hooks/useFetchDiagnoses";

export const DiagnosisList = ({
  diagnosisCodes,
}: {
  diagnosisCodes: string[];
}) => {
  const diagnoses = useFetchDiagnoses();

  return (
    <List dense>
      {diagnosisCodes.map((code) => (
        <ListItem key={code} sx={{ paddingLeft: 3 }}>
          <DiagnosisDetails code={code} diagnoses={diagnoses} />
        </ListItem>
      ))}
    </List>
  );
};

import { useMatch } from "react-router-dom";
import { GenderIcon } from "./GenderIcon";
import { EntryList } from "./EntryList";
import { Box, Typography } from "@mui/material";
import { useFetchPatientDetails } from "../../hooks/useFetchPatientDetails";

const PatientDetailPage = () => {
  const match = useMatch("/api/patients/:id");
  const idParam = match?.params?.id;

  const { patient, loading, error } = useFetchPatientDetails(idParam);

  if (loading) {
    return <Typography>Loading patient details...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!patient) {
    return <Typography>Patient not found.</Typography>;
  }

  return (
    <Box className="App" sx={{ marginTop: "2.5em" }}>
      <Typography align="left" variant="h5">
        {patient.name}
        <GenderIcon gender={patient.gender} />
      </Typography>
      <Typography sx={{ marginTop: "1.5em" }}>ssn: {patient.ssn}</Typography>
      <Typography sx={{ marginTop: "0.5em" }}>
        occupation: {patient.occupation}
      </Typography>
      <EntryList entries={patient.entries} />
    </Box>
  );
};

export default PatientDetailPage;

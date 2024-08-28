import { useMatch } from "react-router-dom";
import { useFetchPatientDetails } from "./useFetchPatientDetails";
import { GenderIcon } from "./Gender";
import { Entries } from "./Entries";
import { Box, Typography as Typo } from "@mui/material";

const PatientDetailPage = () => {
  const match = useMatch("/api/patients/:id");
  const idParam = match?.params?.id;

  const { patient, loading, error } = useFetchPatientDetails(idParam);

  if (loading) {
    return <Typo>Loading patient details...</Typo>;
  }

  if (error) {
    return <Typo color="error">{error}</Typo>;
  }

  if (!patient) {
    return <Typo>Patient not found.</Typo>;
  }

  return (
    <Box className="App" sx={{ marginTop: "2.5em" }}>
      <Typo align="left" variant="h5">
        {patient.name}
        <GenderIcon gender={patient.gender} />
      </Typo>
      <Typo sx={{ marginTop: "1.5em" }}>ssn: {patient.ssn}</Typo>
      <Typo sx={{ marginTop: "0.5em" }}>occupation: {patient.occupation}</Typo>
      <Entries entries={patient.entries} />
    </Box>
  );
};

export default PatientDetailPage;

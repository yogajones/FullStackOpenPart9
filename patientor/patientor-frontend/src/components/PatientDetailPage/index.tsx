import { useMatch } from "react-router-dom";
import { GenderIcon } from "./GenderIcon";
import { EntryList } from "./EntryList";
import { Box, Button, Typography } from "@mui/material";
import { useFetchPatientDetails } from "../../hooks/useFetchPatientDetails";
import axios from "axios";
import { useEffect, useState } from "react";
import { EntryFormValues, Patient } from "../../types";
import patientService from "../../services/patients";
import AddEntryModal from "../AddEntryModal";
import { useFetchDiagnoses } from "../../hooks/useFetchDiagnoses";

const PatientDetailPage = () => {
  const match = useMatch("/api/patients/:id");
  const idParam = match?.params?.id;

  const [patient, setPatient] = useState<Patient | null>(null);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const [entryType, setEntryType] = useState<
    "Hospital" | "OccupationalHealthcare" | "HealthCheck"
  >("Hospital");

  const openModal = (
    type: "Hospital" | "OccupationalHealthcare" | "HealthCheck",
  ): void => {
    setEntryType(type);
    setModalOpen(true);
  };
  const closeModal = (): void => {
    setModalOpen(false);
    setErrorMessage(undefined);
  };

  const {
    patient: fetchedPatient,
    loading,
    error,
  } = useFetchPatientDetails(idParam);

  const diagnoses = useFetchDiagnoses();

  useEffect(() => {
    if (fetchedPatient) {
      setPatient(fetchedPatient);
    }
  }, [fetchedPatient]);

  if (loading) {
    return <Typography>Loading patient details...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!patient) {
    return <Typography>Patient not found.</Typography>;
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.createEntry(patient.id, values);
      setPatient((patient) =>
        patient ? { ...patient, entries: [...patient.entries, entry] } : null,
      );
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            "",
          );
          console.error(message);
          setErrorMessage(message);
        } else {
          setErrorMessage("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setErrorMessage("Unknown error");
      }
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={errorMessage}
        onClose={closeModal}
        diagnoses={diagnoses}
        type={entryType}
      />

      <Box
        sx={{
          border: "2px solid #ccc",
          borderRadius: "8px",
          padding: "1.5em",
          justifyContent: "space-around",
          marginTop: "2em",
          maxWidth: "sm",
        }}
      >
        <Typography variant="h6" align="left" gutterBottom>
          Add New Entry
        </Typography>
        <Box
          sx={{
            display: "flex",
            marginTop: "1em",
          }}
        >
          <Button
            variant="contained"
            sx={{ marginRight: "1.5em" }}
            onClick={() => openModal("Hospital")}
          >
            Hospital
          </Button>
          <Button
            variant="contained"
            sx={{ marginRight: "1.5em" }}
            onClick={() => openModal("OccupationalHealthcare")}
          >
            Occupational Healthcare
          </Button>
          <Button variant="contained" onClick={() => openModal("HealthCheck")}>
            Health Check
          </Button>
        </Box>
      </Box>

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={errorMessage}
        onClose={closeModal}
        diagnoses={diagnoses}
        type={entryType}
      />
      <EntryList entries={patient.entries} />
    </Box>
  );
};

export default PatientDetailPage;

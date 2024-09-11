import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";

import AddEntryForm from "./AddEntryForm";
import { Diagnosis, EntryFormValues } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  diagnoses: Diagnosis[];
  type: "Hospital" | "OccupationalHealthcare" | "HealthCheck";
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  diagnoses,
  type,
}: Props) => (
  <Dialog
    fullWidth={true}
    maxWidth="md"
    open={modalOpen}
    onClose={() => onClose()}
  >
    <DialogTitle>New entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm
        onSubmit={onSubmit}
        onCancel={onClose}
        diagnosisOptions={diagnoses}
        type={type}
      />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;

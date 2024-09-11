import { useState, SyntheticEvent } from "react";

import {
  TextField,
  Grid,
  Button,
  InputLabel,
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { Diagnosis, EntryFormValues, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnosisOptions: Diagnosis[];
  type: "Hospital" | "OccupationalHealthcare" | "HealthCheck";
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 350,
      width: 250,
    },
  },
};

const healthCheckRatingLabels: { [key in HealthCheckRating]: string } = {
  0: "Healthy",
  1: "Low risk",
  2: "High risk",
  3: "Critical risk",
};

const AddEntryForm = ({
  onCancel,
  onSubmit,
  diagnosisOptions,
  type,
}: Props) => {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");
  const [employerName, setEmployerName] = useState("");

  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const [healthCheckRating, setHealthCheckRating] = useState<
    HealthCheckRating | undefined
  >();

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    let entry: EntryFormValues;

    switch (type) {
      case "OccupationalHealthcare":
        entry = {
          type: "OccupationalHealthcare",
          description,
          date,
          specialist,
          diagnosisCodes,
          employerName,
          sickLeave:
            sickLeaveStartDate && sickLeaveEndDate
              ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate }
              : undefined,
        };
        break;
      case "Hospital":
        entry = {
          type: "Hospital",
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;
      case "HealthCheck":
        if (healthCheckRating === undefined) {
          console.log("Healthcheck rating is:", healthCheckRating);
          throw new Error("Healthcheck rating is required!"); // replace with alert to user
        }
        entry = {
          type: "HealthCheck",
          description,
          date,
          specialist,
          diagnosisCodes,
          healthCheckRating,
        };
        break;
    }

    onSubmit(entry);
  };

  const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    const { value } = event.target;
    if (Array.isArray(value)) {
      setDiagnosisCodes(value);
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputLabel>Date</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <InputLabel>Diagnosis codes</InputLabel>
            <Select
              multiple
              fullWidth
              value={diagnosisCodes}
              onChange={onDiagnosisCodesChange}
              input={<OutlinedInput label="Diagnosis codes" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {diagnosisOptions.map((diagnosis) => (
                <MenuItem key={diagnosis.code} value={diagnosis.code}>
                  <Checkbox
                    checked={diagnosisCodes.indexOf(diagnosis.code) > -1}
                  />
                  <ListItemText
                    primary={`${diagnosis.code}: ${diagnosis.name}`}
                  />
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
          </Grid>

          {type === "OccupationalHealthcare" && (
            <>
              <Grid item xs={12}>
                <TextField
                  label="Employer"
                  fullWidth
                  value={employerName}
                  onChange={({ target }) => setEmployerName(target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Sick leave start</InputLabel>
                <TextField
                  type="date"
                  fullWidth
                  value={sickLeaveStartDate}
                  onChange={(e) => setSickLeaveStartDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Sick leave end</InputLabel>
                <TextField
                  type="date"
                  fullWidth
                  value={sickLeaveEndDate}
                  onChange={(e) => setSickLeaveEndDate(e.target.value)}
                />
              </Grid>
            </>
          )}

          {type === "Hospital" && (
            <>
              <Grid item xs={12}>
                <InputLabel>Discharge Date</InputLabel>
                <TextField
                  type="date"
                  fullWidth
                  value={dischargeDate}
                  onChange={(e) => setDischargeDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Discharge criteria"
                  fullWidth
                  value={dischargeCriteria}
                  onChange={({ target }) => setDischargeCriteria(target.value)}
                />
              </Grid>
            </>
          )}

          {type === "HealthCheck" && (
            <Grid item xs={12}>
              <InputLabel>General health rating</InputLabel>
              <Select
                fullWidth
                value={healthCheckRating ?? ""}
                onChange={(e) =>
                  setHealthCheckRating(e.target.value as HealthCheckRating)
                }
              >
                {Object.entries(healthCheckRatingLabels).map(
                  ([value, label]) => (
                    <MenuItem key={value} value={Number(value)}>
                      {label}
                    </MenuItem>
                  ),
                )}
              </Select>
            </Grid>
          )}

          <Grid item xs={6}>
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" fullWidth>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;

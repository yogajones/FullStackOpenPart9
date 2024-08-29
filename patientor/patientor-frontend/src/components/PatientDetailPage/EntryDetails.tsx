import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import MonitorHeart from "@mui/icons-material/MonitorHeart";
import { Box, Typography } from "@mui/material";
import {
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  Entry,
} from "../../types";
import HealthRatingBar from "../HealthRatingBar";
import { DetailItem } from "./DetailItem";
import { assertNever } from "../../utils/assertNever";
import { BaseEntryDetails } from "./BaseEntryDetails";

const HospitalDetails = ({ entry }: { entry: HospitalEntry }) => (
  <BaseEntryDetails
    title="Hospital"
    icon={<LocalHospitalIcon sx={{ marginLeft: 1 }} />}
    entry={entry}
  >
    <DetailItem label="Discharged" value={entry.discharge.date} />
    <DetailItem label="Discharge criteria" value={entry.discharge.criteria} />
  </BaseEntryDetails>
);

const OccupationalHealthcareDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => (
  <BaseEntryDetails
    title="Occupational Healthcare"
    icon={<WorkIcon sx={{ marginLeft: 1 }} />}
    entry={entry}
  >
    <DetailItem label="Employer" value={entry.employerName} />
    {entry.sickLeave && (
      <DetailItem
        label="Sick leave"
        value={`from ${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}`}
      />
    )}
  </BaseEntryDetails>
);

const HealthcheckDetails = ({ entry }: { entry: HealthCheckEntry }) => (
  <BaseEntryDetails
    title="Health Check"
    icon={<MonitorHeart sx={{ marginLeft: 1 }} />}
    entry={entry}
  >
    <Box display="flex" alignItems="center">
      <Typography>
        <strong>Health rating: </strong>
      </Typography>
      <Box marginLeft={1}>
        <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
      </Box>
    </Box>
  </BaseEntryDetails>
);

export const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareDetails entry={entry} />;
    case "HealthCheck":
      return <HealthcheckDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

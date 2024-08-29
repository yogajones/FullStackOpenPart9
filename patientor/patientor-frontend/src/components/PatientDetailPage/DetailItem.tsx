import { Typography } from "@mui/material";

export const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <Typography variant="body1">
    <strong>{label}:</strong> {value}
  </Typography>
);

import { useFetchDiagnoses } from "./useFetchDiagnoses";
import { Typography as Typo } from "@mui/material";

export const Diagnosis = ({ code }: { code: string }) => {
  const diagnoses = useFetchDiagnoses();
  const diagnosis = diagnoses.find((d) => d.code === code);
  return (
    <Typo>
      {code} - {diagnosis?.name}
    </Typo>
  );
};

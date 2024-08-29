import { Diagnosis } from "../../types";
import { DetailItem } from "./DetailItem";

export const DiagnosisDetails = ({
  code,
  diagnoses,
}: {
  code: string;
  diagnoses: Diagnosis[];
}) => {
  const diagnosis = diagnoses.find((d) => d.code === code);
  return diagnosis ? (
    <DetailItem label={code} value={diagnosis.name} />
  ) : (
    <DetailItem
      label={code}
      value={"Internal error: failed to find diagnosis name"}
    />
  );
};

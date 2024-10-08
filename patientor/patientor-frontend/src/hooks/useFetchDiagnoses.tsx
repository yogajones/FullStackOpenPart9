import { useEffect, useState } from "react";
import { Diagnosis } from "../types";
import diagnosisService from "../services/diagnoses";

export const useFetchDiagnoses = () => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      const sortedDiagnoses = diagnoses.sort((a, b) =>
        a.code.localeCompare(b.code),
      );
      setDiagnoses(sortedDiagnoses);
    };

    void fetchDiagnoses();
  }, []);

  return diagnoses;
};

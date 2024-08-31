import { useState, useEffect } from "react";
import { Patient } from "../types";
import patientService from "../services/patients";

export const useFetchPatientDetails = (idParam: string | undefined) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      if (!idParam) {
        setError("Invalid patient ID.");
        setLoading(false);
        return;
      }

      try {
        const data = await patientService.findById(idParam);
        setPatient(data);
      } catch (err) {
        console.error("Failed to fetch patient details:", err);
        setError("Failed to fetch patient details.");
      } finally {
        setLoading(false);
      }
    };

    void fetchPatientDetails();
  }, [idParam]);

  return { patient, loading, error };
};

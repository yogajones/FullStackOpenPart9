import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils/validation/toNewPatient";
import { toNewEntry } from "../utils/validation/toNewEntry";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const patient = patientService.findById(req.params.id);
    if (patient) {
      const newEntry = toNewEntry(req.body);
      const addedEntry = patientService.addEntry(patient, newEntry);
      res.json(addedEntry);
    }
    res.sendStatus(404);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;

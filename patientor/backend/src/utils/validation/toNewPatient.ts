import { Gender, NewPatient, Entry } from "../../types";
import { isString, isDate } from "./shared";

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};

const isEntry = (entry: unknown): entry is Entry => {
  if (
    !entry ||
    typeof entry !== "object" ||
    !("type" in entry) ||
    typeof entry.type !== "string"
  ) {
    return false;
  }

  return entry.type in ["HealthCheck", "Hospital", "OccupationalHealthcare"];
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date of birth: " + date);
  }
  return date;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing SSN");
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }

  return gender;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries) {
    return [];
  }

  if (!Array.isArray(entries)) {
    throw new Error("Incorrect or missing entries");
  }

  entries.forEach((entry) => {
    if (!isEntry(entry)) {
      throw new Error("Incorrect entry: " + JSON.stringify(entry));
    }
  });

  return entries;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };

    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

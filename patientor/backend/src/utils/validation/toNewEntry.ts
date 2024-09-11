import {
  Diagnosis,
  Discharge,
  HealthCheckRating,
  NewEntry,
  SickLeave,
} from "../../types";
import { isDate, isString } from "./shared";

const isSickLeave = (sickLeave: object): sickLeave is SickLeave => {
  if (
    !("startDate" in sickLeave) ||
    !("endDate" in sickLeave) ||
    typeof sickLeave.startDate !== "string" ||
    typeof sickLeave.endDate !== "string" ||
    !isDate(sickLeave.startDate) ||
    !isDate(sickLeave.endDate)
  ) {
    return false;
  }
  return true;
};

const isDischarge = (discharge: object): discharge is Discharge => {
  if (
    !("date" in discharge) ||
    !("criteria" in discharge) ||
    typeof discharge.date !== "string" ||
    typeof discharge.criteria !== "string" ||
    !isDate(discharge.date) ||
    !isString(discharge.criteria)
  ) {
    return false;
  }
  return true;
};

const isHealthCheckRating = (
  healthCheckRating: number,
): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseDiagnosisCodes = (obj: unknown): Array<Diagnosis["code"]> => {
  if (!obj || typeof obj !== "object" || !("diagnosisCodes" in obj)) {
    return [] as Array<Diagnosis["code"]>; // HOX TYPE ASSERTION
  }

  return obj.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object" || !isDischarge(discharge)) {
    throw new Error("Incorrect or missing discharge");
  }
  return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employer name");
  }
  return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== "object" || !isSickLeave(sickLeave)) {
    throw new Error("Incorrect or missing sick leave");
  }
  return sickLeave;
};

const parseHealthCheckRating = (
  healthCheckRating: unknown,
): HealthCheckRating => {
  if (
    healthCheckRating === undefined ||
    isNaN(Number(healthCheckRating)) ||
    !isHealthCheckRating(Number(healthCheckRating))
  ) {
    throw new Error("Incorrect or missing health check rating");
  }
  return Number(healthCheckRating);
};

export const toNewEntry = (obj: unknown): NewEntry => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in obj &&
    "date" in obj &&
    "specialist" in obj &&
    "type" in obj
  ) {
    let baseEntry = {
      description: parseDescription(obj.description),
      date: parseDate(obj.date),
      specialist: parseSpecialist(obj.specialist),
      diagnosisCodes: parseDiagnosisCodes(obj),
    };

    switch (obj.type) {
      case "Hospital":
        if ("discharge" in obj) {
          const newEntry: NewEntry = {
            ...baseEntry,
            type: obj.type,
            discharge: parseDischarge(obj.discharge),
          };
          return newEntry;
        }
        throw new Error("Incorrect data: discharge information is missing");
      case "OccupationalHealthcare":
        if ("employerName" in obj) {
          let newEntry: NewEntry = {
            ...baseEntry,
            type: obj.type,
            employerName: parseEmployerName(obj.employerName),
            sickLeave: undefined,
          };
          if ("sickLeave" in obj) {
            newEntry.sickLeave = parseSickLeave(obj.sickLeave);
          }
          return newEntry;
        }
        throw new Error("Incorrect data: employer name is missing");

      case "HealthCheck":
        if ("healthCheckRating" in obj) {
          let newEntry: NewEntry = {
            ...baseEntry,
            type: obj.type,
            healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
          };
          return newEntry;
        }
        throw new Error("Incorrect data: health check rating is missing");

      default:
        throw new Error(`Incorrect type of new entry: ${JSON.stringify(obj)}`);
    }
  }

  throw new Error("Incorrect data: some fields are missing");
};

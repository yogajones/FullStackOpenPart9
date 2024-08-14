import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  return res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (!isNaN(height) && !isNaN(weight)) {
      const bmi: string = calculateBmi(height, weight);
      return res.json({ height, weight, bmi });
    } else {
      return res.status(400).send({ error: "malformatted parameters" });
    }
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(400).send({ errorMessage });
  }
});

app.post("/exercises", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    const { daily_exercises, target }: any = req.body;

    if (!daily_exercises || !target) {
      return res.status(400).json({ error: "parameters missing" });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!Array.isArray(daily_exercises) || isNaN(target)) {
      return res.status(400).json({ error: "malformatted parameters" });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return res.send(calculateExercises(Number(target), daily_exercises));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(400).send({ errorMessage });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

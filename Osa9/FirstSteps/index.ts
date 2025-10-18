import express from "express";
import qs from "qs";
import { calculateBmi } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.set("query parser", (str: string) => qs.parse(str, {}));

app.get("/hello", (_req, res) => {
  return res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  return res.send(calculateBmi(Number(height), Number(weight)));
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((exercise: unknown) => isNaN(Number(exercise))) ||
    isNaN(Number(target))
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return res.json(
    exerciseCalculator(daily_exercises as number[], target as number)
  );
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT: ${PORT}`);
});

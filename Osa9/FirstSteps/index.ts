import express from "express";
import qs from "qs";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.set("query parser", (str: string) => qs.parse(str, {}));

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  res.send(calculateBmi(Number(height), Number(weight)));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT: ${PORT}`);
});

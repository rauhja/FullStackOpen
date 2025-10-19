import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

const corsOptions = {
  origin: "http://localhost:5173",
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);

app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

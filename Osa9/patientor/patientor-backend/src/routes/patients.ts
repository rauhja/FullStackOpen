import express from "express";
import patientService from "../services/patientService";
import newPatientSchema from "../utils";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatientInfo());
});

router.post("/", (req, res) => {
  try {
    const newPatient = newPatientSchema.parse(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error " });
    }
  }
});

export default router;

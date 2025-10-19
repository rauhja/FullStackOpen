import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatientInfo());
});

router.post("/", (req, res) => {
  const newPatient = toNewPatient(req.body);
  const addedPatient = patientService.addPatient(newPatient);
  res.json(addedPatient);
});

export default router;

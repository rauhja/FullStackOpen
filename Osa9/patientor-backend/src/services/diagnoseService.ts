import diagnoseData from "../../data/diagnoses";
import { DiagnoseEntry } from "../types";

const diagnoses: DiagnoseEntry[] = diagnoseData;

const getDiagnoses = (): DiagnoseEntry[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};

import { Box, List, ListItem, Typography } from "@mui/material";
import { Gender, Patient } from "../../types";
import { useParams } from "react-router-dom";
import { Male, Female, Transgender } from "@mui/icons-material";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";

const genderIcon = (gender: Gender) => {
  switch (gender) {
    case "male":
      return <Male />;
    case "female":
      return <Female />;
    default:
      return <Transgender />;
  }
};

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnosis, setDiagnosis] = useState<Map<string, string>>(new Map());
  const [error, setError] = useState("");
  const id = useParams().id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          setError("Patient ID not found");
          return;
        }
        const [patientData, diagnoseData] = await Promise.all([
          patientService.getPatientById(id),
          diagnosisService.getDiagnoses(),
        ]);
        setPatient(patientData);
        const diagnosisMap = new Map(diagnoseData.map((d) => [d.code, d.name]));
        setDiagnosis(diagnosisMap);
      } catch (err) {
        setError("Failed to load patient");
      }
    };
    void fetchData();
  }, [id]);

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div className="App">
      <Box>
        <Typography
          align="left"
          variant="h5"
          sx={{ fontWeight: 600, marginTop: 2 }}
          gutterBottom={true}
        >
          {patient?.name}
          {patient && genderIcon(patient.gender)}
        </Typography>
        <Typography>SSN: {patient?.ssn}</Typography>
        <Typography>Occupation: {patient?.occupation}</Typography>
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography variant="h6" gutterBottom={true}>
          Entries
        </Typography>
        {patient?.entries.map((entry) => (
          <Box key={entry.id}>
            <Typography>{entry.date}</Typography>
            <Typography>{entry.description}</Typography>
            <List dense={true}>
              {entry.diagnosisCodes?.map((code) => (
                <ListItem key={code}>
                  - {code} {diagnosis.get(code)}
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default PatientPage;

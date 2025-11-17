import { Box, List, ListItem, Typography } from "@mui/material";
import { Gender, Patient } from "../../types";
import { useParams } from "react-router-dom";
import { Male, Female, Transgender } from "@mui/icons-material";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";

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
  const [error, setError] = useState("");
  const id = useParams().id;

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (!id) {
          setError("Patient ID not found");
          return;
        }
        const patient = await patientService.getPatientById(id);
        setPatient(patient);
      } catch (err) {
        setError("Failed to load patient");
      }
    };
    void fetchPatient();
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
        {patient &&
          patient.entries.map((entry) => (
            <>
              <Typography>{entry.date}</Typography>
              <Typography>{entry.description}</Typography>
              <List dense={true}>
                {entry.diagnosisCodes?.map((diagnose) => (
                  <ListItem>- {diagnose}</ListItem>
                ))}
              </List>
            </>
          ))}
      </Box>
    </div>
  );
};

export default PatientPage;

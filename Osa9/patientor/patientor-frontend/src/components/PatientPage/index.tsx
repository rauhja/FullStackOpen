import { Box, List, ListItem, Typography } from "@mui/material";
import { Entry, Gender, Patient } from "../../types";
import { useParams } from "react-router-dom";
import { Male, Female, Transgender } from "@mui/icons-material";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import HospitalEntry from "./HospitalEntryDetail";
import OccupationalEntryDetail from "./OccupationalEntryDetail";
import HealthCheckEntryDetail from "./HealthCheckEntryDetail";

import { Work, MedicalServices, LocalHospital } from "@mui/icons-material";

const genderIcon = (gender: Gender) => {
  switch (gender) {
    case Gender.Male:
      return <Male />;
    case Gender.Female:
      return <Female />;
    case Gender.Other:
      return <Transgender />;
  }
};

const EntryTypeIcon: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <LocalHospital />;
    case "OccupationalHealthcare":
      return <Work />;
    case "HealthCheck":
      return <MedicalServices />;
  }
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalEntryDetail entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetail entry={entry} />;
  }
};

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnosis] = useState<Map<string, string>>(new Map());
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
          <Box key={entry.id} sx={{ padding: 1, border: 1, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {entry.date} <EntryTypeIcon entry={entry} />
            </Typography>
            <Typography sx={{ fontStyle: "italic" }}>
              {entry.description}
            </Typography>
            <List dense={true} disablePadding={true} sx={{ padding: 1 }}>
              {entry.diagnosisCodes?.map((code) => (
                <ListItem key={code}>
                  - {code} {diagnoses.get(code)}
                </ListItem>
              ))}
            </List>
            <EntryDetails entry={entry} />
            <Typography sx={{ paddingTop: 2 }}>
              Diagnose by {entry.specialist}
            </Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default PatientPage;

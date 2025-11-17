import { Typography } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../types";

const OccupationalEntryDetail: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <>
      <Typography>Employer: {entry.employerName}</Typography>
      {entry.sickLeave && (
        <Typography>
          Sick Leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
        </Typography>
      )}
    </>
  );
};

export default OccupationalEntryDetail;

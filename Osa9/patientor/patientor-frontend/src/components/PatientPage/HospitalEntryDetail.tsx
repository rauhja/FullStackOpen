import { Typography } from "@mui/material";
import { HospitalEntry } from "../../types";

const HospitalEntryDetail: React.FC<{
  entry: HospitalEntry;
}> = ({ entry }) => {
  return (
    <>
      <Typography>Discharge Date: {entry.discharge.date}</Typography>
      <Typography>Discharge Criteria: {entry.discharge.criteria}</Typography>
    </>
  );
};

export default HospitalEntryDetail;

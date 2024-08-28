import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { Gender } from "../../types";

export const GenderIcon = ({ gender }: { gender: Gender }) => {
  if (gender === Gender.Male) {
    return <MaleIcon />;
  }
  if (gender === Gender.Female) {
    return <FemaleIcon />;
  }
  return null;
};

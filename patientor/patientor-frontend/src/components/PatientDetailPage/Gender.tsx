import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { Gender } from "../../types";

interface GenderIconProps {
  gender: Gender;
}

export const GenderIcon = ({ gender }: GenderIconProps) => {
  if (gender === Gender.Male) {
    return <MaleIcon />;
  }
  if (gender === Gender.Female) {
    return <FemaleIcon />;
  }
  return null;
};

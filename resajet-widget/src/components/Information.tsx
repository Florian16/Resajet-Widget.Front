import { Box, Grid, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FormulaireReservation } from "../interfaces/FormulaireReservation";
import PhoneInput from "react-phone-input-2";

type InformationProps = {
  formulaire: FormulaireReservation;
  handleChange: (e: any) => void;
  handleCustomChange: (name: string, value: any) => void;
};

const PersonalTextField = styled(TextField)`
  & .MuiOutlinedInput-root.Mui-focused {
    & fieldset {
      border-color: black;
    }
  }
`;

export default function Information({
  formulaire,
  handleChange,
  handleCustomChange,
}: InformationProps) {
  const generateAutoCompleteValue = () => {
    return Math.random().toString(36).substring(2);
  };

  return (
    <Box component="form">
      <Grid container spacing={2} alignItems={"center"}>
        <Grid item xs={3}>
          <span className="resajet-label">Nom</span>
        </Grid>
        <Grid item xs={9}>
          <PersonalTextField
            onChange={handleChange}
            name="lastname"
            value={formulaire?.lastname}
            size="small"
            style={{ marginTop: "3%" }}
            autoComplete={generateAutoCompleteValue()}
          />
        </Grid>
        <Grid item xs={3}>
          <span className="resajet-label">Prénom</span>
        </Grid>
        <Grid item xs={9}>
          <PersonalTextField
            onChange={handleChange}
            name="firstname"
            value={formulaire?.firstname}
            size="small"
            style={{ marginTop: "3%" }}
            autoComplete={generateAutoCompleteValue()}
          />
        </Grid>
        <Grid item xs={3}>
          <span className="resajet-label">E-mail</span>
        </Grid>
        <Grid item xs={9}>
          <PersonalTextField
            type="email"
            onChange={handleChange}
            name="mail"
            value={formulaire?.mail}
            size="small"
            style={{ marginTop: "3%" }}
            autoComplete={generateAutoCompleteValue()}
          />
        </Grid>
        <Grid item xs={3}>
          <span className="resajet-label">Téléphone</span>
        </Grid>
        <Grid item xs={9}>
          <PhoneInput
            specialLabel={""}
            country={"be"}
            value={formulaire?.phone}
            onChange={(e) => handleCustomChange("phone", e)}
          />
        </Grid>
        <Grid item xs={12}>
          <span className="resajet-label">Commentaire</span>
          <PersonalTextField
            rows={5}
            multiline
            size="small"
            name="comment"
            onChange={handleChange}
            value={formulaire?.comment}
            style={{ marginTop: "3%" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

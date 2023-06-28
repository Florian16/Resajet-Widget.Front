import { Box, Grid, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FormulaireReservation } from "../interfaces/FormulaireReservation";

type InformationProps = {
  formulaire: FormulaireReservation;
  handleChange: (e: any) => void;
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
}: InformationProps) {
  const generateAutoCompleteValue = () => {
    return Math.random().toString(36).substring(2); // Générer une valeur aléatoire
  };
  return (
    <Box component="form" autoComplete="off">
      <Grid container>
        <Grid
          md={6}
          style={{
            paddingLeft: "3%",
            paddingRight: "3%",
          }}
        >
          <span className="resajet-label">Nom</span>
          <PersonalTextField
            onChange={handleChange}
            name="lastname"
            value={formulaire?.lastname}
            size="small"
            style={{ marginTop: "3%" }}
            autoComplete={generateAutoCompleteValue()}
          />
        </Grid>

        <Grid
          md={6}
          style={{
            paddingLeft: "3%",
            paddingRight: "3%",
          }}
        >
          <span className="resajet-label">Prénom</span>
          <PersonalTextField
            onChange={handleChange}
            name="firstname"
            value={formulaire?.firstname}
            size="small"
            style={{ marginTop: "3%" }}
            autoComplete={generateAutoCompleteValue()}
          />
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "3%" }}>
        <Grid
          md={6}
          style={{
            paddingLeft: "3%",
            paddingRight: "3%",
          }}
        >
          <span className="resajet-label">E-mail</span>
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

        <Grid
          md={6}
          style={{
            paddingLeft: "3%",
            paddingRight: "3%",
          }}
        >
          <span className="resajet-label">Téléphone</span>
          <PersonalTextField
            onChange={handleChange}
            name="phone"
            value={formulaire?.phone}
            size="small"
            style={{ marginTop: "3%" }}
            autoComplete={generateAutoCompleteValue()}
          />
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "3%" }}>
        <Grid
          md={12}
          style={{
            paddingLeft: "3%",
            paddingRight: "3%",
          }}
        >
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

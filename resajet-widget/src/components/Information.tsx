import { Box, Grid, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FormulaireReservation } from "../interfaces/FormulaireReservation";
import PhoneInput from "react-phone-input-2";
import { TFunction } from "i18next";

type InformationProps = {
  formulaire: FormulaireReservation;
  handleChange: (e: any) => void;
  handleCustomChange: (name: string, value: any) => void;
  t: TFunction;
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
  t,
}: InformationProps) {
  const generateAutoCompleteValue = () => {
    return Math.random().toString(36).substring(2);
  };

  return (
    <Box component="form">
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        className="resajet-information"
      >
        <Grid item xs={4}>
          <span className="resajet-label">{t("information.nom")}</span>
        </Grid>
        <Grid item xs={8}>
          <PersonalTextField
            onChange={handleChange}
            name="lastname"
            value={formulaire?.lastname}
            size="small"
            style={{ marginTop: "3%" }}
            autoComplete={generateAutoCompleteValue()}
          />
        </Grid>
      </Grid>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        className="resajet-information"
      >
        <Grid item xs={4}>
          <span className="resajet-label">{t("information.prenom")}</span>
        </Grid>
        <Grid item xs={8}>
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
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        className="resajet-information"
      >
        <Grid item xs={4}>
          <span className="resajet-label">{t("information.email")}</span>
        </Grid>
        <Grid item xs={8}>
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
      </Grid>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        className="resajet-information"
      >
        <Grid item xs={4}>
          <span className="resajet-label">{t("information.telephone")}</span>
        </Grid>
        <Grid item xs={8}>
          <PhoneInput
            specialLabel={""}
            country={"be"}
            value={formulaire?.phone}
            onChange={(e) => handleCustomChange("phone", e)}
          />
        </Grid>
      </Grid>
      <Grid container alignItems={"center"} justifyContent={"center"}>
        <Grid item xs={12}>
          <span className="resajet-label">{t("information.commentaire")}</span>
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

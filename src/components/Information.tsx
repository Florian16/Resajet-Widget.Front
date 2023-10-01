import {
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReservationRequest } from "../requests/ReservationRequest";
import PhoneInput from "react-phone-input-2";
import { TFunction } from "i18next";
import { CompanyContextProps } from "../contexts/CompanyContext";

type InformationProps = {
  formulaire: ReservationRequest;
  handleChange: (e: any) => void;
  handleCustomChange: (name: string, value: any) => void;
  handleCheckboxChange: (e: any) => void;
  companyContext: CompanyContextProps;
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
  handleCheckboxChange,
  companyContext,
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
          <span className="resajet-label">{t("information.nom")} *</span>
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
          <span className="resajet-label">{t("information.prenom")} *</span>
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
          <span className="resajet-label">{t("information.email")} *</span>
        </Grid>
        <Grid item xs={8}>
          <PersonalTextField
            type="email"
            onChange={handleChange}
            name="email"
            value={formulaire?.email}
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
            value={formulaire?.phoneNumber}
            onChange={(e) => handleCustomChange("phoneNumber", e)}
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
            style={{
              marginTop: "3%",
              marginBottom: "3%",
              whiteSpace: "pre-line",
            }}
          />
        </Grid>
      </Grid>

      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ paddingBottom: "2%" }}
      >
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="conditionUtilisation"
                checked={formulaire?.conditionUtilisation}
                onChange={handleCheckboxChange}
              />
            }
            label={
              <span className="resajet-label">
                J'accepte les{" "}
                <a
                  href={`https://www.resajet.com/conditions-utilisation/${companyContext?.company?.id}`}
                  style={{
                    color: companyContext?.company?.companySetting?.mainColor,
                  }}
                  target="_blank"
                >
                  conditions d'utilisation
                </a>{" "}
                *
              </span>
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
}

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
import { Error } from "../dtos/Error/Error";
import { ErrorType } from "../enums/ErrorType";
import { useEffect } from "react";
import { documentService } from "../services/document.service";
import { useTranslation } from "react-i18next";

type InformationProps = {
  formulaire: ReservationRequest;
  formulaireInitial: ReservationRequest;
  handleChange: (e: any) => void;
  handleCustomChange: (name: string, value: any) => void;
  handleCheckboxChange: (e: any) => void;
  companyContext: CompanyContextProps;
  errors: Error[];
  errorsChecking: () => number;
  errorsManagement: (errors: Error[]) => void;
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
  errors,
  errorsChecking,
  formulaireInitial,
  errorsManagement,
  t,
}: InformationProps) {
  const { i18n } = useTranslation();
  const generateAutoCompleteValue = () => {
    return Math.random().toString(36).substring(2);
  };

  useEffect(() => {
    if (JSON.stringify(formulaire) !== JSON.stringify(formulaireInitial))
      errorsChecking();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formulaire, formulaireInitial]);

  const openTermsConditions = () => {
    documentService
      .getDocument(companyContext?.company?.id, i18n.language)
      .then((response) => {
        const downloadUrl = window.URL.createObjectURL(response);
        window.open(downloadUrl, "_blank");
        URL.revokeObjectURL(downloadUrl);
      })
      .catch((e) => {
        errorsManagement([
          {
            type: ErrorType.TermsConditions,
            message: e?.response?.data?.title,
            step: 1,
          },
        ]);
      });
  };

  return (
    <Box component="form">
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        className="resajet-information"
        id="lastname"
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
          {errors.findIndex((e) => e.type == ErrorType.Lastname) > -1 && (
            <div className="resajet-widget-input-error">
              {errors.find((e) => e.type == ErrorType.Lastname)?.message}
            </div>
          )}
        </Grid>
      </Grid>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        className="resajet-information"
        id="firstname"
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
          {errors.findIndex((e) => e.type == ErrorType.Firstname) > -1 && (
            <div className="resajet-widget-input-error">
              {errors.find((e) => e.type == ErrorType.Firstname)?.message}
            </div>
          )}
        </Grid>
      </Grid>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        className="resajet-information"
        id="email"
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
          {errors.findIndex((e) => e.type == ErrorType.Email) > -1 && (
            <div className="resajet-widget-input-error">
              {errors.find((e) => e.type == ErrorType.Email)?.message}
            </div>
          )}
        </Grid>
      </Grid>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        className="resajet-information"
        id="phoneNumber"
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
          {errors.findIndex((e) => e.type == ErrorType.PhoneNumber) > -1 && (
            <div className="resajet-widget-input-error">
              {errors.find((e) => e.type == ErrorType.PhoneNumber)?.message}
            </div>
          )}
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

      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="newsletter"
              checked={formulaire?.newsletter}
              onChange={handleCheckboxChange}
            />
          }
          label={
            <span className="resajet-label">
              <p> {t("information.newsletter")}</p>
            </span>
          }
        />
        {errors.findIndex((e) => e.type == ErrorType.Newsletter) > -1 && (
          <div className="resajet-widget-input-error">
            {errors.find((e) => e.type == ErrorType.Newsletter)?.message}
          </div>
        )}
      </Grid>

      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ paddingBottom: "2%", marginTop: "-3%" }}
        id="termsConditions"
      >
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="termsConditions"
                checked={formulaire?.termsConditions}
                onChange={handleCheckboxChange}
              />
            }
            label={
              <span className="resajet-label">
                {t("information.jAccepteLes")}{" "}
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    openTermsConditions();
                  }}
                  style={{
                    color: companyContext?.company?.companySetting?.mainColor,
                  }}
                  target="_blank"
                >
                  {t("information.conditionsUtilisation")}
                </a>{" "}
                *
              </span>
            }
          />
          {errors.findIndex((e) => e.type == ErrorType.TermsConditions) >
            -1 && (
            <div className="resajet-widget-input-error">
              {errors.find((e) => e.type == ErrorType.TermsConditions)?.message}
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

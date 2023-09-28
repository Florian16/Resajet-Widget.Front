import { CompanyContextProps } from "../contexts/CompanyContext";
import { Grid, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";
import flagFr from "../assets/img/fr.png";
import flagNl from "../assets/img/nl.png";
import flagUk from "../assets/img/uk.png";

type HeaderProps = {
  companyContext: CompanyContextProps;
};

export default function Header({ companyContext }: HeaderProps) {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div
      className="resajet-header"
      style={{
        backgroundColor: companyContext.company?.mainColor,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={9} className="resajet-header-title">
          <span>{t("header.titre")}</span>
        </Grid>
        <Grid item xs={3} className="resajet-header-flag">
          <Select value={i18n.language} onChange={handleLanguageChange}>
            <MenuItem value="fr-FR">
              <img src={flagFr} style={{ marginTop: "5px" }}></img>
            </MenuItem>
            <MenuItem value="nl-NL">
              <img src={flagNl} style={{ marginTop: "5px" }}></img>
            </MenuItem>
            <MenuItem value="en-US">
              <img src={flagUk} style={{ marginTop: "5px" }}></img>
            </MenuItem>
          </Select>
        </Grid>
      </Grid>
    </div>
  );
}

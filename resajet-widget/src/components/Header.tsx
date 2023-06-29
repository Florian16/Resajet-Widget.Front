import { RestaurantContextProps } from "../contexts/RestaurantContext";
import { Grid, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";

type HeaderProps = {
  restaurantContext: RestaurantContextProps;
};

export default function Header({ restaurantContext }: HeaderProps) {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div
      className="resajet-header"
      style={{
        backgroundColor: restaurantContext.restaurantSettings?.mainColor,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={9}>
          <span>{t("header.titre")}</span>
        </Grid>
        <Grid item xs={3} className="resajet-header-flag">
          <Select value={i18n.language} onChange={handleLanguageChange}>
            <MenuItem value="fr">
              <span
                className="flag-icon flag-icon-fr"
                style={{ fontSize: "1.4rem" }}
              ></span>
            </MenuItem>
            <MenuItem value="nl">
              <span
                className="flag-icon flag-icon-nl"
                style={{ fontSize: "1.4rem" }}
              ></span>
            </MenuItem>
            <MenuItem value="en">
              <span
                className="flag-icon flag-icon-gb"
                style={{ fontSize: "1.4rem" }}
              ></span>
            </MenuItem>
          </Select>
        </Grid>
      </Grid>
    </div>
  );
}

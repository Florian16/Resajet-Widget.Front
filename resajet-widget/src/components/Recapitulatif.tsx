import { TFunction } from "i18next";
import { FormulaireReservation } from "../interfaces/FormulaireReservation";
import { Grid } from "@mui/material";
import { RestaurantContextProps } from "../contexts/RestaurantContext";

type RecapitulatifProps = {
  restaurantContext: RestaurantContextProps;
  formulaire: FormulaireReservation;
  t: TFunction;
};
export default function Recapitulatif({
  t,
  formulaire,
  restaurantContext,
}: RecapitulatifProps) {
  return (
    <div className="resajet-recapitulatif">
      <div className="resajet-recapitulatif-container">
        <Grid container className="resajet-recapitulatif-container-grid">
          <Grid
            item
            xs={6}
            className="resajet-recapitulatif-container-grid-label"
          >
            <span>{t("recapitulatif.client")} :</span>
          </Grid>
          <Grid
            item
            xs={6}
            className="resajet-recapitulatif-container-grid-text"
          >
            <span>
              {formulaire?.lastname} {formulaire?.firstname}
            </span>
          </Grid>
        </Grid>
        <Grid container className="resajet-recapitulatif-container-grid">
          <Grid
            item
            xs={6}
            className="resajet-recapitulatif-container-grid-label"
          >
            <span>{t("recapitulatif.date")} :</span>
          </Grid>
          <Grid
            item
            xs={6}
            className="resajet-recapitulatif-container-grid-text"
          >
            <span>
              {formulaire?.date
                ? `${formulaire?.date.format("dddd")} ${formulaire?.date.format(
                    "DD/MM/YYYY"
                  )}`
                : ""}
            </span>
          </Grid>
        </Grid>
        <Grid container className="resajet-recapitulatif-container-grid">
          <Grid
            item
            xs={6}
            className="resajet-recapitulatif-container-grid-label"
          >
            <span>{t("recapitulatif.heure")} :</span>
          </Grid>
          <Grid
            item
            xs={6}
            className="resajet-recapitulatif-container-grid-text"
          >
            <span>
              {restaurantContext?.restaurantSettings?.timeSlots
                .find((ts) => ts.id === formulaire?.timeSlotId)
                ?.hour.replace(/:00$/, "")}
            </span>
          </Grid>
        </Grid>
        <Grid container className="resajet-recapitulatif-container-grid">
          <Grid
            item
            xs={6}
            className="resajet-recapitulatif-container-grid-label"
          >
            <span>{t("recapitulatif.nombreDePersonnes")} :</span>
          </Grid>
          <Grid
            item
            xs={6}
            className="resajet-recapitulatif-container-grid-text"
            style={{ textTransform: "inherit" }}
          >
            <span>
              {formulaire?.covers}{" "}
              {formulaire?.covers > 1
                ? t("recapitulatif.personnes")
                : t("recapitulatif.personne")}
            </span>
          </Grid>
        </Grid>
        <Grid container className="resajet-recapitulatif-container-grid">
          <Grid
            item
            xs={6}
            className="resajet-recapitulatif-container-grid-label"
          >
            <span>{t("recapitulatif.espace")} :</span>
          </Grid>
          <Grid
            item
            xs={6}
            className="resajet-recapitulatif-container-grid-text"
            style={formulaire?.area === "" ? { textTransform: "inherit" } : {}}
          >
            <span>
              {formulaire?.area === ""
                ? t("reservation.pasDePreference")
                : restaurantContext?.restaurantSettings?.areas.find(
                    (a) => a.id === formulaire?.area
                  )?.name}
            </span>
          </Grid>
          <Grid container className="resajet-recapitulatif-container-grid">
            <Grid
              item
              xs={6}
              className="resajet-recapitulatif-container-grid-label"
            >
              <span>{t("recapitulatif.email")} :</span>
            </Grid>
            <Grid
              item
              xs={6}
              className="resajet-recapitulatif-container-grid-text"
              style={{ textTransform: "inherit" }}
            >
              <span>{formulaire?.mail}</span>
            </Grid>
          </Grid>
          <Grid container className="resajet-recapitulatif-container-grid">
            <Grid
              item
              xs={6}
              className="resajet-recapitulatif-container-grid-label"
            >
              <span>{t("recapitulatif.telephone")} :</span>
            </Grid>
            <Grid
              item
              xs={6}
              className="resajet-recapitulatif-container-grid-text"
            >
              <span>+{formulaire?.phone}</span>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

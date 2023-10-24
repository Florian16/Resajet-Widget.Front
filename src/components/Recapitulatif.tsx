import { TFunction } from "i18next";
import { ReservationRequest } from "../requests/ReservationRequest";
import { Grid } from "@mui/material";
import { CompanyContextProps } from "../contexts/CompanyContext";
import i18n from "../traductions/i18n";
import { Language } from "../enums/Language";
import { Error } from "../dtos/Error/Error";
import { ErrorType } from "../enums/ErrorType";
import { CompanyType } from "../enums/CompanyType";

type RecapitulatifProps = {
  companyContext: CompanyContextProps;
  formulaire: ReservationRequest;
  t: TFunction;
  errors: Error[];
};
export default function Recapitulatif({
  t,
  formulaire,
  companyContext,
  errors,
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
              {formulaire?.startDate
                ? `${t(
                    `recapitulatif.${formulaire?.startDate
                      .locale("fr")
                      .format("dddd")}`
                  )} ${formulaire?.startDate.format("DD/MM/YYYY")}`
                : ""}
            </span>
          </Grid>
        </Grid>
        {companyContext?.company?.type === CompanyType.Restaurant && (
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
                {companyContext?.company?.periods
                  .find((p) => p.id === formulaire?.periodId)
                  ?.timeSlots.find((ts) => ts.id === formulaire.timeSlotId)
                  ?.hour.replace(/:00$/, "")}
              </span>
            </Grid>
          </Grid>
        )}
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
              {formulaire?.participants}{" "}
              {formulaire?.participants > 1
                ? t("recapitulatif.personnes")
                : t("recapitulatif.personne")}
            </span>
          </Grid>
        </Grid>
        <Grid container className="resajet-recapitulatif-container-grid">
          {companyContext?.company?.type === CompanyType.Restaurant &&
            companyContext.company?.companyReservationSetting.areaSelection && (
              <>
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
                  style={
                    formulaire?.areaId === ""
                      ? { textTransform: "inherit" }
                      : {}
                  }
                >
                  <span>
                    {formulaire?.areaId === ""
                      ? t("reservation.pasDePreference")
                      : companyContext?.company?.areas
                          .find((a) => a.id === formulaire?.areaId)
                          ?.areaTranslations.find(
                            (at) =>
                              Object.values(Language)[at.language] ==
                              i18n.language
                          )?.name}
                  </span>
                </Grid>
              </>
            )}
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
              <span>{formulaire?.email}</span>
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
              <span>
                {formulaire?.phoneNumber !== ""
                  ? `+${formulaire?.phoneNumber}`
                  : "/"}{" "}
              </span>
            </Grid>
          </Grid>
          <Grid container className="resajet-recapitulatif-container-grid">
            <Grid
              item
              xs={6}
              className="resajet-recapitulatif-container-grid-label"
            >
              <span>{t("recapitulatif.commentaire")} :</span>
            </Grid>
            <Grid
              item
              xs={6}
              className="resajet-recapitulatif-container-grid-text"
              style={{ textTransform: "inherit" }}
            >
              <span>{formulaire?.comment}</span>
            </Grid>
          </Grid>
        </Grid>
        {errors.findIndex((e) => e.type == ErrorType.Company) > -1 && (
          <div className="resajet-widget-input-error">
            {errors.find((e) => e.type == ErrorType.Company)?.message}
          </div>
        )}
      </div>
    </div>
  );
}

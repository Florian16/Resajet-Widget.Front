import { useState, useEffect } from "react";
import { Select, FormControl, MenuItem, Slider, Grid } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fr";
import { styled } from "@mui/material/styles";
import { CompanyContextProps } from "../contexts/CompanyContext";
import { ReservationRequest } from "../requests/ReservationRequest";
import { MarkSlider } from "../interfaces/MarkSlider";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { Language } from "../enums/language";

type ReservationProps = {
  handleChange: (e: any) => void;
  handleCustomChange: (name: string, value: any) => void;
  companyContext: CompanyContextProps;
  formulaire: ReservationRequest;
  t: TFunction;
};

export default function Reservation({
  handleChange,
  formulaire,
  companyContext,
  handleCustomChange,
  t,
}: ReservationProps) {
  const { i18n } = useTranslation();
  const [marks, setMarks] = useState<MarkSlider[]>();
  useEffect(() => {
    const customMarks: MarkSlider[] = [];

    if (companyContext?.companySettings?.maximumReservation) {
      for (
        let i = 1;
        i <= companyContext?.companySettings?.maximumReservation;
        i++
      ) {
        customMarks.push({ value: i, label: i.toString() });
      }
    }

    setMarks(customMarks);

    // Faites quelque chose avec la variable customMarks si nécessaire
  }, [companyContext?.companySettings?.maximumReservation]);

  const shouldDisableDate = (date: any) => {
    const { $d } = date;
    if (companyContext?.companySettings) {
      return companyContext?.companySettings?.unavailabilities.some(
        (d) =>
          new Date(d).getDate() === $d.getDate() &&
          new Date(d).getMonth() === $d.getMonth() &&
          new Date(d).getFullYear() === $d.getFullYear()
      );
    }

    return false;
  };

  const StyledDateCalendar = styled(DateCalendar)`
    && .Mui-selected {
      background-color: ${companyContext?.companySettings?.mainColor};
    }
  `;

  return (
    <div>
      <FormControl variant="standard" className="resajet-body-container">
        <span className="resajet-label">
          {t("reservation.optionRestauration")}
        </span>
        <Select
          displayEmpty
          name="period"
          onChange={handleChange}
          value={formulaire?.period}
          renderValue={(selected) => {
            if (selected === "") {
              return (
                <em>{t("reservation.veuillezChoisirOptionRestauration")}</em>
              );
            }
            const period = companyContext.companySettings?.periods?.find(
              (tr) => tr.id === selected
            );

            return period
              ? period.periodTranslations.find(
                  (pt) => Object.values(Language)[pt.language] === i18n.language
                )?.name
              : "";
          }}
        >
          {companyContext.companySettings?.periods?.map((period) => (
            <MenuItem key={period.id} value={period.id}>
              {
                period.periodTranslations.find(
                  (pt) => Object.values(Language)[pt.language] === i18n.language
                )?.name
              }
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" className="resajet-body-container">
        <span className="resajet-label">{t("reservation.espace")}</span>
        <Select
          displayEmpty
          name="area"
          onChange={handleChange}
          value={formulaire?.area}
        >
          <MenuItem value={""}>{t("reservation.pasDePreference")}</MenuItem>
          {companyContext.companySettings?.areas?.map((area) => (
            <MenuItem key={area.id} value={area.id}>
              {
                area.areaTranslations.find(
                  (at) => Object.values(Language)[at.language] === i18n.language
                )?.name
              }
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="resajet-body-container" variant="standard">
        <span className="resajet-label">
          {t("reservation.nombreDePersonnes")}
        </span>
        <Slider
          disabled={formulaire?.period === ""}
          value={formulaire?.participants}
          min={1}
          max={companyContext.companySettings?.maximumReservation}
          marks={marks}
          name="participants"
          onChange={handleChange}
          style={{ color: "black" }}
        />
      </FormControl>
      <FormControl className="resajet-body-container" variant="standard">
        <span className="resajet-label">{t("reservation.date")}</span>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={i18n.language}
        >
          <StyledDateCalendar
            disablePast
            shouldDisableDate={shouldDisableDate}
            views={["month", "day"]}
            value={formulaire?.date}
            onChange={(value: any) => handleCustomChange("date", value)}
            disabled={
              !(formulaire?.period !== "" && formulaire?.participants > 0)
            }
          />
        </LocalizationProvider>
      </FormControl>
      {formulaire?.period ? (
        <FormControl className="resajet-body-container" variant="standard">
          <span className="resajet-label hour">{t("reservation.heures")}</span>
          <Grid container>
            {companyContext?.companySettings?.periods
              .find((p) => p.id === formulaire.period)
              ?.timeSlots.map((timeSlot) => (
                <Grid
                  item
                  md={3}
                  xs={4}
                  container
                  justifyContent="center"
                  alignItems="center"
                  key={timeSlot.id}
                >
                  <div
                    className={`resajet-body-button-hour${
                      !(
                        formulaire?.period !== "" &&
                        formulaire?.participants > 0 &&
                        formulaire?.date !== null
                      )
                        ? " disabled"
                        : ""
                    }`}
                    style={{
                      borderColor:
                        formulaire?.timeSlotId === timeSlot.id
                          ? companyContext.companySettings?.mainColor
                          : "black",
                    }}
                    onClick={() =>
                      formulaire?.period !== "" &&
                      formulaire?.participants > 0 &&
                      formulaire?.date !== null
                        ? handleCustomChange(
                            "timeSlotId",
                            timeSlot.id === formulaire?.timeSlotId
                              ? ""
                              : timeSlot.id
                          )
                        : null
                    }
                  >
                    {timeSlot.hour.replace(/:00$/, "")}
                  </div>
                </Grid>
              ))}
          </Grid>
        </FormControl>
      ) : null}
    </div>
  );
}

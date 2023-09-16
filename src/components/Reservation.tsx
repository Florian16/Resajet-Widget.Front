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
import dayjs from "dayjs";
import { Language } from "../enums/Language";

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

    if (companyContext?.company?.maximumReservation) {
      for (let i = 1; i <= companyContext?.company?.maximumReservation; i++) {
        customMarks.push({ value: i, label: i.toString() });
      }
    }

    setMarks(customMarks);

    // Faites quelque chose avec la variable customMarks si nécessaire
  }, [companyContext?.company?.maximumReservation]);

  const shouldDisableDate = (date: any) => {
    const { $d } = date;

    if (companyContext?.company && formulaire.periodId !== "") {
      const disabledDates: Date[] = [];
      const currentDate = new Date($d);
      companyContext?.company?.unavailabilities.forEach((unavailability) => {
        if (
          unavailability.unavailabilityPeriodIds.find(
            (upid) => upid.periodId === formulaire.periodId
          )?.disabled ||
          companyContext.company?.areas?.filter(
            (a) =>
              !companyContext?.company?.unavailabilities.some(
                (u) =>
                  isSameDay(new Date(u.date), currentDate) &&
                  u.unavailabilityPeriodIds.find(
                    (upid) =>
                      upid.periodId === formulaire.periodId &&
                      upid.areaIds.find((areaId) => areaId === a.id) &&
                      !upid.disabled
                  )
              )
          ).length === 0
        )
          disabledDates.push(unavailability.date);
      });
      return disabledDates.some(
        (d) =>
          new Date(d).getDate() === $d.getDate() &&
          new Date(d).getMonth() === $d.getMonth() &&
          new Date(d).getFullYear() === $d.getFullYear()
      );
    }

    return false;
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const StyledDateCalendar = styled(DateCalendar)`
    && .Mui-selected {
      background-color: ${companyContext?.company?.mainColor};
    }
  `;

  const areasFiltered = companyContext.company?.areas?.filter((a) =>
    companyContext?.company?.periods
      .find((p) => p.id === formulaire.periodId)
      ?.timeSlots.some(
        (ts) =>
          !companyContext?.company?.unavailabilities.some(
            (u) =>
              dayjs(u.date).isSame(dayjs(formulaire.date), "day") &&
              u.unavailabilityPeriodIds.find(
                (upid) =>
                  upid.periodId === formulaire.periodId &&
                  upid.areaIds.find((areaId) => areaId === a.id) &&
                  upid.unavailabilityTimeSlotIds.includes(ts.id) &&
                  !upid.disabled
              )
          )
      )
  );

  return (
    <div>
      <FormControl variant="standard" className="resajet-body-container">
        <span className="resajet-label">
          {t("reservation.optionRestauration")}
        </span>
        <Select
          displayEmpty
          name="periodId"
          onChange={handleChange}
          value={formulaire?.periodId}
          renderValue={(selected) => {
            if (selected === "") {
              return (
                <em>{t("reservation.veuillezChoisirOptionRestauration")}</em>
              );
            }
            const period = companyContext.company?.periods?.find(
              (tr) => tr.id === selected
            );

            return period
              ? period.periodTranslations.find(
                  (pt) => Object.values(Language)[pt.language] === i18n.language
                )?.name
              : "";
          }}
        >
          {companyContext.company?.periods?.map((period) => (
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

      <FormControl className="resajet-body-container" variant="standard">
        <span className="resajet-label">
          {t("reservation.nombreDePersonnes")}
        </span>
        <Slider
          disabled={formulaire?.periodId === ""}
          value={formulaire?.participants}
          min={1}
          max={companyContext.company?.maximumReservation}
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
              !(formulaire?.periodId !== "" && formulaire?.participants > 0)
            }
          />
        </LocalizationProvider>
      </FormControl>
      {companyContext.company?.companySetting.areaSelection && (
        <FormControl variant="standard" className="resajet-body-container">
          <span className="resajet-label">{t("reservation.espace")}</span>
          <Select
            displayEmpty
            name="areaId"
            onChange={handleChange}
            value={formulaire?.areaId}
          >
            <MenuItem value={""}>{t("reservation.pasDePreference")}</MenuItem>
            {areasFiltered?.map((area) => (
              <MenuItem key={area.id} value={area.id}>
                {
                  area.areaTranslations.find(
                    (at) =>
                      Object.values(Language)[at.language] === i18n.language
                  )?.name
                }
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {formulaire?.periodId ? (
        <FormControl className="resajet-body-container" variant="standard">
          <span className="resajet-label hour">{t("reservation.heures")}</span>
          <Grid container>
            {companyContext?.company?.periods
              .find((p) => p.id === formulaire.periodId)
              ?.timeSlots.filter(
                (ts) =>
                  !companyContext?.company?.unavailabilities.some(
                    (u) =>
                      dayjs(u.date).isSame(dayjs(formulaire.date), "day") &&
                      u.unavailabilityPeriodIds.find((upid) =>
                        upid.areaIds.length > 0
                          ? upid.periodId === formulaire.periodId &&
                            upid.areaIds.find(
                              (areaId) => areaId === formulaire.areaId
                            ) &&
                            upid.unavailabilityTimeSlotIds.includes(ts.id) &&
                            !upid.disabled
                          : upid.periodId === formulaire.periodId &&
                            upid.unavailabilityTimeSlotIds.includes(ts.id) &&
                            !upid.disabled
                      )
                  )
              )
              .map((timeSlot) => (
                <Grid
                  item
                  xs={3}
                  container
                  justifyContent="center"
                  alignItems="center"
                  key={timeSlot.id}
                >
                  <div
                    className={`resajet-body-button-hour${
                      !(
                        formulaire?.periodId !== "" &&
                        formulaire?.participants > 0 &&
                        formulaire?.date !== null
                      )
                        ? " disabled"
                        : ""
                    }`}
                    style={{
                      borderColor:
                        formulaire?.timeSlotId === timeSlot.id
                          ? companyContext.company?.mainColor
                          : "black",
                    }}
                    onClick={() =>
                      formulaire?.periodId !== "" &&
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

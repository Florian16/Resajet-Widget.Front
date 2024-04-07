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
import InfoIcon from "@mui/icons-material/Info";
import { Error } from "../dtos/Error/Error";
import { ErrorType } from "../enums/ErrorType";
import { CompanyType } from "../enums/CompanyType";
import { DateRange } from "react-date-range";
import { fr, nl, enGB } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type ReservationProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (e: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleCustomChange: (name: string, value: any) => void;
  handleDoubleChange: (
    firstName: string,
    firstValue: Date | undefined,
    secondName: string,
    secondValue: Date | undefined
  ) => void;
  companyContext: CompanyContextProps;
  formulaire: ReservationRequest;
  formulaireInitial: ReservationRequest;
  errors: Error[];
  errorsChecking: () => number;
  t: TFunction;
};

export default function Reservation({
  handleChange,
  formulaire,
  companyContext,
  handleCustomChange,
  handleDoubleChange,
  errors,
  errorsChecking,
  formulaireInitial,
  t,
}: ReservationProps) {
  const { i18n } = useTranslation();
  const [marks, setMarks] = useState<MarkSlider[]>();

  useEffect(() => {
    if (JSON.stringify(formulaire) !== JSON.stringify(formulaireInitial))
      errorsChecking();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formulaire, formulaireInitial]);

  useEffect(() => {
    const customMarks: MarkSlider[] = [];

    if (companyContext?.company?.companySetting?.maximumReservation) {
      for (
        let i = 1;
        i <= companyContext?.company?.companySetting?.maximumReservation;
        i++
      ) {
        customMarks.push({ value: i, label: i.toString() });
      }
    }

    setMarks(customMarks);
  }, [companyContext?.company?.companySetting?.maximumReservation]);

  useEffect(() => {
    const periodIndex = companyContext.company?.periods?.findIndex(
      (p) => p.id === formulaire.periodId
    );

    if (periodIndex !== undefined && periodIndex > -1) {
      const areaExist = companyContext.company?.periods[
        periodIndex
      ].areaPeriods.find((ap) => ap.areaId === formulaire.areaId);

      if (!areaExist) handleCustomChange("areaId", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formulaire?.periodId]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                      upid.areaIds.find((areaId: string) => areaId === a.id) &&
                      !upid.disabled
                  )
              )
          ).length === 0
        )
          disabledDates.push(unavailability.date);
      });

      if (
        companyContext.company.periods
          .find((p) => p.id === formulaire.periodId)
          ?.timeSlots.filter((ts) => {
            const today = dayjs();
            const timeslotTime = dayjs(ts.hour, "HH:mm");

            return !(
              today.isSame(dayjs(date), "day") &&
              timeslotTime.isBefore(today, "hour")
            );
          }).length === 0
      )
        disabledDates.push(date);

      return disabledDates.some(
        (d) =>
          new Date(d).getDate() === $d.getDate() &&
          new Date(d).getMonth() === $d.getMonth() &&
          new Date(d).getFullYear() === $d.getFullYear()
      );
    }

    return false;
  };

  const disabledDates = () => {
    const dates: Date[] = [];

    if (companyContext?.company) {
      companyContext?.company?.unavailabilities.forEach((unavailability) => {
        dates.push(new Date(unavailability.date));
      });
    }

    return dates;
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
      background-color: ${companyContext?.company?.companySetting?.mainColor};
    }
    && .Mui-selected:hover {
      background-color: ${companyContext?.company?.companySetting?.mainColor};
    }
  `;

  const areasFiltered = companyContext.company?.areas?.filter(
    (a) =>
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
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    upid.areaIds.find((areaId: string) => areaId === a.id) &&
                    upid.unavailabilityTimeSlotIds.includes(ts.id) &&
                    !upid.disabled
                )
            )
        ) &&
      companyContext?.company?.periods
        .find((p) => p.id === formulaire.periodId)
        ?.areaPeriods?.some((areaPeriod) => areaPeriod.areaId === a.id)
  );

  return (
    <div>
      {companyContext.company?.companyComments.find(
        (cc) => Object.values(Language)[cc.language] === i18n.language
      )?.comment !== null && (
        <div className="resajet-body-comment">
          <p style={{ display: "flex" }}>
            <i>
              <InfoIcon
                style={{
                  fontSize: "22px",
                  marginRight: "8px",
                }}
              />
            </i>
            {
              companyContext.company?.companyComments.find(
                (cc) => Object.values(Language)[cc.language] === i18n.language
              )?.comment
            }
          </p>
        </div>
      )}
      {companyContext?.company?.type === CompanyType.Restaurant && (
        <FormControl
          variant="standard"
          className="resajet-body-container"
          id="periodId"
        >
          <span className="resajet-label">
            {t("reservation.momentRestauration")}
          </span>
          <Select
            displayEmpty
            name="periodId"
            onChange={(e) => handleChange(e)}
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
                    (pt) =>
                      Object.values(Language)[pt.language] === i18n.language
                  )?.name
                : "";
            }}
          >
            {companyContext.company?.periods?.map((period) => (
              <MenuItem key={period.id} value={period.id}>
                {
                  period.periodTranslations.find(
                    (pt) =>
                      Object.values(Language)[pt.language] === i18n.language
                  )?.name
                }
              </MenuItem>
            ))}
          </Select>
          {errors.findIndex((e) => e.type == ErrorType.Period) > -1 && (
            <div className="resajet-widget-input-error">
              {errors.find((e) => e.type == ErrorType.Period)?.message}
            </div>
          )}
        </FormControl>
      )}
      <FormControl
        className="resajet-body-container"
        variant="standard"
        id="participants"
      >
        <span className="resajet-label">
          {t("reservation.nombreDePersonnes")}
        </span>
        <Slider
          disabled={
            companyContext?.company?.type === CompanyType.Restaurant &&
            formulaire?.periodId === ""
          }
          value={formulaire?.participants}
          min={1}
          max={companyContext.company?.companySetting?.maximumReservation}
          marks={marks}
          name="participants"
          onChange={(e: any) => handleChange(e)}
          style={{ color: "black" }}
        />
        {errors.findIndex((e) => e.type == ErrorType.Participants) > -1 && (
          <div className="resajet-widget-input-error">
            {errors.find((e) => e.type == ErrorType.Participants)?.message}
          </div>
        )}
      </FormControl>
      <FormControl
        className="resajet-body-container"
        variant="standard"
        id="date"
      >
        <span className="resajet-label">{t("reservation.date")}</span>

        {companyContext?.company?.type === CompanyType.Housing ? (
          <DateRange
            ranges={[
              {
                startDate: formulaire?.startDate,
                endDate: formulaire?.endDate,
                key: "formulaire",
              },
            ]}
            locale={
              i18n.language === "nl-NL"
                ? nl
                : i18n.language === "en-US"
                ? enGB
                : fr
            }
            disabledDates={disabledDates()}
            minDate={new Date()}
            onChange={(e) => {
              handleDoubleChange(
                "startDate",
                e.formulaire.startDate,
                "endDate",
                e.formulaire.endDate
              );
            }}
            rangeColors={[companyContext?.company?.companySetting.mainColor]}
          />
        ) : companyContext?.company?.type === CompanyType.Restaurant ? (
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
        ) : null}
        {errors.findIndex((e) => e.type == ErrorType.Date) > -1 && (
          <div className="resajet-widget-input-error resajet-widget-input-error-date">
            {errors.find((e) => e.type == ErrorType.Date)?.message}
          </div>
        )}
      </FormControl>
      {companyContext?.company?.type === CompanyType.Restaurant &&
        companyContext.company?.companyReservationSetting.areaSelection && (
          <FormControl
            variant="standard"
            className="resajet-body-container"
            id="areaId"
          >
            <span className="resajet-label">{t("reservation.espace")}</span>
            <Select
              displayEmpty
              name="areaId"
              onChange={(e) => handleChange(e)}
              value={formulaire?.areaId}
              disabled={
                !(
                  formulaire?.periodId !== "" &&
                  formulaire?.participants > 0 &&
                  formulaire?.date !== null
                )
              }
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
            {errors.findIndex((e) => e.type == ErrorType.Area) > -1 && (
              <div className="resajet-widget-input-error">
                {errors.find((e) => e.type == ErrorType.Area)?.message}
              </div>
            )}
          </FormControl>
        )}
      {companyContext?.company?.type === CompanyType.Restaurant &&
        formulaire?.periodId && (
          <FormControl
            className="resajet-body-container"
            variant="standard"
            id="hour"
          >
            <span className="resajet-label hour">
              {t("reservation.heures")}
            </span>
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
                                (areaId: string) => areaId === formulaire.areaId
                              ) &&
                              upid.unavailabilityTimeSlotIds.includes(ts.id) &&
                              !upid.disabled
                            : upid.periodId === formulaire.periodId &&
                              upid.unavailabilityTimeSlotIds.includes(ts.id) &&
                              !upid.disabled
                        )
                    )
                )
                .filter((ts) => {
                  const today = dayjs();
                  const timeslotTime = dayjs(ts.hour, "HH:mm");

                  return !(
                    today.isSame(dayjs(formulaire.date), "day") &&
                    timeslotTime.isBefore(today, "minute")
                  );
                })
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
                            ? companyContext.company?.companySetting?.mainColor
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
            {errors.findIndex((e) => e.type == ErrorType.TimeSlot) > -1 && (
              <div className="resajet-widget-input-error">
                {errors.find((e) => e.type == ErrorType.TimeSlot)?.message}
              </div>
            )}
          </FormControl>
        )}
    </div>
  );
}

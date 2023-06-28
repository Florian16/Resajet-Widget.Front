import { useState, useEffect } from "react";
import { Select, FormControl, MenuItem, Slider, Grid } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fr";
import { styled } from "@mui/material/styles";
import { RestaurantContextProps } from "../contexts/RestaurantContext";
import { FormulaireReservation } from "../interfaces/FormulaireReservation";
import { MarkSlider } from "../interfaces/MarkSlider";

type ReservationProps = {
  handleChange: (e: any) => void;
  handleCustomChange: (name: string, value: any) => void;
  onChangeStepper: (activeStep: number) => void;
  restaurantContext: RestaurantContextProps;
  formulaire: FormulaireReservation;
};

export default function Reservation({
  handleChange,
  formulaire,
  restaurantContext,
  handleCustomChange,
  onChangeStepper,
}: ReservationProps) {
  const [marks, setMarks] = useState<MarkSlider[]>();
  useEffect(() => {
    const customMarks: MarkSlider[] = [];

    if (restaurantContext?.restaurantSettings?.maximumCovers) {
      for (
        let i = 1;
        i <= restaurantContext?.restaurantSettings?.maximumCovers;
        i++
      ) {
        customMarks.push({ value: i, label: i.toString() });
      }
    }

    setMarks(customMarks);

    // Faites quelque chose avec la variable customMarks si nécessaire
  }, [restaurantContext?.restaurantSettings?.maximumCovers]);

  const shouldDisableDate = (date: any) => {
    const { $d } = date;
    if (restaurantContext?.restaurantSettings) {
      return restaurantContext?.restaurantSettings?.disabledDates.some(
        (d) =>
          d.getDate() === $d.getDate() &&
          d.getMonth() === $d.getMonth() &&
          d.getFullYear() === $d.getFullYear()
      );
    }

    return false;
  };

  const StyledDateCalendar = styled(DateCalendar)`
    && .Mui-selected {
      background-color: ${restaurantContext?.restaurantSettings?.secondColor};
    }
  `;

  return (
    <div>
      <FormControl variant="standard" className="resajet-body-container">
        <span className="resajet-label">Option de restauration</span>
        <Select
          displayEmpty
          name="restoreOption"
          onChange={handleChange}
          value={formulaire?.restoreOption}
          renderValue={(selected) => {
            if (selected === "") {
              return <em>Veuillez choisir une option de restauration</em>;
            }
            const restoreOption =
              restaurantContext.restaurantSettings?.restoreOptions?.find(
                (tr) => tr.id === selected
              );
            return restoreOption ? restoreOption.name : "";
          }}
        >
          {restaurantContext.restaurantSettings?.restoreOptions?.map(
            (restoreOption) => (
              <MenuItem key={restoreOption.id} value={restoreOption.id}>
                {restoreOption.name}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
      <FormControl variant="standard" className="resajet-body-container">
        <span className="resajet-label">Espace</span>
        <Select
          displayEmpty
          name="area"
          onChange={handleChange}
          value={formulaire?.area}
        >
          <MenuItem value={""}>Pas de préférence</MenuItem>
          {restaurantContext.restaurantSettings?.areas?.map((a) => (
            <MenuItem key={a.id} value={a.id}>
              {a.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="resajet-body-container" variant="standard">
        <span className="resajet-label">Nombre de personnes</span>
        <Slider
          disabled={formulaire?.restoreOption === ""}
          value={formulaire?.covers}
          min={1}
          max={restaurantContext.restaurantSettings?.maximumCovers}
          marks={marks}
          name="covers"
          onChange={handleChange}
          style={{ color: "black" }}
        />
      </FormControl>
      <FormControl className="resajet-body-container" variant="standard">
        <span className="resajet-label">Date</span>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
          <StyledDateCalendar
            disablePast
            shouldDisableDate={shouldDisableDate}
            views={["month", "day"]}
            value={formulaire?.date}
            onChange={(value: any) => handleCustomChange("date", value)}
            disabled={
              !(formulaire?.restoreOption !== "" && formulaire?.covers > 0)
            }
          />
        </LocalizationProvider>
      </FormControl>
      {formulaire?.restoreOption ? (
        <FormControl className="resajet-body-container" variant="standard">
          <span className="resajet-label-hour">Heures</span>
          <Grid container>
            {restaurantContext?.restaurantSettings?.timeSlots
              .filter((ts) => ts.mealPeriodId === formulaire?.restoreOption)
              .map((timeSlot) => (
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
                        formulaire?.restoreOption !== "" &&
                        formulaire?.covers > 0 &&
                        formulaire?.date !== null
                      )
                        ? " disabled"
                        : ""
                    }`}
                    style={{
                      borderColor:
                        formulaire?.timeSlotId === timeSlot.id
                          ? restaurantContext.restaurantSettings?.secondColor
                          : "black",
                    }}
                    onClick={() =>
                      formulaire?.restoreOption !== "" &&
                      formulaire?.covers > 0 &&
                      formulaire?.date !== null
                        ? (handleCustomChange(
                            "timeSlotId",
                            timeSlot.id === formulaire?.timeSlotId
                              ? ""
                              : timeSlot.id
                          ),
                          onChangeStepper(1))
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

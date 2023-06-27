import { Select, FormControl, MenuItem, Slider } from "@mui/material";
import { RestaurantContextProps } from "../contexts/RestaurantContext";
import { useFormulaire } from "../hooks/useFormulaire";
import { useEffect, useState } from "react";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fr";
import { styled } from "@mui/material/styles";

type WidgetProps = {
  restaurantContext: RestaurantContextProps;
  isOpen: boolean;
};

type FormulaireReservation = {
  restoreOption: string;
  covers: number;
};

type MarkSlider = {
  value: number;
  label: string;
};

const formulaireInitial = {
  restoreOption: "",
  covers: 0,
};

export default function Widget({ restaurantContext, isOpen }: WidgetProps) {
  const { formulaire, handleChange, setFormulaire } =
    useFormulaire<FormulaireReservation>({
      ...formulaireInitial,
    });
  const [marks, setMarks] = useState<MarkSlider[]>();
  const disabledDates = [
    new Date(2023, 5, 27),
    new Date(2023, 5, 29),
    new Date(2023, 6, 2),
  ];

  useEffect(() => {
    setFormulaire({ ...formulaireInitial });
  }, [isOpen, setFormulaire]);

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
    return disabledDates.some(
      (d) =>
        d.getDate() === $d.getDate() &&
        d.getMonth() === $d.getMonth() &&
        d.getFullYear() === $d.getFullYear()
    );
  };

  const StyledDateCalendar = styled(DateCalendar)`
    && .Mui-selected {
      background-color: ${restaurantContext?.restaurantSettings
        ?.secondColor}; /* Remplacez par votre couleur souhaitée */
    }
  `;

  return (
    <div
      className={`resajet-widget ${
        isOpen ? "resajet-widget-open" : "resajet-widget-close"
      }`}
    >
      <div
        className="resajet-header"
        style={{
          backgroundColor: restaurantContext.restaurantSettings?.secondColor,
        }}
      >
        <span>Réserver maintenant</span>
      </div>
      <div
        className="resajet-body"
        style={{
          background: restaurantContext.restaurantSettings?.mainColor,
        }}
      >
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
            />
          </LocalizationProvider>
        </FormControl>
      </div>
    </div>
  );
}

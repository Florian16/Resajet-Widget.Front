import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Input,
} from "@mui/material";
import { RestaurantContextProps } from "../contexts/RestaurantContext";

type WidgetProps = {
  restaurantContext: RestaurantContextProps;
  isOpen: boolean;
};

export default function Widget({ restaurantContext, isOpen }: WidgetProps) {
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
        <FormControl variant="standard">
          <span className="resajet-label">Type de réservation</span>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

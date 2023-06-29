import { RestaurantContextProps } from "../contexts/RestaurantContext";
import { Grid, Select, MenuItem } from "@mui/material";

type HeaderProps = {
  restaurantContext: RestaurantContextProps;
};

export default function Header({ restaurantContext }: HeaderProps) {
  return (
    <div
      className="resajet-header"
      style={{
        backgroundColor: restaurantContext.restaurantSettings?.mainColor,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={9}>
          <span>Réserver maintenant</span>
        </Grid>
        <Grid item xs={3}>
          <Select>
            <MenuItem value="drapeau1">Drapeau 1</MenuItem>
            <MenuItem value="drapeau2">Drapeau 2</MenuItem>
            <MenuItem value="drapeau3">Drapeau 3</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </div>
  );
}

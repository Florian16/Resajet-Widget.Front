import { TypeReservation } from "./typeReservation";

export interface RestaurantSetting {
  mainColor?: string;
  secondColor?: string;
  displayLogo?: boolean;
  restoreOptions?: TypeReservation[];
  maximumCovers: number;
}

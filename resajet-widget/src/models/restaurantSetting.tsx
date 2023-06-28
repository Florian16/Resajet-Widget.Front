import { Area } from "./area";
import { TimeSlot } from "./timeSlot";
import { TypeReservation } from "./typeReservation";

export interface RestaurantSetting {
  mainColor?: string;
  displayLogo?: boolean;
  restoreOptions?: TypeReservation[];
  maximumCovers: number;
  disabledDates: Date[];
  timeSlots: TimeSlot[];
  areas: Area[];
}

import { Area } from "../models/area";
import { TimeSlot } from "../models/timeSlot";
import { Period } from "../models/period";

export interface CompanySettingDto {
  mainColor?: string;
  displayLogo?: boolean;
  periods?: Period[];
  maximumReservations: number;
  disabledDates: Date[];
  timeSlots: TimeSlot[];
  areas: Area[];
}

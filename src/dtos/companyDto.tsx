import { Area } from "../models/area";
import { TimeSlot } from "../models/timeSlot";
import { Period } from "../models/period";

export interface CompanyDto {
  mainColor?: string;
  displayLogo?: boolean;
  periods?: Period[];
  maximumCovers: number;
  disabledDates: Date[];
  timeSlots: TimeSlot[];
  areas: Area[];
}

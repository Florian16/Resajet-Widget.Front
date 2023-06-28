import { Dayjs } from "dayjs";
export interface FormulaireReservation {
  restoreOption: string;
  area: string;
  covers: number;
  timeSlotId: string;
  date: Dayjs | null;
  lastname: string;
  firstname: string;
  mail: string;
  phone?: string;
  comment?: string;
}

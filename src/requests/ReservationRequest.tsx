import { Dayjs } from "dayjs";
export interface ReservationRequest {
  period: string;
  area: string;
  participants: number;
  timeSlotId: string;
  date: Dayjs | null;
  lastname: string;
  firstname: string;
  mail: string;
  phone?: string;
  comment?: string;
}

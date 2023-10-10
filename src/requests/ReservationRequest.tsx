import { Dayjs } from "dayjs";
export interface ReservationRequest {
  periodId: string;
  areaId?: string;
  participants: number;
  timeSlotId: string;
  date: Dayjs | null;
  lastname: string;
  firstname: string;
  email: string;
  phoneNumber?: string;
  comment?: string;
  termsConditions: boolean;
}

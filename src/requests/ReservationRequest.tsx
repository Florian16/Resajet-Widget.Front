import { Dayjs } from "dayjs";
export interface ReservationRequest {
  periodId: string;
  areaId?: string;
  participants: number;
  timeSlotId: string;
  date: Dayjs | null;
  startDate: Date | undefined;
  endDate: Date | undefined;
  lastname: string;
  firstname: string;
  email: string;
  phoneNumber?: string;
  comment?: string;
  termsConditions: boolean;
  newsletter: boolean;
}

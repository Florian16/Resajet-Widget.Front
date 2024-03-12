import { PeriodTranslation } from "@models/PeriodTranslation";
import { TimeSlotCompanyDto } from "./TimeSlotCompanyDto";

export interface PeriodCompanyDto {
  id: string;
  periodTranslations: PeriodTranslation[];
  timeSlots: TimeSlotCompanyDto[];
}

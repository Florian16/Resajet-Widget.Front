import { PeriodTranslation } from "../../models/PeriodTranslation";
import { TimeSlotCompanyDto } from "./TimeSlotCompanySettingDto";

export interface PeriodCompanyDto {
  id: string;
  periodTranslations: PeriodTranslation[];
  timeSlots: TimeSlotCompanyDto[];
}

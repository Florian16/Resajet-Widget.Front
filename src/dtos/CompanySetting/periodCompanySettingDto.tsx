import { PeriodTranslation } from "../../models/PeriodTranslation";
import { TimeSlotCompanySettingDto } from "./TimeSlotCompanySettingDto";

export interface PeriodCompanySettingDto {
  id: string;
  periodTranslations: PeriodTranslation[];
  timeSlots: TimeSlotCompanySettingDto[];
}

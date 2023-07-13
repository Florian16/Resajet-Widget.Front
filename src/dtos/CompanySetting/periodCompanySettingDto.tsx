import { PeriodTranslation } from "../../models/periodTranslation";
import { TimeSlotCompanySettingDto } from "./timeSlotCompanySettingDto";

export interface PeriodCompanySettingDto {
  id: string;
  periodTranslations: PeriodTranslation[];
  timeSlots: TimeSlotCompanySettingDto[];
}

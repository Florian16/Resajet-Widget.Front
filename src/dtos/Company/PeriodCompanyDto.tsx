import { PeriodTranslation } from "../../models/PeriodTranslation";
import { AreaPeriodDto } from "../AreaPeriod/AreaPeriodDto";
import { TimeSlotCompanyDto } from "./TimeSlotCompanyDto";

export interface PeriodCompanyDto {
  id: string;
  periodTranslations: PeriodTranslation[];
  timeSlots: TimeSlotCompanyDto[];
  areaPeriods: AreaPeriodDto[];
}

import { UnavailabilityPeriodDto } from "../Unavailability/unavailabilityPeriodDto";

export interface UnavailabilityCompanySettingDto {
  date: Date;
  unavailabilityPeriodIds: UnavailabilityPeriodDto[];
}

import { UnavailabilityPeriodDto } from "../Unavailability/UnavailabilityPeriodDto";

export interface UnavailabilityCompanySettingDto {
  date: Date;
  unavailabilityPeriodIds: UnavailabilityPeriodDto[];
}

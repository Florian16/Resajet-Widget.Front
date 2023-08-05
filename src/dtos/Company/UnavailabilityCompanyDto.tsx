import { UnavailabilityPeriodDto } from "../Unavailability/UnavailabilityPeriodDto";

export interface UnavailabilityCompanyDto {
  date: Date;
  unavailabilityPeriodIds: UnavailabilityPeriodDto[];
}

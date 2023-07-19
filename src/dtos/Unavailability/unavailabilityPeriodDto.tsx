export interface UnavailabilityPeriodDto {
  periodId: string;
  areaIds: string[];
  unavailabilityTimeSlotIds: string[];
  disabled: boolean;
}

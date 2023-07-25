import { AreaCompanySettingDto } from "./AreaCompanySettingDto.tsx";
import { PeriodCompanySettingDto } from "./PeriodCompanySettingDto.tsx";
import { UnavailabilityCompanySettingDto } from "./UnavailabilityCompanySettingDto.tsx";

export interface CompanySettingDto {
  mainColor: string;
  periods: PeriodCompanySettingDto[];
  maximumReservation: number;
  unavailabilities: UnavailabilityCompanySettingDto[];
  areas: AreaCompanySettingDto[];
}

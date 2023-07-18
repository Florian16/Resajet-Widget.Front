import { AreaCompanySettingDto } from "./areaCompanySettingDto.tsx";
import { PeriodCompanySettingDto } from "./periodCompanySettingDto.tsx";
import { UnavailabilityCompanySettingDto } from "./unavailabilityCompanySettingDto.tsx";

export interface CompanySettingDto {
  mainColor: string;
  periods: PeriodCompanySettingDto[];
  maximumReservation: number;
  unavailabilities: UnavailabilityCompanySettingDto[];
  areas: AreaCompanySettingDto[];
}

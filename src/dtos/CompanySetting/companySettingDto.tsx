import { AreaCompanySettingDto } from "./AreaCompanySettingDto.tsx";
import { PeriodCompanySettingDto } from "./PeriodCompanySettingDto.tsx";
import { UnavailabilityCompanySettingDto } from "./UnavailabilityCompanySettingDto.tsx";

export interface CompanySettingDto {
  id: string;
  mainColor: string;
  periods: PeriodCompanySettingDto[];
  maximumReservation: number;
  allowAreaSelection: boolean;
  unavailabilities: UnavailabilityCompanySettingDto[];
  areas: AreaCompanySettingDto[];
}
import { CompanySettingDto } from "../CompanySetting/CompanySettingDto.tsx";
import { AreaCompanyDto } from "./AreaCompanyDto.tsx";
import { PeriodCompanyDto } from "./PeriodCompanyDto.tsx";
import { UnavailabilityCompanyDto } from "./UnavailabilityCompanyDto.tsx";

export interface CompanyDto {
  id: string;
  mainColor: string;
  periods: PeriodCompanyDto[];
  maximumReservation: number;
  companySetting: CompanySettingDto;
  unavailabilities: UnavailabilityCompanyDto[];
  areas: AreaCompanyDto[];
}

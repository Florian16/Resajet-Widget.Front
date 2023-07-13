import { AreaCompanySettingDto } from "./areaCompanySettingDto.tsx";
import { PeriodCompanySettingDto } from "./periodCompanySettingDto.tsx";

export interface CompanySettingDto {
  mainColor: string;
  periods: PeriodCompanySettingDto[];
  maximumReservation: number;
  unavailabilities: Date[];
  areas: AreaCompanySettingDto[];
}

import { CompanyCommentDto } from "../CompanyComment/CompanyCommentDto";
import { CompanySettingDto } from "../CompanySetting/CompanySettingDto";
import { AreaCompanyDto } from "./AreaCompanyDto";
import { PeriodCompanyDto } from "./PeriodCompanyDto";
import { UnavailabilityCompanyDto } from "./UnavailabilityCompanyDto";

export interface CompanyDto {
  id: string;
  mainColor: string;
  periods: PeriodCompanyDto[];
  maximumReservation: number;
  companySetting: CompanySettingDto;
  unavailabilities: UnavailabilityCompanyDto[];
  areas: AreaCompanyDto[];
  companyComments: CompanyCommentDto[];
}

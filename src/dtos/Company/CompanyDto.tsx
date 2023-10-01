import { CompanyCommentDto } from "../CompanyComment/CompanyCommentDto";
import { CompanyReservationSettingDto } from "../CompanyReservationSetting/CompanyReservationSettingDto";
import { CompanyEmailSettingDto } from "../CompanyEmailSetting/CompanyEmailSettingDto";
import { AreaCompanyDto } from "./AreaCompanyDto";
import { PeriodCompanyDto } from "./PeriodCompanyDto";
import { UnavailabilityCompanyDto } from "./UnavailabilityCompanyDto";
import { CompanySettingDto } from "../CompanySetting/CompanySettingDto";

export interface CompanyDto {
  id: string;
  periods: PeriodCompanyDto[];
  companySetting: CompanySettingDto;
  companyEmailSetting: CompanyEmailSettingDto;
  companyReservationSetting: CompanyReservationSettingDto;
  unavailabilities: UnavailabilityCompanyDto[];
  areas: AreaCompanyDto[];
  companyComments: CompanyCommentDto[];
}

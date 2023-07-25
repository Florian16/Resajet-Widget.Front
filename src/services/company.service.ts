import { CompanySettingDto } from "../dtos/CompanySetting/CompanySettingDto.tsx";
import { apiService } from "./api.service";

class CompanyService {
  private readonly baseUrl = "/companies";

  public async getCompanySettings(id: string): Promise<CompanySettingDto> {
    const url = `${this.baseUrl}/settings?companyId=${id}`;
    const companySetting: CompanySettingDto = await apiService.get(url);
    return companySetting;
  }
}

export const companyService = new CompanyService();

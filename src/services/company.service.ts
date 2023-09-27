import { CompanyDto } from "../dtos/Company/CompanyDto";
import { apiService } from "./api.service";

class CompanyService {
  private readonly baseUrl = "/companies";

  public async getCompany(id: string, language: string): Promise<CompanyDto> {
    const url = `${this.baseUrl}/settings?companyId=${id}`;
    const companySetting: CompanyDto = await apiService.get(url, language);
    return companySetting;
  }
}

export const companyService = new CompanyService();

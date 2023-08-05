import { CompanyDto } from "../dtos/Company/CompanyDto.tsx";
import { apiService } from "./api.service";

class CompanyService {
  private readonly baseUrl = "/companies";

  public async getCompany(id: string): Promise<CompanyDto> {
    const url = `${this.baseUrl}/settings?companyId=${id}`;
    const companySetting: CompanyDto = await apiService.get(url);
    return companySetting;
  }
}

export const companyService = new CompanyService();

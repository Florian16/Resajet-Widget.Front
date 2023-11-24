import { apiService } from "./api.service";

class DocumentService {
  private readonly baseUrl = "widget/documents";

  public async getDocument(
    companyId: string | undefined,
    language: string
  ): Promise<Blob> {
    const url = `${this.baseUrl}/company/${companyId}`;

    return await apiService.get(url, language, "blob");
  }
}

export const documentService = new DocumentService();

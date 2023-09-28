import axios, { AxiosInstance, AxiosResponse } from "axios";
const apiUrl =
  (import.meta.env && import.meta.env.VITE_API_URL) ||
  process.env.VITE_API_URL ||
  "https://api.resajet.com";

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: apiUrl,
    });
  }

  public async get<T>(url: string, language: string): Promise<T> {
    const headers = {
      "Content-Type": "application/json",
      "Accept-Language": language,
    };

    const response: AxiosResponse<T> = await this.axiosInstance.get(url, {
      headers,
    });
    return response.data;
  }

  public async post<T, U>(url: string, data: U, language: string): Promise<T> {
    const headers = {
      "Content-Type": "application/json",
      "Accept-Language": language,
    };

    const response: AxiosResponse<T> = await this.axiosInstance.post(
      url,
      data,
      { headers }
    );
    return response.data;
  }
}

export const apiService = new ApiService();

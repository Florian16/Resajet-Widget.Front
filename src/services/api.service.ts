import axios, { AxiosInstance, AxiosResponse } from "axios";

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    console.log(import.meta.env.VITE_API_URL);

    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async get<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(url);
    return response.data;
  }
}

export const apiService = new ApiService();

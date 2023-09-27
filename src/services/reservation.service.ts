import { CompanyDto } from "../dtos/Company/CompanyDto";
import { ReservationRequest } from "../requests/ReservationRequest";
import { apiService } from "./api.service";

class ReservationService {
  private readonly baseUrl = "/reservations";

  public async createReservation(
    companyId: string,
    data: ReservationRequest,
    language: string
  ): Promise<CompanyDto> {
    const url = `${this.baseUrl}/${companyId}`;
    const request = {
      periodId: data.periodId,
      areaId: data.areaId === "" ? null : data.areaId,
      participants: data.participants,
      timeSlotId: data.timeSlotId,
      date: data.date?.format("YYYY-MM-DD"),
      lastname: data.lastname,
      firstname: data.firstname,
      email: data.email,
      phoneNumber: data.phoneNumber,
      comment: data.comment,
    };
    return await apiService.post(url, request, language);
  }
}

export const reservationService = new ReservationService();

import { CompanyDto } from "../dtos/Company/CompanyDto.tsx";
import { ReservationRequest } from "../requests/ReservationRequest.tsx";
import { apiService } from "./api.service.ts";

class ReservationService {
  private readonly baseUrl = "/reservations";

  public async createReservation(
    companyId: string,
    data: ReservationRequest
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
    return await apiService.post(url, request);
  }
}

export const reservationService = new ReservationService();

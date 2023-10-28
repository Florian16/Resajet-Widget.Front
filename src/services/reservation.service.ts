import { CompanyDto } from "../dtos/Company/CompanyDto";
import { ReservationRequest } from "../requests/ReservationRequest";
import { apiService } from "./api.service";
import { format } from "date-fns";

class ReservationService {
  private readonly baseUrl = "/reservations";

  public async createReservation(
    companyId: string,
    data: ReservationRequest,
    language: string
  ): Promise<CompanyDto> {
    const url = `${this.baseUrl}/${companyId}`;
    const request = {
      periodId: data.periodId === "" ? null : data.periodId,
      areaId: data.areaId === "" ? null : data.areaId,
      participants: data.participants,
      timeSlotId: data.timeSlotId === "" ? null : data.timeSlotId,
      endDate:
        data.date !== null
          ? data.date?.format("YYYY-MM-DD")
          : data?.endDate
          ? data?.endDate.toISOString().split("T")[0]
          : "",
      startDate:
        data.date !== null
          ? data.date?.format("YYYY-MM-DD")
          : data?.startDate
          ? data?.startDate.toISOString().split("T")[0]
          : "",
      lastname: data.lastname,
      firstname: data.firstname,
      email: data.email,
      phoneNumber: data.phoneNumber,
      comment: data.comment,
      termsConditions: data.termsConditions,
    };
    console.log(request);

    return await apiService.post(url, request, language);
  }
}

export const reservationService = new ReservationService();

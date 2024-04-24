import { CompanyDto } from "../dtos/Company/CompanyDto";
import { ReservationRequest } from "../requests/ReservationRequest";
import { apiService } from "./api.service";
import { DateOnly } from "../utils/utils.dateOnly";
import { Language } from "../enums/Language";

class ReservationService {
  private readonly baseUrl = "widget/reservations";

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
          ? DateOnly.fromDate(data?.endDate).toString()
          : "",
      startDate:
        data.date !== null
          ? data.date?.format("YYYY-MM-DD")
          : data?.startDate
          ? DateOnly.fromDate(data?.startDate).toString()
          : "",
      lastname: data.lastname,
      firstname: data.firstname,
      email: data.email,
      phoneNumber: data.phoneNumber,
      comment: data.comment,
      termsConditions: data.termsConditions,
      newsletter: data.newsletter,
      language: language === "nl-NL" ? 2 : language === "en-US" ? 1 : 0,
    };

    return await apiService.post(url, request, language);
  }
}

export const reservationService = new ReservationService();

import { ErrorType } from "../../enums/ErrorType";

export interface ErrorReservation {
  type: ErrorType;
  message: string;
}

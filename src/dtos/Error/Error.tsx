import { ErrorType } from "../../enums/ErrorType";

export interface Error {
  type: ErrorType;
  message: string;
}

import type { CheckInRequest } from "../../domain/req/CheckInRequest";

export interface ICheckIn {
    execute(request: CheckInRequest): Promise<any>;
}
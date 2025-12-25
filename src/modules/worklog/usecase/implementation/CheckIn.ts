import type { WorklogRepository } from "../../repository/interface/WorklogRepository";
import type { CheckInRequest } from "../../domain/req/CheckInRequest";
import type { ICheckIn } from "../interface/ICheckIn";

export class CheckIn implements ICheckIn {
    constructor(private repository: WorklogRepository) {}

    async execute(request: CheckInRequest): Promise<any> {
        return this.repository.checkIn(request);
    }
}
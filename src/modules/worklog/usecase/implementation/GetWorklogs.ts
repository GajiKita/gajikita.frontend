import type { WorklogRepository } from "../../repository/interface/WorklogRepository";
import type { GetWorklogsRequest } from "../../domain/req/GetWorklogsRequest";
import type { WorklogListResponse } from "../../domain/res/WorklogListResponse";
import type { IGetWorklogs } from "../interface/IGetWorklogs";

export class GetWorklogs implements IGetWorklogs {
    constructor(private repository: WorklogRepository) {}

    async execute(request: GetWorklogsRequest): Promise<WorklogListResponse> {
        return this.repository.getWorklogs(request);
    }
}
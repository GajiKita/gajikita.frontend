import type { GetWorklogsRequest } from "../../domain/req/GetWorklogsRequest";
import type { WorklogListResponse } from "../../domain/res/WorklogListResponse";

export interface IGetWorklogs {
    execute(request: GetWorklogsRequest): Promise<WorklogListResponse>;
}

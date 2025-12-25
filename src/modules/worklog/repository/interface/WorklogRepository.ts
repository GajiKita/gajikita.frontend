import type { CreateWorklogRequest } from "../../domain/req/CreateWorklogRequest";
import type { CheckInRequest } from "../../domain/req/CheckInRequest";
import type { GetWorklogsRequest } from "../../domain/req/GetWorklogsRequest";
import type { WorklogResponse } from "../../domain/res/WorklogResponse";
import type { WorklogListResponse } from "../../domain/res/WorklogListResponse";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";

export interface WorklogRepository {
    createWorklog(request: CreateWorklogRequest): Promise<WorklogResponse>;
    getWorklogs(request: GetWorklogsRequest): Promise<WorklogListResponse>;
    checkIn(request: CheckInRequest): Promise<void>;
    checkOut(id: string): Promise<void>;
    approveWorklog(id: string): Promise<TransactionResponse>;
}

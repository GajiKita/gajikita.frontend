import type { CreateWorklogRequest } from "../../domain/req/CreateWorklogRequest";
import type { CheckInRequest } from "../../domain/req/CheckInRequest";
import type { GetWorklogsRequest } from "../../domain/req/GetWorklogsRequest";
import type { WorklogResponse } from "../../domain/res/WorklogResponse";
import type { WorklogListResponse } from "../../domain/res/WorklogListResponse";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";

export interface WorklogRepository {
    createWorklog(request: CreateWorklogRequest): Promise<WorklogResponse>;
    getWorklogs(request: GetWorklogsRequest): Promise<WorklogListResponse>;
    checkIn(request: CheckInRequest): Promise<any>; // Response type not specified in API
    checkOut(id: string): Promise<void>; // Response type not specified in API
    approve(id: string): Promise<TransactionResponse>;
}
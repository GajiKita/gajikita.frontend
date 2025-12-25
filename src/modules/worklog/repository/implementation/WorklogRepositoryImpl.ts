import { API_ROUTES } from "@/core/constant/api";
import { httpClient } from "@/core/utils/http/httpClient";
import type { WorklogRepository } from "../interface/WorklogRepository";
import type { CreateWorklogRequest } from "../../domain/req/CreateWorklogRequest";
import type { CheckInRequest } from "../../domain/req/CheckInRequest";
import type { GetWorklogsRequest } from "../../domain/req/GetWorklogsRequest";
import type { WorklogResponse } from "../../domain/res/WorklogResponse";
import type { WorklogListResponse } from "../../domain/res/WorklogListResponse";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";

export class WorklogRepositoryImpl implements WorklogRepository {
    async createWorklog(request: CreateWorklogRequest): Promise<WorklogResponse> {
        return httpClient.post<WorklogResponse>(API_ROUTES.worklogs.base, request);
    }

    async getWorklogs(request: GetWorklogsRequest): Promise<WorklogListResponse> {
        return httpClient.get<WorklogListResponse>(API_ROUTES.worklogs.base, { params: request as any });
    }

    async checkIn(request: CheckInRequest): Promise<any> {
        return httpClient.post<any>(API_ROUTES.worklogs.checkIn, undefined, { 
            params: { payrollCycleId: request.payrollCycleId } 
        });
    }

    async checkOut(id: string): Promise<void> {
        return httpClient.post<void>(API_ROUTES.worklogs.checkOut(id), {});
    }

    async approve(id: string): Promise<TransactionResponse> {
        return httpClient.patch<TransactionResponse>(API_ROUTES.worklogs.approve(id), {});
    }
}
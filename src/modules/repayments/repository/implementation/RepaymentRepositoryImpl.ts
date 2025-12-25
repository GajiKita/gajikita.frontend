import { API_ROUTES } from "@/core/constant/api";
import { httpClient } from "@/core/utils/http/httpClient";
import type { RepaymentsRepository } from "../interface/RepaymentsRepository";
import type { ProcessCycleRequest } from "../../domain/req/ProcessCycleRequest";
import type { PreparePlatformFeeWithdrawalRequest } from "../../domain/req/PreparePlatformFeeWithdrawalRequest";
import type { ProcessCycleResponse } from "../../domain/res/ProcessCycleResponse";
import type { PreparePlatformFeeWithdrawalResponse } from "../../domain/res/PreparePlatformFeeWithdrawalResponse";

export class RepaymentsRepositoryImpl implements RepaymentsRepository {
    async processCycle(request: ProcessCycleRequest): Promise<ProcessCycleResponse> {
        return httpClient.post<ProcessCycleResponse>(API_ROUTES.repayments.processCycle(request.cycleId), {});
    }

    async preparePlatformFeeWithdrawal(request: PreparePlatformFeeWithdrawalRequest): Promise<PreparePlatformFeeWithdrawalResponse> {
        return httpClient.post<PreparePlatformFeeWithdrawalResponse>(API_ROUTES.repayments.preparePlatformFeeWithdrawal, request);
    }
}
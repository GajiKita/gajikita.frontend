import { API_ROUTES } from "@/core/constant/api";
import { httpClient } from "@/core/utils/http/httpClient";
import type { WithdrawRepository } from "../interface/WithdrawRepository";
import type { CreateWithdrawRequest } from "../../domain/req/CreateWithdrawRequest";
import type { SimulateWithdrawRequest } from "../../domain/req/SimulateWithdrawRequest";
import type { SimulationResponse } from "../../domain/res/SimulationResponse";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";

export class WithdrawRepositoryImpl implements WithdrawRepository {
    async createRequest(request: CreateWithdrawRequest): Promise<TransactionResponse> {
        return httpClient.post<TransactionResponse>(API_ROUTES.withdraws.request, request);
    }

    async simulate(request: SimulateWithdrawRequest): Promise<SimulationResponse> {
        return httpClient.get<SimulationResponse>(API_ROUTES.withdraws.simulate, { params: request as any });
    }
}

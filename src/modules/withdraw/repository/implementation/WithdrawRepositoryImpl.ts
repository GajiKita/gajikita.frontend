import { API_ROUTES } from "@/core/constant/api";
import { httpClient } from "@/core/utils/http/httpClient";
import type { WithdrawRepository } from "../interface/WithdrawRepository";
import type { CreateWithdrawRequest as CreateWithdrawRequestDto } from "../../domain/req/CreateWithdrawRequest";
import type { GetWithdrawRequestsRequest } from "../../domain/req/GetWithdrawRequestsRequest";
import type { GetWithdrawRequestByIdRequest } from "../../domain/req/GetWithdrawRequestByIdRequest";
import type { UpdateWithdrawRequest } from "../../domain/req/UpdateWithdrawRequest";
import type { SimulateWithdrawRequest } from "../../domain/req/SimulateWithdrawRequest";
import type { WithdrawRequestResponse } from "../../domain/res/WithdrawRequestResponse";
import type { WithdrawRequestListResponse } from "../../domain/res/WithdrawRequestListResponse";
import type { SimulationResponse } from "../../domain/res/SimulationResponse";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";

export class WithdrawRepositoryImpl implements WithdrawRepository {
    async createWithdrawRequest(request: CreateWithdrawRequestDto): Promise<TransactionResponse> {
        return httpClient.post<TransactionResponse>(API_ROUTES.withdraws.request, request);
    }

    async simulateWithdraw(request: SimulateWithdrawRequest): Promise<SimulationResponse> {
        return httpClient.get<SimulationResponse>(API_ROUTES.withdraws.simulate, { 
            params: request as any 
        });
    }

    async executeWithdraw(id: string, approvedAmount: number, extraAaveFee?: number): Promise<ExecuteWithdrawResponse> {
        const body = {
            approved_amount: approvedAmount,
            ...(extraAaveFee !== undefined && { extra_aave_fee: extraAaveFee })
        };
        return httpClient.post<ExecuteWithdrawResponse>(API_ROUTES.withdraws.execute(id), body);
    }

    async getWithdrawRequests(request: GetWithdrawRequestsRequest): Promise<WithdrawRequestListResponse> {
        return httpClient.get<WithdrawRequestListResponse>(API_ROUTES.withdraws.base, { params: request as any });
    }

    async getWithdrawRequestById(request: GetWithdrawRequestByIdRequest): Promise<WithdrawRequestResponse> {
        return httpClient.get<WithdrawRequestResponse>(API_ROUTES.withdraws.byId(request.id));
    }

    async updateWithdrawRequest(request: UpdateWithdrawRequest): Promise<WithdrawRequestResponse> {
        const { id, ...body } = request;
        return httpClient.patch<WithdrawRequestResponse>(API_ROUTES.withdraws.byId(id), body);
    }

    async deleteWithdrawRequest(id: string): Promise<void> {
        return httpClient.del<void>(API_ROUTES.withdraws.byId(id));
    }
}
import { API_ROUTES } from "@/core/constant/api";
import { httpClient } from "@/core/utils/http/httpClient";
import type { WithdrawRepository } from "../interface/WithdrawRepository";
import type { CreateWithdrawRequest as CreateWithdrawRequestDto } from "../../domain/req/CreateWithdrawRequest";
import type { SimulateWithdrawRequest } from "../../domain/req/SimulateWithdrawRequest";
import type { WithdrawRequestResponse } from "../../domain/res/WithdrawRequestResponse";
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

    async executeWithdraw(id: string, approvedAmount: number, extraAaveFee?: number): Promise<void> {
        const body = {
            approved_amount: approvedAmount,
            ...(extraAaveFee !== undefined && { extra_aave_fee: extraAaveFee })
        };
        return httpClient.post<void>(API_ROUTES.withdraws.execute(id), body);
    }
}
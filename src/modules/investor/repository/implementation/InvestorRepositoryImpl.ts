import { API_ROUTES } from "@/core/constant/api";
import { httpClient } from "@/core/utils/http/httpClient";
import type { InvestorRepository } from "../interface/InvestorRepository";
import type { CreateInvestorRequest } from "../../domain/req/CreateInvestorRequest";
import type { UpdateInvestorRequest } from "../../domain/req/UpdateInvestorRequest";
import type { GetInvestorsRequest } from "../../domain/req/GetInvestorsRequest";
import type { GetInvestorByIdRequest } from "../../domain/req/GetInvestorByIdRequest";
import type { InvestorResponse } from "../../domain/res/InvestorResponse";
import type { InvestorListResponse } from "../../domain/res/InvestorListResponse";
import type { PrepareTransactionRequest } from "../../../shared/domain/req/PrepareTransactionRequest";
import type { UpdatePreferredTokenRequest } from "../../../shared/domain/req/UpdatePreferredTokenRequest";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";

export class InvestorRepositoryImpl implements InvestorRepository {
    async createInvestor(request: CreateInvestorRequest): Promise<InvestorResponse> {
        return httpClient.post<InvestorResponse>(API_ROUTES.investors.base, request);
    }

    async getInvestors(request: GetInvestorsRequest): Promise<InvestorListResponse> {
        return httpClient.get<InvestorListResponse>(API_ROUTES.investors.base, { params: request as any });
    }

    async getInvestorById(request: GetInvestorByIdRequest): Promise<InvestorResponse> {
        return httpClient.get<InvestorResponse>(API_ROUTES.investors.byId(request.id));
    }

    async updateInvestor(request: UpdateInvestorRequest): Promise<InvestorResponse> {
        const { id, ...body } = request;
        return httpClient.patch<InvestorResponse>(API_ROUTES.investors.byId(id), body);
    }

    async deleteInvestor(id: string): Promise<void> {
        return httpClient.del<void>(API_ROUTES.investors.byId(id));
    }

    async prepareDepositLiquidity(request: PrepareTransactionRequest): Promise<TransactionResponse> {
        return httpClient.post<TransactionResponse>(API_ROUTES.investors.prepareDepositLiquidity, request);
    }

    async prepareWithdrawReward(request: PrepareTransactionRequest): Promise<TransactionResponse> {
        return httpClient.post<TransactionResponse>(API_ROUTES.investors.prepareWithdrawReward, request);
    }

    async updateMePreferredToken(request: UpdatePreferredTokenRequest): Promise<TransactionResponse> {
        return httpClient.patch<TransactionResponse>(API_ROUTES.investors.me.preferredToken, request);
    }
}
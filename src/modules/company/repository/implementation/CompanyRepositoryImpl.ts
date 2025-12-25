import { API_ROUTES } from "@/core/constant/api";
import { httpClient } from "@/core/utils/http/httpClient";
import type { CompanyRepository } from "../interface/CompanyRepository";
import type { CreateCompanyRequest } from "../../domain/req/CreateCompanyRequest";
import type { UpdateCompanyRequest } from "../../domain/req/UpdateCompanyRequest";
import type { GetCompaniesRequest } from "../../domain/req/GetCompaniesRequest";
import type { GetCompanyByIdRequest } from "../../domain/req/GetCompanyByIdRequest";
import type { CompanyResponse } from "../../domain/res/CompanyResponse";
import type { CompanyListResponse } from "../../domain/res/CompanyListResponse";
import type { PrepareTransactionRequest } from "../../../shared/domain/req/PrepareTransactionRequest";
import type { UpdatePreferredTokenRequest } from "../../../shared/domain/req/UpdatePreferredTokenRequest";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";

export class CompanyRepositoryImpl implements CompanyRepository {
    async createCompany(request: CreateCompanyRequest): Promise<CompanyResponse> {
        return httpClient.post<CompanyResponse>(API_ROUTES.companies.base, request);
    }

    async getCompanies(request: GetCompaniesRequest): Promise<CompanyListResponse> {
        return httpClient.get<CompanyListResponse>(API_ROUTES.companies.base, { params: request as any });
    }

    async getCompanyById(request: GetCompanyByIdRequest): Promise<CompanyResponse> {
        return httpClient.get<CompanyResponse>(API_ROUTES.companies.byId(request.id));
    }

    async updateCompany(request: UpdateCompanyRequest): Promise<CompanyResponse> {
        const { id, ...body } = request;
        return httpClient.patch<CompanyResponse>(API_ROUTES.companies.byId(id), body);
    }

    async deleteCompany(id: string): Promise<void> {
        return httpClient.del<void>(API_ROUTES.companies.byId(id));
    }

    async prepareLockLiquidity(request: PrepareTransactionRequest): Promise<TransactionResponse> {
        return httpClient.post<TransactionResponse>(API_ROUTES.companies.prepareLockLiquidity, request);
    }

    async prepareWithdrawReward(request: PrepareTransactionRequest): Promise<TransactionResponse> {
        return httpClient.post<TransactionResponse>(API_ROUTES.companies.prepareWithdrawReward, request);
    }

    async updatePreferredToken(id: string, request: UpdatePreferredTokenRequest): Promise<TransactionResponse> {
        return httpClient.patch<TransactionResponse>(API_ROUTES.companies.preferredToken(id), request);
    }
}

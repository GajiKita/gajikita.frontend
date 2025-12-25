import type { CreateCompanyRequest } from "../../domain/req/CreateCompanyRequest";
import type { UpdateCompanyRequest } from "../../domain/req/UpdateCompanyRequest";
import type { GetCompaniesRequest } from "../../domain/req/GetCompaniesRequest";
import type { GetCompanyByIdRequest } from "../../domain/req/GetCompanyByIdRequest";
import type { CompanyResponse } from "../../domain/res/CompanyResponse";
import type { CompanyListResponse } from "../../domain/res/CompanyListResponse";
import type { PrepareTransactionRequest } from "../../../shared/domain/req/PrepareTransactionRequest";
import type { UpdatePreferredTokenRequest } from "../../../shared/domain/req/UpdatePreferredTokenRequest";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";

export interface CompanyRepository {
    createCompany(request: CreateCompanyRequest): Promise<CompanyResponse>;
    getCompanies(request: GetCompaniesRequest): Promise<CompanyListResponse>;
    getCompanyById(request: GetCompanyByIdRequest): Promise<CompanyResponse>;
    updateCompany(request: UpdateCompanyRequest): Promise<CompanyResponse>;
    deleteCompany(id: string): Promise<void>;
    prepareLockLiquidity(request: PrepareTransactionRequest): Promise<TransactionResponse>;
    prepareWithdrawReward(request: PrepareTransactionRequest): Promise<TransactionResponse>;
    updatePreferredToken(id: string, request: UpdatePreferredTokenRequest): Promise<TransactionResponse>;
}

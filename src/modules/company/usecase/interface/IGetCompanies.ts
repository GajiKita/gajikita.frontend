import type { GetCompaniesRequest } from "../../domain/req/GetCompaniesRequest";
import type { CompanyListResponse } from "../../domain/res/CompanyListResponse";

export interface IGetCompanies {
    execute(request: GetCompaniesRequest): Promise<CompanyListResponse>;
}

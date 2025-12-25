import type { CompanyRepository } from "../../repository/interface/CompanyRepository";
import type { GetCompaniesRequest } from "../../domain/req/GetCompaniesRequest";
import type { CompanyListResponse } from "../../domain/res/CompanyListResponse";
import type { IGetCompanies } from "../interface/IGetCompanies";

export class GetCompanies implements IGetCompanies {
    constructor(private repository: CompanyRepository) {}

    async execute(request: GetCompaniesRequest): Promise<CompanyListResponse> {
        return this.repository.getCompanies(request);
    }
}

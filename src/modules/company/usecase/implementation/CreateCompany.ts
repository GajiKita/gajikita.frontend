import type { CompanyRepository } from "../../repository/interface/CompanyRepository";
import type { CreateCompanyRequest } from "../../domain/req/CreateCompanyRequest";
import type { CompanyResponse } from "../../domain/res/CompanyResponse";
import type { ICreateCompany } from "../interface/ICreateCompany";

export class CreateCompany implements ICreateCompany {
    constructor(private repository: CompanyRepository) {}

    async execute(request: CreateCompanyRequest): Promise<CompanyResponse> {
        return this.repository.createCompany(request);
    }
}

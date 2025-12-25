import type { CompanyRepository } from "../../repository/interface/CompanyRepository";
import type { UpdateCompanyRequest } from "../../domain/req/UpdateCompanyRequest";
import type { CompanyResponse } from "../../domain/res/CompanyResponse";
import type { IUpdateCompany } from "../interface/IUpdateCompany";

export class UpdateCompany implements IUpdateCompany {
    constructor(private repository: CompanyRepository) {}

    async execute(request: UpdateCompanyRequest): Promise<CompanyResponse> {
        return this.repository.updateCompany(request);
    }
}

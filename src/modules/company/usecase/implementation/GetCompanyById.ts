import type { CompanyRepository } from "../../repository/interface/CompanyRepository";
import type { GetCompanyByIdRequest } from "../../domain/req/GetCompanyByIdRequest";
import type { CompanyResponse } from "../../domain/res/CompanyResponse";
import type { IGetCompanyById } from "../interface/IGetCompanyById";

export class GetCompanyById implements IGetCompanyById {
    constructor(private repository: CompanyRepository) {}

    async execute(request: GetCompanyByIdRequest): Promise<CompanyResponse> {
        return this.repository.getCompanyById(request);
    }
}

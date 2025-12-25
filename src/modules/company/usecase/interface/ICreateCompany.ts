import type { CreateCompanyRequest } from "../../domain/req/CreateCompanyRequest";
import type { CompanyResponse } from "../../domain/res/CompanyResponse";

export interface ICreateCompany {
    execute(request: CreateCompanyRequest): Promise<CompanyResponse>;
}

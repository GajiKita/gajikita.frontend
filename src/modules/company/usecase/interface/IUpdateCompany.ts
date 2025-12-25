import type { UpdateCompanyRequest } from "../../domain/req/UpdateCompanyRequest";
import type { CompanyResponse } from "../../domain/res/CompanyResponse";

export interface IUpdateCompany {
    execute(request: UpdateCompanyRequest): Promise<CompanyResponse>;
}

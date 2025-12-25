import type { GetCompanyByIdRequest } from "../../domain/req/GetCompanyByIdRequest";
import type { CompanyResponse } from "../../domain/res/CompanyResponse";

export interface IGetCompanyById {
    execute(request: GetCompanyByIdRequest): Promise<CompanyResponse>;
}

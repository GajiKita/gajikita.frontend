import type { GetInvestorByIdRequest } from "../../domain/req/GetInvestorByIdRequest";
import type { InvestorResponse } from "../../domain/res/InvestorResponse";

export interface IGetInvestorById {
    execute(request: GetInvestorByIdRequest): Promise<InvestorResponse>;
}
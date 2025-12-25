import type { GetInvestorsRequest } from "../../domain/req/GetInvestorsRequest";
import type { InvestorListResponse } from "../../domain/res/InvestorListResponse";

export interface IGetInvestors {
    execute(request: GetInvestorsRequest): Promise<InvestorListResponse>;
}
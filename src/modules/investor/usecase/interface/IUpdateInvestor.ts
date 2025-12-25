import type { UpdateInvestorRequest } from "../../domain/req/UpdateInvestorRequest";
import type { InvestorResponse } from "../../domain/res/InvestorResponse";

export interface IUpdateInvestor {
    execute(request: UpdateInvestorRequest): Promise<InvestorResponse>;
}
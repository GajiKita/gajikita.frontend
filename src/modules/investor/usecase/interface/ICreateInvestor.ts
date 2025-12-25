import type { CreateInvestorRequest } from "../../domain/req/CreateInvestorRequest";
import type { InvestorResponse } from "../../domain/res/InvestorResponse";

export interface ICreateInvestor {
    execute(request: CreateInvestorRequest): Promise<InvestorResponse>;
}
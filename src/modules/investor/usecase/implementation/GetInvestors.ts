import type { InvestorRepository } from "../../repository/interface/InvestorRepository";
import type { GetInvestorsRequest } from "../../domain/req/GetInvestorsRequest";
import type { InvestorListResponse } from "../../domain/res/InvestorListResponse";
import type { IGetInvestors } from "../interface/IGetInvestors";

export class GetInvestors implements IGetInvestors {
    constructor(private repository: InvestorRepository) {}

    async execute(request: GetInvestorsRequest): Promise<InvestorListResponse> {
        return this.repository.getInvestors(request);
    }
}
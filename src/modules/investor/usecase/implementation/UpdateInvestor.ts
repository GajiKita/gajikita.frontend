import type { InvestorRepository } from "../../repository/interface/InvestorRepository";
import type { UpdateInvestorRequest } from "../../domain/req/UpdateInvestorRequest";
import type { InvestorResponse } from "../../domain/res/InvestorResponse";
import type { IUpdateInvestor } from "../interface/IUpdateInvestor";

export class UpdateInvestor implements IUpdateInvestor {
    constructor(private repository: InvestorRepository) {}

    async execute(request: UpdateInvestorRequest): Promise<InvestorResponse> {
        return this.repository.updateInvestor(request);
    }
}
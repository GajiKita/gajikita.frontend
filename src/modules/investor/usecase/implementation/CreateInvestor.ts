import type { InvestorRepository } from "../../repository/interface/InvestorRepository";
import type { CreateInvestorRequest } from "../../domain/req/CreateInvestorRequest";
import type { InvestorResponse } from "../../domain/res/InvestorResponse";
import type { ICreateInvestor } from "../interface/ICreateInvestor";

export class CreateInvestor implements ICreateInvestor {
    constructor(private repository: InvestorRepository) {}

    async execute(request: CreateInvestorRequest): Promise<InvestorResponse> {
        return this.repository.createInvestor(request);
    }
}
import type { InvestorRepository } from "../../repository/interface/InvestorRepository";
import type { GetInvestorByIdRequest } from "../../domain/req/GetInvestorByIdRequest";
import type { InvestorResponse } from "../../domain/res/InvestorResponse";
import type { IGetInvestorById } from "../interface/IGetInvestorById";

export class GetInvestorById implements IGetInvestorById {
    constructor(private repository: InvestorRepository) {}

    async execute(request: GetInvestorByIdRequest): Promise<InvestorResponse> {
        return this.repository.getInvestorById(request);
    }
}
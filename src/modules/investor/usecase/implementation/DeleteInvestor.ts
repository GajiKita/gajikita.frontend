import type { InvestorRepository } from "../../repository/interface/InvestorRepository";
import type { IDeleteInvestor } from "../interface/IDeleteInvestor";

export class DeleteInvestor implements IDeleteInvestor {
    constructor(private repository: InvestorRepository) {}

    async execute(id: string): Promise<void> {
        return this.repository.deleteInvestor(id);
    }
}
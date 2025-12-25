import type { InvestorRepository } from "../../repository/interface/InvestorRepository";
import type { PrepareTransactionRequest } from "../../../shared/domain/req/PrepareTransactionRequest";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";
import type { IPrepareDepositLiquidity } from "../interface/IPrepareDepositLiquidity";

export class PrepareDepositLiquidity implements IPrepareDepositLiquidity {
    constructor(private repository: InvestorRepository) {}

    async execute(request: PrepareTransactionRequest): Promise<TransactionResponse> {
        return this.repository.prepareDepositLiquidity(request);
    }
}
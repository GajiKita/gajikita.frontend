import type { InvestorRepository } from "../../repository/interface/InvestorRepository";
import type { PrepareTransactionRequest } from "../../../shared/domain/req/PrepareTransactionRequest";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";
import type { IPrepareWithdrawReward } from "../interface/IPrepareWithdrawReward";

export class PrepareWithdrawReward implements IPrepareWithdrawReward {
    constructor(private repository: InvestorRepository) {}

    async execute(request: PrepareTransactionRequest): Promise<TransactionResponse> {
        return this.repository.prepareWithdrawReward(request);
    }
}
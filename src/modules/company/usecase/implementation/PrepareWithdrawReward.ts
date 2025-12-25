import type { CompanyRepository } from "../../repository/interface/CompanyRepository";
import type { PrepareTransactionRequest } from "../../../shared/domain/req/PrepareTransactionRequest";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";
import type { IPrepareWithdrawReward } from "../interface/IPrepareWithdrawReward";

export class PrepareWithdrawReward implements IPrepareWithdrawReward {
    constructor(private repository: CompanyRepository) {}

    async execute(request: PrepareTransactionRequest): Promise<TransactionResponse> {
        return this.repository.prepareWithdrawReward(request);
    }
}

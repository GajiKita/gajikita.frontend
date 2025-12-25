import type { CompanyRepository } from "../../repository/interface/CompanyRepository";
import type { PrepareTransactionRequest } from "../../../shared/domain/req/PrepareTransactionRequest";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";
import type { IPrepareLockLiquidity } from "../interface/IPrepareLockLiquidity";

export class PrepareLockLiquidity implements IPrepareLockLiquidity {
    constructor(private repository: CompanyRepository) {}

    async execute(request: PrepareTransactionRequest): Promise<TransactionResponse> {
        return this.repository.prepareLockLiquidity(request);
    }
}

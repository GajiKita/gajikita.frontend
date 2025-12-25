import type { PrepareTransactionRequest } from "../../../shared/domain/req/PrepareTransactionRequest";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";

export interface IPrepareDepositLiquidity {
    execute(request: PrepareTransactionRequest): Promise<TransactionResponse>;
}
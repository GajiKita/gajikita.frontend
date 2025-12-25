import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";

export interface IApproveWorklog {
    execute(id: string): Promise<TransactionResponse>;
}

import type { CreateWithdrawRequest } from "../../domain/req/CreateWithdrawRequest";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";

export interface ICreateWithdrawRequest {
    execute(request: CreateWithdrawRequest): Promise<TransactionResponse>;
}

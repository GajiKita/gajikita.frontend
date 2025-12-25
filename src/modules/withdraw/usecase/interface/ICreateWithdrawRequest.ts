import type { CreateWithdrawRequest as CreateWithdrawRequestDto } from "../../domain/req/CreateWithdrawRequest";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";

export interface ICreateWithdrawRequest {
    execute(request: CreateWithdrawRequestDto): Promise<TransactionResponse>;
}
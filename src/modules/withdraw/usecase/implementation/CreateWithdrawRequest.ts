import type { WithdrawRepository } from "../../repository/interface/WithdrawRepository";
import type { CreateWithdrawRequest as CreateWithdrawRequestDto } from "../../domain/req/CreateWithdrawRequest";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";
import type { ICreateWithdrawRequest } from "../interface/ICreateWithdrawRequest";

export class CreateWithdrawRequest implements ICreateWithdrawRequest {
    constructor(private repository: WithdrawRepository) {}

    async execute(request: CreateWithdrawRequestDto): Promise<TransactionResponse> {
        return this.repository.createWithdrawRequest(request);
    }
}
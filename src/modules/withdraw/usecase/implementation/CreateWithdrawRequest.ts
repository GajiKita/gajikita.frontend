import { ICreateWithdrawRequest } from "../usecase/interface/ICreateWithdrawRequest";
import { WithdrawRepository } from "../repository/interface/WithdrawRepository";
import type { CreateWithdrawRequest as CreateWithdrawRequestDto } from "../domain/req/CreateWithdrawRequest";
import type { TransactionResponse } from "../shared/domain/res/TransactionResponse";

export class CreateWithdrawRequest implements ICreateWithdrawRequest {
    constructor(private repository: WithdrawRepository) {}

    async execute(request: CreateWithdrawRequestDto): Promise<TransactionResponse> {
        return this.repository.createWithdrawRequest(request);
    }
}
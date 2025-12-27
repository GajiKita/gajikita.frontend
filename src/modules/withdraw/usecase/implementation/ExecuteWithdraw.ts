import { IExecuteWithdraw } from "../../usecase/interface/IExecuteWithdraw";
import { WithdrawRepository } from "../../repository/interface/WithdrawRepository";
import type { ExecuteWithdrawRequest } from "../../domain/req/ExecuteWithdrawRequest";
import type { ExecuteWithdrawResponse } from "../../domain/res/ExecuteWithdrawResponse";

export class ExecuteWithdraw implements IExecuteWithdraw {
    constructor(private repository: WithdrawRepository) {}

    async execute(id: string, request: ExecuteWithdrawRequest): Promise<ExecuteWithdrawResponse> {
        return this.repository.executeWithdraw(id, request.approved_amount, request.extra_aave_fee);
    }
}
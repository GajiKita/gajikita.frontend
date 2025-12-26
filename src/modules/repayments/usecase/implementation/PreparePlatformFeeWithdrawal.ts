import type { RepaymentsRepository } from "../../repository/interface/RepaymentRepository";
import type { PreparePlatformFeeWithdrawalRequest } from "../../domain/req/PreparePlatformFeeWithdrawalRequest";
import type { PreparePlatformFeeWithdrawalResponse } from "../../domain/res/PreparePlatformFeeWithdrawalResponse";
import type { IPreparePlatformFeeWithdrawal } from "../interface/IPreparePlatformFeeWithdrawal";

export class PreparePlatformFeeWithdrawal implements IPreparePlatformFeeWithdrawal {
    constructor(private repository: RepaymentsRepository) {}

    async execute(request: PreparePlatformFeeWithdrawalRequest): Promise<PreparePlatformFeeWithdrawalResponse> {
        return this.repository.preparePlatformFeeWithdrawal(request);
    }
}
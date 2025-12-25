import type { PreparePlatformFeeWithdrawalRequest } from "../../domain/req/PreparePlatformFeeWithdrawalRequest";
import type { PreparePlatformFeeWithdrawalResponse } from "../../domain/res/PreparePlatformFeeWithdrawalResponse";

export interface IPreparePlatformFeeWithdrawal {
    execute(request: PreparePlatformFeeWithdrawalRequest): Promise<PreparePlatformFeeWithdrawalResponse>;
}
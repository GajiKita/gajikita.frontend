import type { ProcessCycleRequest } from "../../domain/req/ProcessCycleRequest";
import type { PreparePlatformFeeWithdrawalRequest } from "../../domain/req/PreparePlatformFeeWithdrawalRequest";
import type { ProcessCycleResponse } from "../../domain/res/ProcessCycleResponse";
import type { PreparePlatformFeeWithdrawalResponse } from "../../domain/res/PreparePlatformFeeWithdrawalResponse";

export interface RepaymentsRepository {
    processCycle(request: ProcessCycleRequest): Promise<ProcessCycleResponse>;
    preparePlatformFeeWithdrawal(request: PreparePlatformFeeWithdrawalRequest): Promise<PreparePlatformFeeWithdrawalResponse>;
}
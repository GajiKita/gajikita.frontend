import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { RepaymentsRepositoryImpl } from "../repository/implementation/RepaymentsRepositoryImpl";
import { ProcessCycle } from "../usecase/implementation/ProcessCycle";
import { PreparePlatformFeeWithdrawal } from "../usecase/implementation/PreparePlatformFeeWithdrawal";
import type { ProcessCycleRequest } from "../domain/req/ProcessCycleRequest";
import type { PreparePlatformFeeWithdrawalRequest } from "../domain/req/PreparePlatformFeeWithdrawalRequest";
import type { ProcessCycleResponse } from "../domain/res/ProcessCycleResponse";
import type { PreparePlatformFeeWithdrawalResponse } from "../domain/res/PreparePlatformFeeWithdrawalResponse";
import { ApiError } from "@/core/utils/http/httpClient";

export const useProcessCycleMutation = (
    options?: UseMutationOptions<ProcessCycleResponse, ApiError, ProcessCycleRequest>
) => {
    const repository = new RepaymentsRepositoryImpl();
    const usecase = new ProcessCycle(repository);

    return useMutation<ProcessCycleResponse, ApiError, ProcessCycleRequest>({
        mutationFn: (request: ProcessCycleRequest) => usecase.execute(request),
        ...options,
    });
};

export const usePreparePlatformFeeWithdrawalMutation = (
    options?: UseMutationOptions<PreparePlatformFeeWithdrawalResponse, ApiError, PreparePlatformFeeWithdrawalRequest>
) => {
    const repository = new RepaymentsRepositoryImpl();
    const usecase = new PreparePlatformFeeWithdrawal(repository);

    return useMutation<PreparePlatformFeeWithdrawalResponse, ApiError, PreparePlatformFeeWithdrawalRequest>({
        mutationFn: (request: PreparePlatformFeeWithdrawalRequest) => usecase.execute(request),
        ...options,
    });
};
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { InvestorRepositoryImpl } from "../repository/implementation/InvestorRepositoryImpl";
import { CreateInvestor } from "../usecase/implementation/CreateInvestor";
import { UpdateInvestor } from "../usecase/implementation/UpdateInvestor";
import { DeleteInvestor } from "../usecase/implementation/DeleteInvestor";
import { PrepareDepositLiquidity } from "../usecase/implementation/PrepareDepositLiquidity";
import { PrepareWithdrawReward } from "../usecase/implementation/PrepareWithdrawReward";
import { UpdateMePreferredToken } from "../usecase/implementation/UpdateMePreferredToken";
import type { CreateInvestorRequest } from "../domain/req/CreateInvestorRequest";
import type { UpdateInvestorRequest } from "../domain/req/UpdateInvestorRequest";
import type { PrepareTransactionRequest } from "../../shared/domain/req/PrepareTransactionRequest";
import type { UpdatePreferredTokenRequest } from "../../shared/domain/req/UpdatePreferredTokenRequest";
import type { InvestorResponse } from "../domain/res/InvestorResponse";
import type { TransactionResponse } from "../../shared/domain/res/TransactionResponse";
import { ApiError } from "@/core/utils/http/httpClient";

export const useCreateInvestorMutation = (
    options?: UseMutationOptions<InvestorResponse, ApiError, CreateInvestorRequest>
) => {
    const repository = new InvestorRepositoryImpl();
    const usecase = new CreateInvestor(repository);

    return useMutation<InvestorResponse, ApiError, CreateInvestorRequest>({
        mutationFn: (request: CreateInvestorRequest) => usecase.execute(request),
        ...options,
    });
};

export const useUpdateInvestorMutation = (
    options?: UseMutationOptions<InvestorResponse, ApiError, UpdateInvestorRequest>
) => {
    const repository = new InvestorRepositoryImpl();
    const usecase = new UpdateInvestor(repository);

    return useMutation<InvestorResponse, ApiError, UpdateInvestorRequest>({
        mutationFn: (request: UpdateInvestorRequest) => usecase.execute(request),
        ...options,
    });
};

export const useDeleteInvestorMutation = (
    options?: UseMutationOptions<void, ApiError, string>
) => {
    const repository = new InvestorRepositoryImpl();
    const usecase = new DeleteInvestor(repository);

    return useMutation<void, ApiError, string>({
        mutationFn: (id: string) => usecase.execute(id),
        ...options,
    });
};

export const usePrepareDepositLiquidityMutation = (
    options?: UseMutationOptions<TransactionResponse, ApiError, PrepareTransactionRequest>
) => {
    const repository = new InvestorRepositoryImpl();
    const usecase = new PrepareDepositLiquidity(repository);

    return useMutation<TransactionResponse, ApiError, PrepareTransactionRequest>({
        mutationFn: (request: PrepareTransactionRequest) => usecase.execute(request),
        ...options,
    });
};

export const usePrepareWithdrawRewardMutation = (
    options?: UseMutationOptions<TransactionResponse, ApiError, PrepareTransactionRequest>
) => {
    const repository = new InvestorRepositoryImpl();
    const usecase = new PrepareWithdrawReward(repository);

    return useMutation<TransactionResponse, ApiError, PrepareTransactionRequest>({
        mutationFn: (request: PrepareTransactionRequest) => usecase.execute(request),
        ...options,
    });
};

export const useUpdateMePreferredTokenMutation = (
    options?: UseMutationOptions<TransactionResponse, ApiError, UpdatePreferredTokenRequest>
) => {
    const repository = new InvestorRepositoryImpl();
    const usecase = new UpdateMePreferredToken(repository);

    return useMutation<TransactionResponse, ApiError, UpdatePreferredTokenRequest>({
        mutationFn: (request: UpdatePreferredTokenRequest) => usecase.execute(request),
        ...options,
    });
};
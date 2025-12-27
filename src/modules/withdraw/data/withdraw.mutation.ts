import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { WithdrawRepositoryImpl } from "../repository/implementation/WithdrawRepositoryImpl";
import { CreateWithdrawRequest } from "../usecase/implementation/CreateWithdrawRequest";
import { ExecuteWithdraw } from "../usecase/implementation/ExecuteWithdraw";
import type { CreateWithdrawRequest as CreateWithdrawRequestDto } from "../domain/req/CreateWithdrawRequest";
import type { ExecuteWithdrawRequest } from "../domain/req/ExecuteWithdrawRequest";
import type { TransactionResponse } from "../../shared/domain/res/TransactionResponse";
import type { ExecuteWithdrawResponse } from "../domain/res/ExecuteWithdrawResponse";
import { ApiError } from "@/core/utils/http/httpClient";

export const useCreateWithdrawRequestMutation = (
    options?: UseMutationOptions<TransactionResponse, ApiError, CreateWithdrawRequestDto>
) => {
    const repository = new WithdrawRepositoryImpl();
    const usecase = new CreateWithdrawRequest(repository);

    return useMutation<TransactionResponse, ApiError, CreateWithdrawRequestDto>({
        mutationFn: (request: CreateWithdrawRequestDto) => usecase.execute(request),
        ...options,
    });
};

export const useExecuteWithdrawMutation = (
    options?: UseMutationOptions<ExecuteWithdrawResponse, ApiError, { id: string; request: ExecuteWithdrawRequest }>
) => {
    const repository = new WithdrawRepositoryImpl();
    const usecase = new ExecuteWithdraw(repository);

    return useMutation<ExecuteWithdrawResponse, ApiError, { id: string; request: ExecuteWithdrawRequest }>({
        mutationFn: ({ id, request }) => usecase.execute(id, request),
        ...options,
    });
};
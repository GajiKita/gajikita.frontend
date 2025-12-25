import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { WithdrawRepositoryImpl } from "../repository/implementation/WithdrawRepositoryImpl";
import { CreateWithdrawRequest } from "../usecase/implementation/CreateWithdrawRequest";
import type { CreateWithdrawRequest as CreateWithdrawRequestDto } from "../domain/req/CreateWithdrawRequest";
import type { TransactionResponse } from "../../shared/domain/res/TransactionResponse";
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
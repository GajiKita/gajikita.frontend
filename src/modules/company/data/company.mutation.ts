import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { CompanyRepositoryImpl } from "../repository/implementation/CompanyRepositoryImpl";
import { CreateCompany } from "../usecase/implementation/CreateCompany";
import { UpdateCompany } from "../usecase/implementation/UpdateCompany";
import { DeleteCompany } from "../usecase/implementation/DeleteCompany";
import { PrepareLockLiquidity } from "../usecase/implementation/PrepareLockLiquidity";
import { PrepareWithdrawReward } from "../usecase/implementation/PrepareWithdrawReward";
import { UpdatePreferredToken } from "../usecase/implementation/UpdatePreferredToken";
import type { CreateCompanyRequest } from "../domain/req/CreateCompanyRequest";
import type { UpdateCompanyRequest } from "../domain/req/UpdateCompanyRequest";
import type { PrepareTransactionRequest } from "../../shared/domain/req/PrepareTransactionRequest";
import type { UpdatePreferredTokenRequest } from "../../shared/domain/req/UpdatePreferredTokenRequest";
import type { CompanyResponse } from "../domain/res/CompanyResponse";
import type { TransactionResponse } from "../../shared/domain/res/TransactionResponse";
import { ApiError } from "@/core/utils/http/httpClient";

export const useCreateCompanyMutation = (
    options?: UseMutationOptions<CompanyResponse, ApiError, CreateCompanyRequest>
) => {
    const repository = new CompanyRepositoryImpl();
    const usecase = new CreateCompany(repository);

    return useMutation<CompanyResponse, ApiError, CreateCompanyRequest>({
        mutationFn: (request) => usecase.execute(request),
        ...options,
    });
};

export const useUpdateCompanyMutation = (
    options?: UseMutationOptions<CompanyResponse, ApiError, UpdateCompanyRequest>
) => {
    const repository = new CompanyRepositoryImpl();
    const usecase = new UpdateCompany(repository);

    return useMutation<CompanyResponse, ApiError, UpdateCompanyRequest>({
        mutationFn: (request) => usecase.execute(request),
        ...options,
    });
};

export const useDeleteCompanyMutation = (
    options?: UseMutationOptions<void, ApiError, string>
) => {
    const repository = new CompanyRepositoryImpl();
    const usecase = new DeleteCompany(repository);

    return useMutation<void, ApiError, string>({
        mutationFn: (id) => usecase.execute(id),
        ...options,
    });
};

export const usePrepareLockLiquidityMutation = (
    options?: UseMutationOptions<TransactionResponse, ApiError, PrepareTransactionRequest>
) => {
    const repository = new CompanyRepositoryImpl();
    const usecase = new PrepareLockLiquidity(repository);

    return useMutation<TransactionResponse, ApiError, PrepareTransactionRequest>({
        mutationFn: (request) => usecase.execute(request),
        ...options,
    });
};

export const usePrepareWithdrawRewardMutation = (
    options?: UseMutationOptions<TransactionResponse, ApiError, PrepareTransactionRequest>
) => {
    const repository = new CompanyRepositoryImpl();
    const usecase = new PrepareWithdrawReward(repository);

    return useMutation<TransactionResponse, ApiError, PrepareTransactionRequest>({
        mutationFn: (request) => usecase.execute(request),
        ...options,
    });
};

export const useUpdatePreferredTokenMutation = (
    options?: UseMutationOptions<TransactionResponse, ApiError, { id: string; request: UpdatePreferredTokenRequest }>
) => {
    const repository = new CompanyRepositoryImpl();
    const usecase = new UpdatePreferredToken(repository);

    return useMutation<TransactionResponse, ApiError, { id: string; request: UpdatePreferredTokenRequest }>({
        mutationFn: ({ id, request }) => usecase.execute(id, request),
        ...options,
    });
};

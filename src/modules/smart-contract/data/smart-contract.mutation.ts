import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { SmartContractRepositoryImpl } from "../repository/implementation/SmartContractRepositoryImpl";
import { CreateSmartContract } from "../usecase/implementation/CreateSmartContract";
import { UpdateSmartContract } from "../usecase/implementation/UpdateSmartContract";
import { DeleteSmartContract } from "../usecase/implementation/DeleteSmartContract";
import type { CreateSmartContractRequest } from "../domain/req/CreateSmartContractRequest";
import type { UpdateSmartContractRequest } from "../domain/req/UpdateSmartContractRequest";
import type { SmartContractResponse } from "../domain/res/SmartContractResponse";
import { ApiError } from "@/core/utils/http/httpClient";

export const useCreateSmartContractMutation = (
    options?: UseMutationOptions<SmartContractResponse, ApiError, CreateSmartContractRequest>
) => {
    const repository = new SmartContractRepositoryImpl();
    const usecase = new CreateSmartContract(repository);

    return useMutation<SmartContractResponse, ApiError, CreateSmartContractRequest>({
        mutationFn: (request: CreateSmartContractRequest) => usecase.execute(request),
        ...options,
    });
};

export const useUpdateSmartContractMutation = (
    options?: UseMutationOptions<SmartContractResponse, ApiError, UpdateSmartContractRequest>
) => {
    const repository = new SmartContractRepositoryImpl();
    const usecase = new UpdateSmartContract(repository);

    return useMutation<SmartContractResponse, ApiError, UpdateSmartContractRequest>({
        mutationFn: (request: UpdateSmartContractRequest) => usecase.execute(request),
        ...options,
    });
};

export const useDeleteSmartContractMutation = (
    options?: UseMutationOptions<void, ApiError, string>
) => {
    const repository = new SmartContractRepositoryImpl();
    const usecase = new DeleteSmartContract(repository);

    return useMutation<void, ApiError, string>({
        mutationFn: (id: string) => usecase.execute(id),
        ...options,
    });
};
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { SmartContractRepositoryImpl } from "../repository/implementation/SmartContractRepositoryImpl";
import { GetSmartContracts } from "../usecase/implementation/GetSmartContracts";
import { GetSmartContractById } from "../usecase/implementation/GetSmartContractById";
import type { GetSmartContractsRequest } from "../domain/req/GetSmartContractsRequest";
import type { GetSmartContractByIdRequest } from "../domain/req/GetSmartContractByIdRequest";
import type { SmartContractListResponse } from "../domain/res/SmartContractListResponse";
import type { SmartContractResponse } from "../domain/res/SmartContractResponse";
import { ApiError } from "@/core/utils/http/httpClient";

export const smartContractQueryKeys = {
    list: (params: GetSmartContractsRequest) => ['smart-contracts', 'list', params] as const,
    detail: (id: string) => ['smart-contracts', 'detail', id] as const,
};

export const useSmartContractsQuery = (
    params: GetSmartContractsRequest = {},
    options?: Omit<UseQueryOptions<SmartContractListResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
    const repository = new SmartContractRepositoryImpl();
    const usecase = new GetSmartContracts(repository);

    return useQuery<SmartContractListResponse, ApiError>({
        queryKey: smartContractQueryKeys.list(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useSmartContractQuery = (
    params: GetSmartContractByIdRequest,
    options?: Omit<UseQueryOptions<SmartContractResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
    const repository = new SmartContractRepositoryImpl();
    const usecase = new GetSmartContractById(repository);

    return useQuery<SmartContractResponse, ApiError>({
        queryKey: smartContractQueryKeys.detail(params.id),
        queryFn: () => usecase.execute(params),
        enabled: !!params.id,
        ...options,
    });
};
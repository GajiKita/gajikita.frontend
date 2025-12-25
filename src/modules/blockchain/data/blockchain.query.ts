import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { BlockchainRepositoryImpl } from "../repository/implementation/BlockchainRepositoryImpl";
import { GetSupportedTokens } from "../usecase/implementation/GetSupportedTokens";
import type { TokenListResponse } from "../domain/res/TokenListResponse";
import { ApiError } from "@/core/utils/http/httpClient";

export const blockchainQueryKeys = {
    supportedTokens: () => ['blockchain', 'supported-tokens'] as const,
};

export const useSupportedTokensQuery = (
    options?: Omit<UseQueryOptions<TokenListResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
    const repository = new BlockchainRepositoryImpl();
    const usecase = new GetSupportedTokens(repository);

    return useQuery<TokenListResponse, ApiError>({
        queryKey: blockchainQueryKeys.supportedTokens(),
        queryFn: () => usecase.execute(),
        ...options,
    });
};
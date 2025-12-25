import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { BlockchainRepositoryImpl } from "../repository/implementation/BlockchainRepositoryImpl";
import { SyncTokens } from "../usecase/implementation/SyncTokens";
import { ApiError } from "@/core/utils/http/httpClient";

export const useSyncTokensMutation = (
    options?: UseMutationOptions<any, ApiError, void>
) => {
    const repository = new BlockchainRepositoryImpl();
    const usecase = new SyncTokens(repository);

    return useMutation<any, ApiError, void>({
        mutationFn: () => usecase.execute(),
        ...options,
    });
};
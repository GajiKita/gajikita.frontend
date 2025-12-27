import { useSupportedTokensQuery } from '../../data/blockchain.query';
import { useSyncTokensMutation } from '../../data/blockchain.mutation';

export const useSupportedTokensPresentation = () => {
  const query = useSupportedTokensQuery();

  return {
    tokens: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useSyncTokensPresentation = () => {
  const mutation = useSyncTokensMutation();

  return {
    syncTokens: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};

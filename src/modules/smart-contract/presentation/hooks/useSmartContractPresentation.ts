import { 
  useSmartContractsQuery, 
  useSmartContractQuery, 
  useCreateSmartContractMutation, 
  useUpdateSmartContractMutation, 
  useDeleteSmartContractMutation 
} from '../../data/smart-contract.query';

export const useSmartContractsPresentation = () => {
  const query = useSmartContractsQuery({});

  return {
    smartContracts: query.data?.smart_contracts || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useSmartContractDetailPresentation = (id: string) => {
  const query = useSmartContractQuery({ id });

  return {
    smartContract: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export const useCreateSmartContractPresentation = () => {
  const mutation = useCreateSmartContractMutation();

  return {
    createSmartContract: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};

export const useUpdateSmartContractPresentation = () => {
  const mutation = useUpdateSmartContractMutation();

  return {
    updateSmartContract: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};

export const useDeleteSmartContractPresentation = () => {
  const mutation = useDeleteSmartContractMutation();

  return {
    deleteSmartContract: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
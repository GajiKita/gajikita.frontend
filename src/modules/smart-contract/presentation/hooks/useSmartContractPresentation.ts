import {
  useSmartContractsQuery,
  useSmartContractQuery,
} from '../../data/smart-contract.query';
import {
  useCreateSmartContractMutation,
  useUpdateSmartContractMutation,
  useDeleteSmartContractMutation
} from '../../data/smart-contract.mutation';
import { SmartContractEntity } from '../../domain/entity/SmartContractEntity';
import { CreateSmartContractRequest } from '../../domain/req/CreateSmartContractRequest';
import { UpdateSmartContractRequest } from '../../domain/req/UpdateSmartContractRequest';

export const useSmartContractListPresentation = (params: {
  page?: number;
  limit?: number;
  search?: string;
} = {}) => {
  const query = useSmartContractsQuery(params);

  return {
    smartContracts: query.data?.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useSmartContractDetailPresentation = (id: string) => {
  const query = useSmartContractQuery({ id });

  return {
    smartContract: query.data?.data,
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
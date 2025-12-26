import {
  useCompaniesQuery,
  useCompanyQuery,
} from '../../data/company.query';
import {
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  usePrepareLockLiquidityMutation,
  usePrepareWithdrawRewardMutation,
  useUpdatePreferredTokenMutation
} from '../../data/company.mutation';
import { CompanyEntity } from '../../domain/entity/CompanyEntity';
import { CreateCompanyRequest } from '../../domain/req/CreateCompanyRequest';
import { UpdateCompanyRequest } from '../../domain/req/UpdateCompanyRequest';
import { PrepareTransactionRequest } from '@/modules/shared/domain/req/PrepareTransactionRequest';
import { UpdatePreferredTokenRequest } from '@/modules/shared/domain/req/UpdatePreferredTokenRequest';
import { TransactionResponse } from '@/modules/shared/domain/res/TransactionResponse';

export const useCompanyListPresentation = (params: {
  page?: number;
  limit?: number;
  search?: string;
} = {}) => {
  const query = useCompaniesQuery(params);

  return {
    companies: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useCompanyDetailPresentation = (id: string) => {
  const query = useCompanyQuery({ id });

  return {
    company: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export const useCreateCompanyPresentation = () => {
  const mutation = useCreateCompanyMutation();

  return {
    createCompany: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useUpdateCompanyPresentation = () => {
  const mutation = useUpdateCompanyMutation();

  return {
    updateCompany: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useDeleteCompanyPresentation = () => {
  const mutation = useDeleteCompanyMutation();

  return {
    deleteCompany: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const usePrepareLockLiquidityPresentation = () => {
  const mutation = usePrepareLockLiquidityMutation();

  return {
    prepareLockLiquidity: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const usePrepareWithdrawRewardPresentation = () => {
  const mutation = usePrepareWithdrawRewardMutation();

  return {
    prepareWithdrawReward: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useUpdatePreferredTokenPresentation = () => {
  const mutation = useUpdatePreferredTokenMutation();

  return {
    updatePreferredToken: (id: string, request: UpdatePreferredTokenRequest) => 
      mutation.mutate({ id, request }),
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
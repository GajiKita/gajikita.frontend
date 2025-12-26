import {
  useInvestorsQuery,
  useInvestorQuery,
} from '../../data/investor.query';
import {
  useCreateInvestorMutation,
  useUpdateInvestorMutation,
  useDeleteInvestorMutation,
  usePrepareDepositLiquidityMutation,
  usePrepareWithdrawRewardMutation,
  useUpdateMePreferredTokenMutation
} from '../../data/investor.mutation';
import { InvestorEntity } from '../../domain/entity/InvestorEntity';
import { CreateInvestorRequest } from '../../domain/req/CreateInvestorRequest';
import { UpdateInvestorRequest } from '../../domain/req/UpdateInvestorRequest';
import { PrepareTransactionRequest } from '@/modules/shared/domain/req/PrepareTransactionRequest';
import { UpdatePreferredTokenRequest } from '@/modules/shared/domain/req/UpdatePreferredTokenRequest';
import { TransactionResponse } from '@/modules/shared/domain/res/TransactionResponse';

export const useInvestorListPresentation = (params: {
  page?: number;
  limit?: number;
  search?: string;
} = {}) => {
  const query = useInvestorsQuery(params);

  return {
    investors: query.data?.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useInvestorDetailPresentation = (id: string) => {
  const query = useInvestorQuery({ id });

  return {
    investor: query.data?.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export const useCreateInvestorPresentation = () => {
  const mutation = useCreateInvestorMutation();

  return {
    createInvestor: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useUpdateInvestorPresentation = () => {
  const mutation = useUpdateInvestorMutation();

  return {
    updateInvestor: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useDeleteInvestorPresentation = () => {
  const mutation = useDeleteInvestorMutation();

  return {
    deleteInvestor: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const usePrepareDepositLiquidityPresentation = () => {
  const mutation = usePrepareDepositLiquidityMutation();

  return {
    prepareDepositLiquidity: mutation.mutate,
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

export const useUpdateMePreferredTokenPresentation = () => {
  const mutation = useUpdateMePreferredTokenMutation();

  return {
    updateMePreferredToken: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
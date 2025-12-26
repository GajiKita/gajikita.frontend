import {
  useSimulateWithdrawQuery,
} from '../../data/withdraw.query';
import {
  useCreateWithdrawRequestMutation
} from '../../data/withdraw.mutation';
import { SimulateWithdrawRequest } from '../../domain/req/SimulateWithdrawRequest';
import { CreateWithdrawRequest as CreateWithdrawRequestDto } from '../../domain/req/CreateWithdrawRequest';
import { SimulationResponse } from '../../domain/res/SimulationResponse';
import { TransactionResponse } from '@/modules/shared/domain/res/TransactionResponse';

export const useSimulateWithdrawPresentation = (params: SimulateWithdrawRequest) => {
  const query = useSimulateWithdrawQuery(params);

  return {
    simulation: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useCreateWithdrawRequestPresentation = () => {
  const mutation = useCreateWithdrawRequestMutation();

  return {
    createWithdrawRequest: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
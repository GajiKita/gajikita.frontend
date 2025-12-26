import {
  useProcessCycleMutation,
  usePreparePlatformFeeWithdrawalMutation
} from '../../data/repayments.mutation';
import { ProcessCycleRequest } from '../../domain/req/ProcessCycleRequest';
import { PreparePlatformFeeWithdrawalRequest } from '../../domain/req/PreparePlatformFeeWithdrawalRequest';
import { ProcessCycleResponse } from '../../domain/res/ProcessCycleResponse';
import { PreparePlatformFeeWithdrawalResponse } from '../../domain/res/PreparePlatformFeeWithdrawalResponse';

export const useProcessCyclePresentation = () => {
  const mutation = useProcessCycleMutation();

  return {
    processCycle: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const usePreparePlatformFeeWithdrawalPresentation = () => {
  const mutation = usePreparePlatformFeeWithdrawalMutation();

  return {
    preparePlatformFeeWithdrawal: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
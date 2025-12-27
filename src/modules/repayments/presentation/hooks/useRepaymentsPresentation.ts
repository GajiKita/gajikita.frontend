import { 
  useProcessCycleMutation,
  usePreparePlatformFeeWithdrawalMutation
} from '../../data/repayments.mutation';

export const useRepaymentsPresentation = () => {
  const processCycleMutation = useProcessCycleMutation();
  const preparePlatformFeeWithdrawalMutation = usePreparePlatformFeeWithdrawalMutation();

  return {
    processCycle: processCycleMutation.mutate,
    preparePlatformFeeWithdrawal: preparePlatformFeeWithdrawalMutation.mutate,
    isLoading: processCycleMutation.isPending || preparePlatformFeeWithdrawalMutation.isPending,
    isError: processCycleMutation.isError || preparePlatformFeeWithdrawalMutation.isError,
    error: processCycleMutation.error || preparePlatformFeeWithdrawalMutation.error,
  };
};

export const useProcessCyclePresentation = () => {
  const mutation = useProcessCycleMutation();

  return {
    processCycle: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
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
    data: mutation.data,
  };
};
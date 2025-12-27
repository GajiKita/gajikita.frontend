import { useSimulateWithdrawQuery } from '../../data/withdraw.query';
import { useCreateWithdrawRequestMutation, useExecuteWithdrawMutation } from '../../data/withdraw.mutation';

export const useWithdrawsPresentation = () => {
  const query = useSimulateWithdrawQuery();

  return {
    withdraws: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useWithdrawDetailPresentation = (id: string) => {
  // For now, we'll use the simulate query as an example - in practice you might have a specific detail query
  const query = useSimulateWithdrawQuery({ employee_id: '', payroll_cycle_id: '', requested_amount: 0 });

  return {
    withdraw: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export const useCreateWithdrawPresentation = () => {
  const mutation = useCreateWithdrawRequestMutation();

  return {
    createWithdrawRequest: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};

export const useExecuteWithdrawPresentation = () => {
  const mutation = useExecuteWithdrawMutation();

  return {
    executeWithdraw: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};
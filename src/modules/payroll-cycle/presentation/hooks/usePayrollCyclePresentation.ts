import { usePayrollCyclesQuery, usePayrollCycleQuery, useCreatePayrollCycleMutation } from '../../data/payroll-cycle.query';
import { PayrollCycleEntity } from '../../domain/entity/PayrollCycleEntity';
import { CreatePayrollCycleRequest } from '../../domain/req/CreatePayrollCycleRequest';

export const usePayrollCyclePresentation = (params: { companyId?: string } = {}) => {
  const query = usePayrollCyclesQuery(params);
  
  return {
    payrollCycles: query.data?.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export const usePayrollCycleDetailPresentation = (id: string) => {
  const query = usePayrollCycleQuery({ id });
  
  return {
    payrollCycle: query.data?.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export const useCreatePayrollCyclePresentation = () => {
  const mutation = useCreatePayrollCycleMutation();
  
  return {
    createPayrollCycle: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
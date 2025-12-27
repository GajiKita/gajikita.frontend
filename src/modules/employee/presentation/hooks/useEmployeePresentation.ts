import { 
  useEmployeesQuery,
  useEmployeeQuery,
  useEmployeesByCompanyQuery,
  useEmployeesByMyCompanyQuery,
} from '../../data/employee.query';
import {
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateMePreferredTokenMutation
} from '../../data/employee.mutation';
import { EmployeeEntity } from '../../domain/entity/EmployeeEntity';
import { CreateEmployeeRequest } from '../../domain/req/CreateEmployeeRequest';
import { UpdateEmployeeRequest } from '../../domain/req/UpdateEmployeeRequest';

export const useEmployeeListPresentation = (params: {
  page?: number;
  limit?: number;
  search?: string;
  companyId?: string;
} = {}) => {
  const query = useEmployeesQuery(params);

  return {
    employees: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useEmployeesByCompanyPresentation = (companyId: string) => {
  const query = useEmployeesByCompanyQuery(companyId);

  return {
    employees: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useEmployeesByMyCompanyPresentation = () => {
  const query = useEmployeesByMyCompanyQuery();

  return {
    employees: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useEmployeeDetailPresentation = (id: string) => {
  const query = useEmployeeQuery({ id });

  return {
    employee: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export const useCreateEmployeePresentation = () => {
  const mutation = useCreateEmployeeMutation();

  return {
    createEmployee: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useUpdateEmployeePresentation = () => {
  const mutation = useUpdateEmployeeMutation();

  return {
    updateEmployee: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useDeleteEmployeePresentation = () => {
  const mutation = useDeleteEmployeeMutation();

  return {
    deleteEmployee: mutation.mutate,
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
    data: mutation.data,
  };
};

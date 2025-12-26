import { useWorklogsQuery } from '../../data/worklog.query';
import { useCreateWorklogMutation, useCheckInMutation, useCheckOutMutation, useApproveWorklogMutation } from '../../data/worklog.mutation';
import { WorklogEntity } from '../../domain/entity/WorklogEntity';
import { CreateWorklogRequest } from '../../domain/req/CreateWorklogRequest';
import { CheckInRequest } from '../../domain/req/CheckInRequest';

export const useWorklogListPresentation = (employeeId: string) => {
  const query = useWorklogsQuery({ employeeId });
  
  return {
    worklogs: query.data?.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useCreateWorklogPresentation = () => {
  const mutation = useCreateWorklogMutation();
  
  return {
    createWorklog: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useCheckInPresentation = () => {
  const mutation = useCheckInMutation();
  
  return {
    checkIn: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useCheckOutPresentation = () => {
  const mutation = useCheckOutMutation();
  
  return {
    checkOut: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useApproveWorklogPresentation = () => {
  const mutation = useApproveWorklogMutation();
  
  return {
    approveWorklog: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { EmployeeRepositoryImpl } from "../repository/implementation/EmployeeRepositoryImpl";
import { GetEmployees } from "../usecase/implementation/GetEmployees";
import { GetEmployeeById } from "../usecase/implementation/GetEmployeeById";
import type { GetEmployeesRequest } from "../domain/req/GetEmployeesRequest";
import type { GetEmployeeByIdRequest } from "../domain/req/GetEmployeeByIdRequest";
import type { EmployeeListResponse } from "../domain/res/EmployeeListResponse";
import type { EmployeeResponse } from "../domain/res/EmployeeResponse";
import { ApiError } from "@/core/utils/http/httpClient";

export const employeeQueryKeys = {
    list: (params: GetEmployeesRequest) => ['employees', 'list', params] as const,
    byCompany: (companyId: string) => ['employees', 'by-company', companyId] as const,
    byMyCompany: () => ['employees', 'by-my-company'] as const,
    detail: (id: string) => ['employees', 'detail', id] as const,
};

export const useEmployeesQuery = (
    params: GetEmployeesRequest = {},
    options?: Omit<UseQueryOptions<EmployeeListResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
    const repository = new EmployeeRepositoryImpl();
    const usecase = new GetEmployees(repository);

    return useQuery<EmployeeListResponse, ApiError>({
        queryKey: employeeQueryKeys.list(params),
        queryFn: () => usecase.execute(params),
        staleTime: 1000 * 60 * 2, // 2 minutes
        gcTime: 1000 * 60 * 5,  // 5 minutes
        retry: 1,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
        refetchOnWindowFocus: false,
        ...options,
    });
};

export const useEmployeesByCompanyQuery = (
    companyId: string,
    options?: Omit<UseQueryOptions<EmployeeListResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
    const repository = new EmployeeRepositoryImpl();
    const usecase = new GetEmployees(repository);

    return useQuery<EmployeeListResponse, ApiError>({
        queryKey: employeeQueryKeys.byCompany(companyId),
        queryFn: () => usecase.execute({ companyId }),
        enabled: !!companyId,
        ...options,
    });
};

export const useEmployeesByMyCompanyQuery = (
    options?: Omit<UseQueryOptions<EmployeeListResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
    const repository = new EmployeeRepositoryImpl();
    const usecase = new GetEmployees(repository);

    return useQuery<EmployeeListResponse, ApiError>({
        queryKey: employeeQueryKeys.byMyCompany(),
        queryFn: () => usecase.execute({}),
        ...options,
    });
};

export const useEmployeeQuery = (
    params: GetEmployeeByIdRequest,
    options?: Omit<UseQueryOptions<EmployeeResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
    const repository = new EmployeeRepositoryImpl();
    const usecase = new GetEmployeeById(repository);

    return useQuery<EmployeeResponse, ApiError>({
        queryKey: employeeQueryKeys.detail(params.id),
        queryFn: () => usecase.execute(params),
        enabled: !!params.id,
        ...options,
    });
};

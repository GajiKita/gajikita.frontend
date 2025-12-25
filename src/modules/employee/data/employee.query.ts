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

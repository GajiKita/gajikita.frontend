import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { PayrollCycleRepositoryImpl } from "../repository/implementation/PayrollCycleRepositoryImpl";
import { GetPayrollCycles } from "../usecase/implementation/GetPayrollCycles";
import { GetPayrollCycleById } from "../usecase/implementation/GetPayrollCycleById";
import type { GetPayrollCyclesRequest } from "../domain/req/GetPayrollCyclesRequest";
import type { GetPayrollCycleByIdRequest } from "../domain/req/GetPayrollCycleByIdRequest";
import type { PayrollCycleListResponse } from "../domain/res/PayrollCycleListResponse";
import type { PayrollCycleResponse } from "../domain/res/PayrollCycleResponse";
import { ApiError } from "@/core/utils/http/httpClient";

export const payrollCycleQueryKeys = {
    list: (params: GetPayrollCyclesRequest) => ['payroll-cycles', 'list', params] as const,
    detail: (id: string) => ['payroll-cycles', 'detail', id] as const,
};

export const usePayrollCyclesQuery = (
    params: GetPayrollCyclesRequest = {},
    options?: Omit<UseQueryOptions<PayrollCycleListResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
    const repository = new PayrollCycleRepositoryImpl();
    const usecase = new GetPayrollCycles(repository);

    return useQuery<PayrollCycleListResponse, ApiError>({
        queryKey: payrollCycleQueryKeys.list(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const usePayrollCycleQuery = (
    params: GetPayrollCycleByIdRequest,
    options?: Omit<UseQueryOptions<PayrollCycleResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
    const repository = new PayrollCycleRepositoryImpl();
    const usecase = new GetPayrollCycleById(repository);

    return useQuery<PayrollCycleResponse, ApiError>({
        queryKey: payrollCycleQueryKeys.detail(params.id),
        queryFn: () => usecase.execute(params),
        enabled: !!params.id,
        ...options,
    });
};

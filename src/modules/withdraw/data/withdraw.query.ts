import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { WithdrawRepositoryImpl } from "../repository/implementation/WithdrawRepositoryImpl";
import { SimulateWithdraw } from "../usecase/implementation/SimulateWithdraw";
import type { SimulateWithdrawRequest } from "../domain/req/SimulateWithdrawRequest";
import type { SimulationResponse } from "../domain/res/SimulationResponse";
import { ApiError } from "@/core/utils/http/httpClient";

export const withdrawQueryKeys = {
    simulate: (params: SimulateWithdrawRequest) => ['withdraws', 'simulate', params] as const,
};

export const useSimulateWithdrawQuery = (
    params: SimulateWithdrawRequest,
    options?: Omit<UseQueryOptions<SimulationResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
    const repository = new WithdrawRepositoryImpl();
    const usecase = new SimulateWithdraw(repository);

    return useQuery<SimulationResponse, ApiError>({
        queryKey: withdrawQueryKeys.simulate(params),
        queryFn: () => usecase.execute(params),
        enabled: !!(params.employee_id && params.payroll_cycle_id && params.requested_amount),
        ...options,
    });
};
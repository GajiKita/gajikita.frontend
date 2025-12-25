import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { PayrollCycleRepositoryImpl } from "../repository/implementation/PayrollCycleRepositoryImpl";
import { CreatePayrollCycle } from "../usecase/implementation/CreatePayrollCycle";
import type { CreatePayrollCycleRequest } from "../domain/req/CreatePayrollCycleRequest";
import type { PayrollCycleResponse } from "../domain/res/PayrollCycleResponse";
import { ApiError } from "@/core/utils/http/httpClient";

export const useCreatePayrollCycleMutation = (
    options?: UseMutationOptions<PayrollCycleResponse, ApiError, CreatePayrollCycleRequest>
) => {
    const repository = new PayrollCycleRepositoryImpl();
    const usecase = new CreatePayrollCycle(repository);

    return useMutation<PayrollCycleResponse, ApiError, CreatePayrollCycleRequest>({
        mutationFn: (request: CreatePayrollCycleRequest) => usecase.execute(request),
        ...options,
    });
};
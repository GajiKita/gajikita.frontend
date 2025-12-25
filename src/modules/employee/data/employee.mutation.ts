import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { EmployeeRepositoryImpl } from "../repository/implementation/EmployeeRepositoryImpl";
import { CreateEmployee } from "../usecase/implementation/CreateEmployee";
import { UpdateEmployee } from "../usecase/implementation/UpdateEmployee";
import { DeleteEmployee } from "../usecase/implementation/DeleteEmployee";
import { UpdateMePreferredToken } from "../usecase/implementation/UpdateMePreferredToken";
import type { CreateEmployeeRequest } from "../domain/req/CreateEmployeeRequest";
import type { UpdateEmployeeRequest } from "../domain/req/UpdateEmployeeRequest";
import type { UpdatePreferredTokenRequest } from "../../shared/domain/req/UpdatePreferredTokenRequest";
import type { EmployeeResponse } from "../domain/res/EmployeeResponse";
import type { TransactionResponse } from "../../shared/domain/res/TransactionResponse";
import { ApiError } from "@/core/utils/http/httpClient";

export const useCreateEmployeeMutation = (
    options?: UseMutationOptions<EmployeeResponse, ApiError, CreateEmployeeRequest>
) => {
    const repository = new EmployeeRepositoryImpl();
    const usecase = new CreateEmployee(repository);

    return useMutation<EmployeeResponse, ApiError, CreateEmployeeRequest>({
        mutationFn: (request) => usecase.execute(request),
        ...options,
    });
};

export const useUpdateEmployeeMutation = (
    options?: UseMutationOptions<EmployeeResponse, ApiError, UpdateEmployeeRequest>
) => {
    const repository = new EmployeeRepositoryImpl();
    const usecase = new UpdateEmployee(repository);

    return useMutation<EmployeeResponse, ApiError, UpdateEmployeeRequest>({
        mutationFn: (request) => usecase.execute(request),
        ...options,
    });
};

export const useDeleteEmployeeMutation = (
    options?: UseMutationOptions<void, ApiError, string>
) => {
    const repository = new EmployeeRepositoryImpl();
    const usecase = new DeleteEmployee(repository);

    return useMutation<void, ApiError, string>({
        mutationFn: (id) => usecase.execute(id),
        ...options,
    });
};

export const useUpdateMePreferredTokenMutation = (
    options?: UseMutationOptions<TransactionResponse, ApiError, UpdatePreferredTokenRequest>
) => {
    const repository = new EmployeeRepositoryImpl();
    const usecase = new UpdateMePreferredToken(repository);

    return useMutation<TransactionResponse, ApiError, UpdatePreferredTokenRequest>({
        mutationFn: (request) => usecase.execute(request),
        ...options,
    });
};

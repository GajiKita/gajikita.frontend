import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { WorklogRepositoryImpl } from "../repository/implementation/WorklogRepositoryImpl";
import { CreateWorklog } from "../usecase/implementation/CreateWorklog";
import { CheckIn } from "../usecase/implementation/CheckIn";
import { CheckOut } from "../usecase/implementation/CheckOut";
import { ApproveWorklog } from "../usecase/implementation/ApproveWorklog";
import type { CreateWorklogRequest } from "../domain/req/CreateWorklogRequest";
import type { CheckInRequest } from "../domain/req/CheckInRequest";
import type { WorklogResponse } from "../domain/res/WorklogResponse";
import type { TransactionResponse } from "../../shared/domain/res/TransactionResponse";
import { ApiError } from "@/core/utils/http/httpClient";

export const useCreateWorklogMutation = (
    options?: UseMutationOptions<WorklogResponse, ApiError, CreateWorklogRequest>
) => {
    const repository = new WorklogRepositoryImpl();
    const usecase = new CreateWorklog(repository);

    return useMutation<WorklogResponse, ApiError, CreateWorklogRequest>({
        mutationFn: (request) => usecase.execute(request),
        ...options,
    });
};

export const useCheckInMutation = (
    options?: UseMutationOptions<void, ApiError, CheckInRequest>
) => {
    const repository = new WorklogRepositoryImpl();
    const usecase = new CheckIn(repository);

    return useMutation<void, ApiError, CheckInRequest>({
        mutationFn: (request) => usecase.execute(request),
        ...options,
    });
};

export const useCheckOutMutation = (
    options?: UseMutationOptions<void, ApiError, string>
) => {
    const repository = new WorklogRepositoryImpl();
    const usecase = new CheckOut(repository);

    return useMutation<void, ApiError, string>({
        mutationFn: (id) => usecase.execute(id),
        ...options,
    });
};

export const useApproveWorklogMutation = (
    options?: UseMutationOptions<TransactionResponse, ApiError, string>
) => {
    const repository = new WorklogRepositoryImpl();
    const usecase = new ApproveWorklog(repository);

    return useMutation<TransactionResponse, ApiError, string>({
        mutationFn: (id) => usecase.execute(id),
        ...options,
    });
};

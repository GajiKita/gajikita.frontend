import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { WorklogRepositoryImpl } from "../repository/implementation/WorklogRepositoryImpl";
import { GetWorklogs } from "../usecase/implementation/GetWorklogs";
import type { GetWorklogsRequest } from "../domain/req/GetWorklogsRequest";
import type { WorklogListResponse } from "../domain/res/WorklogListResponse";
import { ApiError } from "@/core/utils/http/httpClient";

export const worklogQueryKeys = {
    list: (params: GetWorklogsRequest) => ['worklogs', 'list', params] as const,
};

export const useWorklogsQuery = (
    params: GetWorklogsRequest,
    options?: Omit<UseQueryOptions<WorklogListResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
    const repository = new WorklogRepositoryImpl();
    const usecase = new GetWorklogs(repository);

    return useQuery<WorklogListResponse, ApiError>({
        queryKey: worklogQueryKeys.list(params),
        queryFn: () => usecase.execute(params),
        enabled: !!params.employeeId,
        ...options,
    });
};
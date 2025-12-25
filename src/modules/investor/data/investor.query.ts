import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { InvestorRepositoryImpl } from "../repository/implementation/InvestorRepositoryImpl";
import { GetInvestors } from "../usecase/implementation/GetInvestors";
import { GetInvestorById } from "../usecase/implementation/GetInvestorById";
import type { GetInvestorsRequest } from "../domain/req/GetInvestorsRequest";
import type { GetInvestorByIdRequest } from "../domain/req/GetInvestorByIdRequest";
import type { InvestorListResponse } from "../domain/res/InvestorListResponse";
import type { InvestorResponse } from "../domain/res/InvestorResponse";
import { ApiError } from "@/core/utils/http/httpClient";

export const investorQueryKeys = {
    list: (params: GetInvestorsRequest) => ['investors', 'list', params] as const,
    detail: (id: string) => ['investors', 'detail', id] as const,
};

export const useInvestorsQuery = (
    params: GetInvestorsRequest = {},
    options?: Omit<UseQueryOptions<InvestorListResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
    const repository = new InvestorRepositoryImpl();
    const usecase = new GetInvestors(repository);

    return useQuery<InvestorListResponse, ApiError>({
        queryKey: investorQueryKeys.list(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useInvestorQuery = (
    params: GetInvestorByIdRequest,
    options?: Omit<UseQueryOptions<InvestorResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
    const repository = new InvestorRepositoryImpl();
    const usecase = new GetInvestorById(repository);

    return useQuery<InvestorResponse, ApiError>({
        queryKey: investorQueryKeys.detail(params.id),
        queryFn: () => usecase.execute(params),
        enabled: !!params.id,
        ...options,
    });
};
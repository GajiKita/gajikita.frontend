import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { CompanyRepositoryImpl } from "../repository/implementation/CompanyRepositoryImpl";
import { GetCompanies } from "../usecase/implementation/GetCompanies";
import { GetCompanyById } from "../usecase/implementation/GetCompanyById";
import type { GetCompaniesRequest } from "../domain/req/GetCompaniesRequest";
import type { GetCompanyByIdRequest } from "../domain/req/GetCompanyByIdRequest";
import type { CompanyListResponse } from "../domain/res/CompanyListResponse";
import type { CompanyResponse } from "../domain/res/CompanyResponse";
import { ApiError } from "@/core/utils/http/httpClient";

export const companyQueryKeys = {
    list: (params: GetCompaniesRequest) => ['companies', 'list', params] as const,
    detail: (id: string) => ['companies', 'detail', id] as const,
};

export const useCompaniesQuery = (
    params: GetCompaniesRequest = {},
    options?: Omit<UseQueryOptions<CompanyListResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
    const repository = new CompanyRepositoryImpl();
    const usecase = new GetCompanies(repository);

    return useQuery<CompanyListResponse, ApiError>({
        queryKey: companyQueryKeys.list(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useCompanyQuery = (
    params: GetCompanyByIdRequest,
    options?: Omit<UseQueryOptions<CompanyResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
    const repository = new CompanyRepositoryImpl();
    const usecase = new GetCompanyById(repository);

    return useQuery<CompanyResponse, ApiError>({
        queryKey: companyQueryKeys.detail(params.id),
        queryFn: () => usecase.execute(params),
        enabled: !!params.id,
        ...options,
    });
};

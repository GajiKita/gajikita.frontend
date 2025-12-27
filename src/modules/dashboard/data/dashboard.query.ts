// src/modules/dashboard/data/dashboard.query.ts
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { httpClient } from "@/core/utils/http/httpClient";
import { API_ROUTES } from "@/core/constant/api";
import type { DashboardStatsEntity } from "../domain/entity/DashboardStatsEntity";
import { ApiError } from "@/core/utils/http/httpClient";

export const dashboardQueryKeys = {
    stats: () => ['dashboard', 'stats'] as const,
};

export const useDashboardStatsQuery = (
    options?: Omit<UseQueryOptions<DashboardStatsEntity, ApiError>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<DashboardStatsEntity, ApiError>({
        queryKey: dashboardQueryKeys.stats(),
        queryFn: async () => {
            // In a real implementation, this would aggregate data from multiple endpoints
            // For now, returning mock data
            const [employeesRes, companiesRes, investorsRes, payrollCyclesRes] = await Promise.all([
                httpClient.get(API_ROUTES.employees.base, { params: { page: 1, limit: 1 } }),
                httpClient.get(API_ROUTES.companies.base, { params: { page: 1, limit: 1 } }),
                httpClient.get(API_ROUTES.investors.base, { params: { page: 1, limit: 1 } }),
                httpClient.get(API_ROUTES.payrollCycles.base, { params: { page: 1, limit: 1 } }),
            ]);

            return {
                totalEmployees: Array.isArray(employeesRes) ? employeesRes.length : 0,
                totalCompanies: Array.isArray(companiesRes) ? companiesRes.length : 0,
                totalInvestors: Array.isArray(investorsRes) ? investorsRes.length : 0,
                totalPayrollCycles: Array.isArray(payrollCyclesRes) ? payrollCyclesRes.length : 0,
                totalWorklogs: 0, // Would come from worklogs API
                totalWithdraws: 0, // Would come from withdraws API
                totalRepayments: 0, // Would come from repayments API
                liquidityPool: 0, // Would come from blockchain API
                payrollProcessed: 0, // Would come from payroll cycles
                pendingApprovals: 0, // Would come from worklogs API
            };
        },
        ...options,
    });
};
// src/modules/dashboard/presentation/hooks/useDashboardPresentation.ts
import { useDashboardStatsQuery } from '../../data/dashboard.query';

export const useDashboardStats = () => {
  const query = useDashboardStatsQuery();

  return {
    stats: query.data || {
      totalEmployees: 0,
      totalCompanies: 0,
      totalInvestors: 0,
      totalPayrollCycles: 0,
      totalWorklogs: 0,
      totalWithdraws: 0,
      totalRepayments: 0,
      liquidityPool: 0,
      payrollProcessed: 0,
      pendingApprovals: 0,
    },
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
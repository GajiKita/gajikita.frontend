// src/modules/dashboard/domain/entity/DashboardStatsEntity.ts
export type DashboardStatsEntity = {
  totalEmployees: number;
  totalCompanies: number;
  totalInvestors: number;
  totalPayrollCycles: number;
  totalWorklogs: number;
  totalWithdraws: number;
  totalRepayments: number;
  liquidityPool: number;
  payrollProcessed: number;
  pendingApprovals: number;
};
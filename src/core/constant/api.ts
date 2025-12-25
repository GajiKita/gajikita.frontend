export const API_ROUTES = {
  // Company
  companies: {
    base: "/companies",
    byId: (id: string) => `/companies/${id}`,
    prepareLockLiquidity: "/companies/prepare-lock-liquidity",
    prepareWithdrawReward: "/companies/prepare-withdraw-reward",
    preferredToken: (id: string) => `/companies/${id}/preferred-token`,
  },
  // Employee
  employees: {
    base: "/employees",
    byId: (id: string) => `/employees/${id}`,
    me: {
      preferredToken: "/employees/me/preferred-token",
    },
  },
  // Payroll Cycle
  payrollCycles: {
    base: "/payroll-cycles",
    byId: (id: string) => `/payroll-cycles/${id}`,
  },
  // Worklog
  worklogs: {
    base: "/worklogs",
    checkIn: "/worklogs/check-in",
    checkOut: (id: string) => `/worklogs/${id}/check-out`,
    approve: (id: string) => `/worklogs/${id}/approve`,
  },
  // Withdraw
  withdraws: {
    request: "/withdraws/request",
    simulate: "/withdraws/simulate",
  },
} as const;

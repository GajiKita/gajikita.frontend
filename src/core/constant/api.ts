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
    base: "/withdraws",
    request: "/withdraws/request",
    simulate: "/withdraws/simulate",
    execute: (id: string) => `/withdraws/${id}/execute`,
  },
  // Investors
  investors: {
    base: "/investors",
    byId: (id: string) => `/investors/${id}`,
    prepareDepositLiquidity: "/investors/prepare-deposit-liquidity",
    prepareWithdrawReward: "/investors/prepare-withdraw-reward",
    me: {
      preferredToken: "/investors/me/preferred-token",
    },
  },
  // Blockchain
  blockchain: {
    supportedTokens: "/blockchain/supported-tokens",
    syncTokens: "/blockchain/sync-tokens",
  },
  // Smart Contracts
  smartContracts: {
    base: "/smart-contracts",
    byId: (id: string) => `/smart-contracts/${id}`,
  },
  // Auth
  auth: {
    signIn: "/auth/sign-in",
    register: "/auth/register",
  },
  // Repayments
  repayments: {
    processCycle: (cycleId: string) => `/repayments/process-cycle/${cycleId}`,
    preparePlatformFeeWithdrawal: "/repayments/prepare-platform-fee-withdrawal",
  },
} as const;

export type UpdatePayrollCycleRequest = {
  id: string;
  name?: string;
  period_start?: string;
  period_end?: string;
  payout_date?: string;
  total_working_days?: number;
  status?: string;
};
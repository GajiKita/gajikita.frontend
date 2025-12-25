export type CreatePayrollCycleRequest = {
    company_id: string;
    period_start: string;
    period_end: string;
    payout_date: string;
    total_working_days: number;
};
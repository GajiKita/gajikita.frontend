export type PayrollCycleEntity = {
    id: string;
    company_id: string;
    period_start: string;
    period_end: string;
    payout_date: string;
    total_working_days: number;
    created_at: string;
    updated_at: string;
    deleted: boolean;
};
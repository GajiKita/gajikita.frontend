export type WithdrawRequestEntity = {
    id: string;
    employee_id: string;
    payroll_cycle_id: string;
    requested_amount: number;
    approved_amount?: number | null;
    fee_total_amount?: number | null;
    status: string;
    tx_hash?: string | null;
    created_at: string;
    updated_at: string;
};

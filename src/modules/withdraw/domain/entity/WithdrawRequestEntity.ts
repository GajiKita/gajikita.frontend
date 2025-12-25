export type WithdrawRequestEntity = {
    id: string;
    employee_id: string;
    payroll_cycle_id: string;
    requested_amount: number;
    approved_amount: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXECUTED';
    transaction_hash?: string | null;
    created_at: string;
    updated_at: string;
    deleted: boolean;
};
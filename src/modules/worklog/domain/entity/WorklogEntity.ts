export type WorklogEntity = {
    id: string;
    employee_id: string;
    payroll_cycle_id: string;
    date: string;
    hours_worked: number;
    approved: boolean;
    approved_at?: string | null;
    approved_by?: string | null;
    created_at: string;
    updated_at: string;
    deleted: boolean;
};
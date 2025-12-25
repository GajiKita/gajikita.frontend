export type WorklogEntity = {
    id: string;
    employee_id: string;
    payroll_cycle_id: string;
    date: string;
    hours_worked: number;
    approved_by_id?: string | null;
    created_at: string;
    deleted: boolean;
};

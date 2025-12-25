export type CreateWorklogRequest = {
    employee_id: string;
    payroll_cycle_id: string;
    date: string;
    hours_worked: number;
};
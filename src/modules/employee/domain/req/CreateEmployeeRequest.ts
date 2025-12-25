export type CreateEmployeeRequest = {
    user_id: string;
    company_id: string;
    employee_number?: string;
    position?: string;
    base_salary: number;
    wallet_address: string;
    status?: string;
    sbt_token_id?: string;
    employed_started?: string;
    employed_ended?: string;
};

export type EmployeeEntity = {
    id: string;
    user_id: string;
    company_id: string;
    employee_number?: string | null;
    position?: string | null;
    base_salary: number;
    wallet_address: string;
    preferred_payout_token?: string | null;
    status?: string | null;
    sbt_token_id?: string | null;
    employed_started?: string | null;
    employed_ended?: string | null;
    created_at: string;
    updated_at: string;
    deleted: boolean;
};

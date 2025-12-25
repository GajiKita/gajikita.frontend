export type CreateCompanyRequest = {
    name: string;
    address?: string;
    min_lock_percentage: number;
    fee_share_company: number;
    fee_share_platform: number;
};

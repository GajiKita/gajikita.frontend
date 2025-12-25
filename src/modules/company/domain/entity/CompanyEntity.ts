export type CompanyEntity = {
    id: string;
    name: string;
    address?: string | null;
    wallet_address?: string | null;
    min_lock_percentage: number;
    fee_share_company: number;
    fee_share_platform: number;
    fee_share_investor: number;
    reward_balance: number;
    withdrawn_rewards: number;
    preferred_payout_token?: string | null;
    created_at: string;
    updated_at: string;
    deleted: boolean;
};

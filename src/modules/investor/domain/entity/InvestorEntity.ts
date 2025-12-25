export type InvestorEntity = {
    id: string;
    user_id: string;
    wallet_address: string;
    preferred_payout_token?: string | null;
    liquidity_balance: number;
    withdrawn_rewards: number;
    created_at: string;
    updated_at: string;
    deleted: boolean;
};
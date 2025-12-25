export type UpdateInvestorRequest = {
    id: string;
    user_id?: string;
    wallet_address?: string;
    preferred_payout_token?: string;
};
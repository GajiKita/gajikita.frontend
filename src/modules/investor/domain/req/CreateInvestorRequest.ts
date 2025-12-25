export type CreateInvestorRequest = {
    user_id: string;
    wallet_address: string;
    preferred_payout_token?: string;
};
export type AuthEntity = {
    access_token: string;
    user: {
        id: string;
        wallet_address: string;
        role: string;
        created_at: string;
        updated_at: string;
    };
};
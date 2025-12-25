export type SimulationResponse = {
    max_possible_withdraw: number;
    fees: {
        aave_fee: number;
        platform_fee: number;
        company_fee: number;
        investor_fee: number;
    };
    net_amount: number;
    estimated_gas: number;
};
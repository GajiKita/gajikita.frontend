export type SmartContractEntity = {
    id: string;
    name: string;
    contract_address: string;
    chain_id: number;
    abi: any; // ABI can be complex JSON structure
    created_at: string;
    updated_at: string;
    deleted: boolean;
};
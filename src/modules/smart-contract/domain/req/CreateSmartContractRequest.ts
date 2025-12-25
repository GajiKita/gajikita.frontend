export type CreateSmartContractRequest = {
    name: string;
    contract_address: string;
    chain_id: number;
    abi: any; // ABI can be complex JSON structure
};
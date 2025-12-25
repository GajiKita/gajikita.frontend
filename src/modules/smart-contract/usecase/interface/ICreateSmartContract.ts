import type { CreateSmartContractRequest } from "../../domain/req/CreateSmartContractRequest";
import type { SmartContractResponse } from "../../domain/res/SmartContractResponse";

export interface ICreateSmartContract {
    execute(request: CreateSmartContractRequest): Promise<SmartContractResponse>;
}
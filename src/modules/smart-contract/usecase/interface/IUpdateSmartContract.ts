import type { UpdateSmartContractRequest } from "../../domain/req/UpdateSmartContractRequest";
import type { SmartContractResponse } from "../../domain/res/SmartContractResponse";

export interface IUpdateSmartContract {
    execute(request: UpdateSmartContractRequest): Promise<SmartContractResponse>;
}
import type { GetSmartContractByIdRequest } from "../../domain/req/GetSmartContractByIdRequest";
import type { SmartContractResponse } from "../../domain/res/SmartContractResponse";

export interface IGetSmartContractById {
    execute(request: GetSmartContractByIdRequest): Promise<SmartContractResponse>;
}
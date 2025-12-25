import type { GetSmartContractsRequest } from "../../domain/req/GetSmartContractsRequest";
import type { SmartContractListResponse } from "../../domain/res/SmartContractListResponse";

export interface IGetSmartContracts {
    execute(request: GetSmartContractsRequest): Promise<SmartContractListResponse>;
}
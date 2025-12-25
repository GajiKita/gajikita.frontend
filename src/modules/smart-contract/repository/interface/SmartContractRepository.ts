import type { CreateSmartContractRequest } from "../../domain/req/CreateSmartContractRequest";
import type { UpdateSmartContractRequest } from "../../domain/req/UpdateSmartContractRequest";
import type { GetSmartContractsRequest } from "../../domain/req/GetSmartContractsRequest";
import type { GetSmartContractByIdRequest } from "../../domain/req/GetSmartContractByIdRequest";
import type { SmartContractResponse } from "../../domain/res/SmartContractResponse";
import type { SmartContractListResponse } from "../../domain/res/SmartContractListResponse";

export interface SmartContractRepository {
    createSmartContract(request: CreateSmartContractRequest): Promise<SmartContractResponse>;
    getSmartContracts(request: GetSmartContractsRequest): Promise<SmartContractListResponse>;
    getSmartContractById(request: GetSmartContractByIdRequest): Promise<SmartContractResponse>;
    updateSmartContract(request: UpdateSmartContractRequest): Promise<SmartContractResponse>;
    deleteSmartContract(id: string): Promise<void>;
}
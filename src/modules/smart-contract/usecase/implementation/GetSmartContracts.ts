import type { SmartContractRepository } from "../../repository/interface/SmartContractRepository";
import type { GetSmartContractsRequest } from "../../domain/req/GetSmartContractsRequest";
import type { SmartContractListResponse } from "../../domain/res/SmartContractListResponse";
import type { IGetSmartContracts } from "../interface/IGetSmartContracts";

export class GetSmartContracts implements IGetSmartContracts {
    constructor(private repository: SmartContractRepository) {}

    async execute(request: GetSmartContractsRequest): Promise<SmartContractListResponse> {
        return this.repository.getSmartContracts(request);
    }
}
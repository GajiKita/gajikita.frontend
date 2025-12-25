import type { SmartContractRepository } from "../../repository/interface/SmartContractRepository";
import type { UpdateSmartContractRequest } from "../../domain/req/UpdateSmartContractRequest";
import type { SmartContractResponse } from "../../domain/res/SmartContractResponse";
import type { IUpdateSmartContract } from "../interface/IUpdateSmartContract";

export class UpdateSmartContract implements IUpdateSmartContract {
    constructor(private repository: SmartContractRepository) {}

    async execute(request: UpdateSmartContractRequest): Promise<SmartContractResponse> {
        return this.repository.updateSmartContract(request);
    }
}
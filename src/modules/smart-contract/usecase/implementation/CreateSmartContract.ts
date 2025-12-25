import type { SmartContractRepository } from "../../repository/interface/SmartContractRepository";
import type { CreateSmartContractRequest } from "../../domain/req/CreateSmartContractRequest";
import type { SmartContractResponse } from "../../domain/res/SmartContractResponse";
import type { ICreateSmartContract } from "../interface/ICreateSmartContract";

export class CreateSmartContract implements ICreateSmartContract {
    constructor(private repository: SmartContractRepository) {}

    async execute(request: CreateSmartContractRequest): Promise<SmartContractResponse> {
        return this.repository.createSmartContract(request);
    }
}
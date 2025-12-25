import type { SmartContractRepository } from "../../repository/interface/SmartContractRepository";
import type { IDeleteSmartContract } from "../interface/IDeleteSmartContract";

export class DeleteSmartContract implements IDeleteSmartContract {
    constructor(private repository: SmartContractRepository) {}

    async execute(id: string): Promise<void> {
        return this.repository.deleteSmartContract(id);
    }
}
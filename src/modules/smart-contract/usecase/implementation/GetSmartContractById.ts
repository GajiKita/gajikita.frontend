import type { SmartContractRepository } from "../../repository/interface/SmartContractRepository";
import type { GetSmartContractByIdRequest } from "../../domain/req/GetSmartContractByIdRequest";
import type { SmartContractResponse } from "../../domain/res/SmartContractResponse";
import type { IGetSmartContractById } from "../interface/IGetSmartContractById";

export class GetSmartContractById implements IGetSmartContractById {
    constructor(private repository: SmartContractRepository) {}

    async execute(request: GetSmartContractByIdRequest): Promise<SmartContractResponse> {
        return this.repository.getSmartContractById(request);
    }
}
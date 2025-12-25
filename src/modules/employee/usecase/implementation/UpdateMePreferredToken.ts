import type { EmployeeRepository } from "../../repository/interface/EmployeeRepository";
import type { UpdatePreferredTokenRequest } from "../../../shared/domain/req/UpdatePreferredTokenRequest";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";
import type { IUpdateMePreferredToken } from "../interface/IUpdateMePreferredToken";

export class UpdateMePreferredToken implements IUpdateMePreferredToken {
    constructor(private repository: EmployeeRepository) {}

    async execute(request: UpdatePreferredTokenRequest): Promise<TransactionResponse> {
        return this.repository.updateMePreferredToken(request);
    }
}

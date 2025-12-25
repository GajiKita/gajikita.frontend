import type { CompanyRepository } from "../../repository/interface/CompanyRepository";
import type { UpdatePreferredTokenRequest } from "../../../shared/domain/req/UpdatePreferredTokenRequest";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";
import type { IUpdatePreferredToken } from "../interface/IUpdatePreferredToken";

export class UpdatePreferredToken implements IUpdatePreferredToken {
    constructor(private repository: CompanyRepository) {}

    async execute(id: string, request: UpdatePreferredTokenRequest): Promise<TransactionResponse> {
        return this.repository.updatePreferredToken(id, request);
    }
}

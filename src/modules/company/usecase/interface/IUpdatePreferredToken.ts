import type { UpdatePreferredTokenRequest } from "../../../shared/domain/req/UpdatePreferredTokenRequest";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";

export interface IUpdatePreferredToken {
    execute(id: string, request: UpdatePreferredTokenRequest): Promise<TransactionResponse>;
}

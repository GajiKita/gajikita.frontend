import type { UpdatePreferredTokenRequest } from "../../../shared/domain/req/UpdatePreferredTokenRequest";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";

export interface IUpdateMePreferredToken {
    execute(request: UpdatePreferredTokenRequest): Promise<TransactionResponse>;
}

import type { SyncTokensRequest } from "../../domain/req/SyncTokensRequest";
import type { TokenListResponse } from "../../domain/res/TokenListResponse";

export interface BlockchainRepository {
    getSupportedTokens(): Promise<TokenListResponse>;
    syncTokens(request: SyncTokensRequest): Promise<any>; // Response type not specified in API
}
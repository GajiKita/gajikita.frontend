import { API_ROUTES } from "@/core/constant/api";
import { httpClient } from "@/core/utils/http/httpClient";
import type { BlockchainRepository } from "../interface/BlockchainRepository";
import type { SyncTokensRequest } from "../../domain/req/SyncTokensRequest";
import type { TokenListResponse } from "../../domain/res/TokenListResponse";

export class BlockchainRepositoryImpl implements BlockchainRepository {
    async getSupportedTokens(): Promise<TokenListResponse> {
        return httpClient.get<TokenListResponse>(API_ROUTES.blockchain.supportedTokens);
    }

    async syncTokens(request: SyncTokensRequest): Promise<any> {
        return httpClient.post<any>(API_ROUTES.blockchain.syncTokens, request);
    }
}
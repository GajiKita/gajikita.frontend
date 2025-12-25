import type { BlockchainRepository } from "../../repository/interface/BlockchainRepository";
import type { TokenListResponse } from "../../domain/res/TokenListResponse";
import type { IGetSupportedTokens } from "../interface/IGetSupportedTokens";

export class GetSupportedTokens implements IGetSupportedTokens {
    constructor(private repository: BlockchainRepository) {}

    async execute(): Promise<TokenListResponse> {
        return this.repository.getSupportedTokens();
    }
}
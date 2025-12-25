import type { BlockchainRepository } from "../../repository/interface/BlockchainRepository";
import type { ISyncTokens } from "../interface/ISyncTokens";

export class SyncTokens implements ISyncTokens {
    constructor(private repository: BlockchainRepository) {}

    async execute(): Promise<any> {
        return this.repository.syncTokens({});
    }
}
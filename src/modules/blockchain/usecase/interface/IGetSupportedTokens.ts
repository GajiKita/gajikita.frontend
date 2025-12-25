import type { TokenListResponse } from "../../domain/res/TokenListResponse";

export interface IGetSupportedTokens {
    execute(): Promise<TokenListResponse>;
}
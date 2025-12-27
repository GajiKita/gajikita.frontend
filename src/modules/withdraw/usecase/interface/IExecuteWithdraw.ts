import type { ExecuteWithdrawRequest } from "../../domain/req/ExecuteWithdrawRequest";
import type { ExecuteWithdrawResponse } from "../../domain/res/ExecuteWithdrawResponse";

export interface IExecuteWithdraw {
    execute(id: string, request: ExecuteWithdrawRequest): Promise<ExecuteWithdrawResponse>;
}
import type { CreateWithdrawRequest as CreateWithdrawRequestDto } from "../../domain/req/CreateWithdrawRequest";
import type { SimulateWithdrawRequest } from "../../domain/req/SimulateWithdrawRequest";
import type { WithdrawRequestResponse } from "../../domain/res/WithdrawRequestResponse";
import type { SimulationResponse } from "../../domain/res/SimulationResponse";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";

export interface WithdrawRepository {
    createWithdrawRequest(request: CreateWithdrawRequestDto): Promise<TransactionResponse>;
    simulateWithdraw(request: SimulateWithdrawRequest): Promise<SimulationResponse>;
    executeWithdraw(id: string, approvedAmount: number, extraAaveFee?: number): Promise<void>;
}
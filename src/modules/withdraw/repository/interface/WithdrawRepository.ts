import type { CreateWithdrawRequest } from "../../domain/req/CreateWithdrawRequest";
import type { SimulateWithdrawRequest } from "../../domain/req/SimulateWithdrawRequest";
import type { SimulationResponse } from "../../domain/res/SimulationResponse";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";

export interface WithdrawRepository {
    createRequest(request: CreateWithdrawRequest): Promise<TransactionResponse>;
    simulate(request: SimulateWithdrawRequest): Promise<SimulationResponse>;
}

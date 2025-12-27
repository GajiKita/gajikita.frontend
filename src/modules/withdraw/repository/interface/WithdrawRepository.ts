import type { CreateWithdrawRequest as CreateWithdrawRequestDto } from "../../domain/req/CreateWithdrawRequest";
import type { SimulateWithdrawRequest } from "../../domain/req/SimulateWithdrawRequest";
import type { GetWithdrawRequestsRequest } from "../../domain/req/GetWithdrawRequestsRequest";
import type { GetWithdrawRequestByIdRequest } from "../../domain/req/GetWithdrawRequestByIdRequest";
import type { UpdateWithdrawRequest } from "../../domain/req/UpdateWithdrawRequest";
import type { WithdrawRequestResponse } from "../../domain/res/WithdrawRequestResponse";
import type { WithdrawRequestListResponse } from "../../domain/res/WithdrawRequestListResponse";
import type { SimulationResponse } from "../../domain/res/SimulationResponse";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";

export interface WithdrawRepository {
    createWithdrawRequest(request: CreateWithdrawRequestDto): Promise<TransactionResponse>;
    getWithdrawRequests(request: GetWithdrawRequestsRequest): Promise<WithdrawRequestListResponse>;
    getWithdrawRequestById(request: GetWithdrawRequestByIdRequest): Promise<WithdrawRequestResponse>;
    updateWithdrawRequest(request: UpdateWithdrawRequest): Promise<WithdrawRequestResponse>;
    deleteWithdrawRequest(id: string): Promise<void>;
    simulateWithdraw(request: SimulateWithdrawRequest): Promise<SimulationResponse>;
    executeWithdraw(id: string, approvedAmount: number, extraAaveFee?: number): Promise<ExecuteWithdrawResponse>;
}
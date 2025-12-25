import type { SimulateWithdrawRequest } from "../../domain/req/SimulateWithdrawRequest";
import type { SimulationResponse } from "../../domain/res/SimulationResponse";

export interface ISimulateWithdraw {
    execute(request: SimulateWithdrawRequest): Promise<SimulationResponse>;
}

import type { WithdrawRepository } from "../../repository/interface/WithdrawRepository";
import type { SimulateWithdrawRequest } from "../../domain/req/SimulateWithdrawRequest";
import type { SimulationResponse } from "../../domain/res/SimulationResponse";
import type { ISimulateWithdraw } from "../interface/ISimulateWithdraw";

export class SimulateWithdraw implements ISimulateWithdraw {
    constructor(private repository: WithdrawRepository) {}

    async execute(request: SimulateWithdrawRequest): Promise<SimulationResponse> {
        return this.repository.simulate(request);
    }
}

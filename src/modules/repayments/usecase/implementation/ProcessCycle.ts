import type { RepaymentsRepository } from "../../repository/interface/RepaymentsRepository";
import type { ProcessCycleRequest } from "../../domain/req/ProcessCycleRequest";
import type { ProcessCycleResponse } from "../../domain/res/ProcessCycleResponse";
import type { IProcessCycle } from "../interface/IProcessCycle";

export class ProcessCycle implements IProcessCycle {
    constructor(private repository: RepaymentsRepository) {}

    async execute(request: ProcessCycleRequest): Promise<ProcessCycleResponse> {
        return this.repository.processCycle(request);
    }
}
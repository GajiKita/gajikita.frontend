import type { ProcessCycleRequest } from "../../domain/req/ProcessCycleRequest";
import type { ProcessCycleResponse } from "../../domain/res/ProcessCycleResponse";

export interface IProcessCycle {
    execute(request: ProcessCycleRequest): Promise<ProcessCycleResponse>;
}
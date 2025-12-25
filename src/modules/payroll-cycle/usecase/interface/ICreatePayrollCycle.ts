import type { CreatePayrollCycleRequest } from "../../domain/req/CreatePayrollCycleRequest";
import type { PayrollCycleResponse } from "../../domain/res/PayrollCycleResponse";

export interface ICreatePayrollCycle {
    execute(request: CreatePayrollCycleRequest): Promise<PayrollCycleResponse>;
}

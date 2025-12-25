import type { GetPayrollCyclesRequest } from "../../domain/req/GetPayrollCyclesRequest";
import type { PayrollCycleListResponse } from "../../domain/res/PayrollCycleListResponse";

export interface IGetPayrollCycles {
    execute(request: GetPayrollCyclesRequest): Promise<PayrollCycleListResponse>;
}
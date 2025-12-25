import type { GetPayrollCycleByIdRequest } from "../../domain/req/GetPayrollCycleByIdRequest";
import type { PayrollCycleResponse } from "../../domain/res/PayrollCycleResponse";

export interface IGetPayrollCycleById {
    execute(request: GetPayrollCycleByIdRequest): Promise<PayrollCycleResponse>;
}

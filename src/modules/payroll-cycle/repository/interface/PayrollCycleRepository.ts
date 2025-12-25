import type { CreatePayrollCycleRequest } from "../../domain/req/CreatePayrollCycleRequest";
import type { GetPayrollCyclesRequest } from "../../domain/req/GetPayrollCyclesRequest";
import type { GetPayrollCycleByIdRequest } from "../../domain/req/GetPayrollCycleByIdRequest";
import type { PayrollCycleResponse } from "../../domain/res/PayrollCycleResponse";
import type { PayrollCycleListResponse } from "../../domain/res/PayrollCycleListResponse";

export interface PayrollCycleRepository {
    createPayrollCycle(request: CreatePayrollCycleRequest): Promise<PayrollCycleResponse>;
    getPayrollCycles(request: GetPayrollCyclesRequest): Promise<PayrollCycleListResponse>;
    getPayrollCycleById(request: GetPayrollCycleByIdRequest): Promise<PayrollCycleResponse>;
}
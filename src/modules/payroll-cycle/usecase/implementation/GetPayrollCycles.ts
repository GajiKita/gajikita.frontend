import type { PayrollCycleRepository } from "../../repository/interface/PayrollCycleRepository";
import type { GetPayrollCyclesRequest } from "../../domain/req/GetPayrollCyclesRequest";
import type { PayrollCycleListResponse } from "../../domain/res/PayrollCycleListResponse";
import type { IGetPayrollCycles } from "../interface/IGetPayrollCycles";

export class GetPayrollCycles implements IGetPayrollCycles {
    constructor(private repository: PayrollCycleRepository) {}

    async execute(request: GetPayrollCyclesRequest): Promise<PayrollCycleListResponse> {
        return this.repository.getPayrollCycles(request);
    }
}

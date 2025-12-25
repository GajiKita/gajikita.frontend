import type { PayrollCycleRepository } from "../../repository/interface/PayrollCycleRepository";
import type { GetPayrollCycleByIdRequest } from "../../domain/req/GetPayrollCycleByIdRequest";
import type { PayrollCycleResponse } from "../../domain/res/PayrollCycleResponse";
import type { IGetPayrollCycleById } from "../interface/IGetPayrollCycleById";

export class GetPayrollCycleById implements IGetPayrollCycleById {
    constructor(private repository: PayrollCycleRepository) {}

    async execute(request: GetPayrollCycleByIdRequest): Promise<PayrollCycleResponse> {
        return this.repository.getPayrollCycleById(request);
    }
}

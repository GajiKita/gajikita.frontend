import type { PayrollCycleRepository } from "../../repository/interface/PayrollCycleRepository";
import type { CreatePayrollCycleRequest } from "../../domain/req/CreatePayrollCycleRequest";
import type { PayrollCycleResponse } from "../../domain/res/PayrollCycleResponse";
import type { ICreatePayrollCycle } from "../interface/ICreatePayrollCycle";

export class CreatePayrollCycle implements ICreatePayrollCycle {
    constructor(private repository: PayrollCycleRepository) {}

    async execute(request: CreatePayrollCycleRequest): Promise<PayrollCycleResponse> {
        return this.repository.createPayrollCycle(request);
    }
}
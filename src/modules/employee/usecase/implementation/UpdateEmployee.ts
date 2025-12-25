import type { EmployeeRepository } from "../../repository/interface/EmployeeRepository";
import type { UpdateEmployeeRequest } from "../../domain/req/UpdateEmployeeRequest";
import type { EmployeeResponse } from "../../domain/res/EmployeeResponse";
import type { IUpdateEmployee } from "../interface/IUpdateEmployee";

export class UpdateEmployee implements IUpdateEmployee {
    constructor(private repository: EmployeeRepository) {}

    async execute(request: UpdateEmployeeRequest): Promise<EmployeeResponse> {
        return this.repository.updateEmployee(request);
    }
}

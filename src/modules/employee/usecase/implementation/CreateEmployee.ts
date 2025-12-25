import type { EmployeeRepository } from "../../repository/interface/EmployeeRepository";
import type { CreateEmployeeRequest } from "../../domain/req/CreateEmployeeRequest";
import type { EmployeeResponse } from "../../domain/res/EmployeeResponse";
import type { ICreateEmployee } from "../interface/ICreateEmployee";

export class CreateEmployee implements ICreateEmployee {
    constructor(private repository: EmployeeRepository) {}

    async execute(request: CreateEmployeeRequest): Promise<EmployeeResponse> {
        return this.repository.createEmployee(request);
    }
}

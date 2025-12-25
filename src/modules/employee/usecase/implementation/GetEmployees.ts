import type { EmployeeRepository } from "../../repository/interface/EmployeeRepository";
import type { GetEmployeesRequest } from "../../domain/req/GetEmployeesRequest";
import type { EmployeeListResponse } from "../../domain/res/EmployeeListResponse";
import type { IGetEmployees } from "../interface/IGetEmployees";

export class GetEmployees implements IGetEmployees {
    constructor(private repository: EmployeeRepository) {}

    async execute(request: GetEmployeesRequest): Promise<EmployeeListResponse> {
        return this.repository.getEmployees(request);
    }
}

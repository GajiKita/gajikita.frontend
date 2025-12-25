import type { EmployeeRepository } from "../../repository/interface/EmployeeRepository";
import type { GetEmployeeByIdRequest } from "../../domain/req/GetEmployeeByIdRequest";
import type { EmployeeResponse } from "../../domain/res/EmployeeResponse";
import type { IGetEmployeeById } from "../interface/IGetEmployeeById";

export class GetEmployeeById implements IGetEmployeeById {
    constructor(private repository: EmployeeRepository) {}

    async execute(request: GetEmployeeByIdRequest): Promise<EmployeeResponse> {
        return this.repository.getEmployeeById(request);
    }
}

import type { EmployeeRepository } from "../../repository/interface/EmployeeRepository";
import type { EmployeeListResponse } from "../../domain/res/EmployeeListResponse";
import type { IGetEmployeesByMyCompany } from "../interface/IGetEmployeesByMyCompany";

export class GetEmployeesByMyCompany implements IGetEmployeesByMyCompany {
    constructor(private repository: EmployeeRepository) {}

    async execute(): Promise<EmployeeListResponse> {
        return this.repository.getEmployeesByMyCompany();
    }
}
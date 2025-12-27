import type { EmployeeRepository } from "../../repository/interface/EmployeeRepository";
import type { EmployeeListResponse } from "../../domain/res/EmployeeListResponse";
import type { IGetEmployeesByCompany } from "../interface/IGetEmployeesByCompany";

export class GetEmployeesByCompany implements IGetEmployeesByCompany {
    constructor(private repository: EmployeeRepository) {}

    async execute(companyId: string): Promise<EmployeeListResponse> {
        return this.repository.getEmployeesByCompany(companyId);
    }
}
import type { EmployeeRepository } from "../../repository/interface/EmployeeRepository";
import type { IDeleteEmployee } from "../interface/IDeleteEmployee";

export class DeleteEmployee implements IDeleteEmployee {
    constructor(private repository: EmployeeRepository) {}

    async execute(id: string): Promise<void> {
        return this.repository.deleteEmployee(id);
    }
}

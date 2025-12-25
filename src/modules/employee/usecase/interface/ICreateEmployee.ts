import type { CreateEmployeeRequest } from "../../domain/req/CreateEmployeeRequest";
import type { EmployeeResponse } from "../../domain/res/EmployeeResponse";

export interface ICreateEmployee {
    execute(request: CreateEmployeeRequest): Promise<EmployeeResponse>;
}

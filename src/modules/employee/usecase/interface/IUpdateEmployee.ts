import type { UpdateEmployeeRequest } from "../../domain/req/UpdateEmployeeRequest";
import type { EmployeeResponse } from "../../domain/res/EmployeeResponse";

export interface IUpdateEmployee {
    execute(request: UpdateEmployeeRequest): Promise<EmployeeResponse>;
}

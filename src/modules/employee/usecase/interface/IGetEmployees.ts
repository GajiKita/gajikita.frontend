import type { GetEmployeesRequest } from "../../domain/req/GetEmployeesRequest";
import type { EmployeeListResponse } from "../../domain/res/EmployeeListResponse";

export interface IGetEmployees {
    execute(request: GetEmployeesRequest): Promise<EmployeeListResponse>;
}

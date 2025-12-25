import type { GetEmployeeByIdRequest } from "../../domain/req/GetEmployeeByIdRequest";
import type { EmployeeResponse } from "../../domain/res/EmployeeResponse";

export interface IGetEmployeeById {
    execute(request: GetEmployeeByIdRequest): Promise<EmployeeResponse>;
}

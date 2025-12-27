import type { CreateEmployeeRequest } from "../../domain/req/CreateEmployeeRequest";
import type { UpdateEmployeeRequest } from "../../domain/req/UpdateEmployeeRequest";
import type { GetEmployeesRequest } from "../../domain/req/GetEmployeesRequest";
import type { GetEmployeeByIdRequest } from "../../domain/req/GetEmployeeByIdRequest";
import type { EmployeeResponse } from "../../domain/res/EmployeeResponse";
import type { EmployeeListResponse } from "../../domain/res/EmployeeListResponse";
import type { UpdatePreferredTokenRequest } from "../../../shared/domain/req/UpdatePreferredTokenRequest";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";

export interface EmployeeRepository {
    createEmployee(request: CreateEmployeeRequest): Promise<EmployeeResponse>;
    getEmployees(request: GetEmployeesRequest): Promise<EmployeeListResponse>;
    getEmployeesByCompany(companyId: string): Promise<EmployeeListResponse>;
    getEmployeesByMyCompany(): Promise<EmployeeListResponse>;
    getEmployeeById(request: GetEmployeeByIdRequest): Promise<EmployeeResponse>;
    updateEmployee(request: UpdateEmployeeRequest): Promise<EmployeeResponse>;
    deleteEmployee(id: string): Promise<void>;
    updateMePreferredToken(request: UpdatePreferredTokenRequest): Promise<TransactionResponse>;
}

import { API_ROUTES } from "@/core/constant/api";
import { httpClient } from "@/core/utils/http/httpClient";
import type { EmployeeRepository } from "../interface/EmployeeRepository";
import type { CreateEmployeeRequest } from "../../domain/req/CreateEmployeeRequest";
import type { UpdateEmployeeRequest } from "../../domain/req/UpdateEmployeeRequest";
import type { GetEmployeesRequest } from "../../domain/req/GetEmployeesRequest";
import type { GetEmployeeByIdRequest } from "../../domain/req/GetEmployeeByIdRequest";
import type { EmployeeResponse } from "../../domain/res/EmployeeResponse";
import type { EmployeeListResponse } from "../../domain/res/EmployeeListResponse";
import type { UpdatePreferredTokenRequest } from "../../../shared/domain/req/UpdatePreferredTokenRequest";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";

export class EmployeeRepositoryImpl implements EmployeeRepository {
    async createEmployee(request: CreateEmployeeRequest): Promise<EmployeeResponse> {
        return httpClient.post<EmployeeResponse>(API_ROUTES.employees.base, request);
    }

    async getEmployees(request: GetEmployeesRequest): Promise<EmployeeListResponse> {
        return httpClient.get<EmployeeListResponse>(API_ROUTES.employees.base, { params: request as any });
    }

    async getEmployeeById(request: GetEmployeeByIdRequest): Promise<EmployeeResponse> {
        return httpClient.get<EmployeeResponse>(API_ROUTES.employees.byId(request.id));
    }

    async updateEmployee(request: UpdateEmployeeRequest): Promise<EmployeeResponse> {
        const { id, ...body } = request;
        return httpClient.patch<EmployeeResponse>(API_ROUTES.employees.byId(id), body);
    }

    async deleteEmployee(id: string): Promise<void> {
        return httpClient.del<void>(API_ROUTES.employees.byId(id));
    }

    async updateMePreferredToken(request: UpdatePreferredTokenRequest): Promise<TransactionResponse> {
        return httpClient.patch<TransactionResponse>(API_ROUTES.employees.me.preferredToken, request);
    }
}

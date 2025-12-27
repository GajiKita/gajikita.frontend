import { API_ROUTES } from "@/core/constant/api";
import { httpClient } from "@/core/utils/http/httpClient";
import type { PayrollCycleRepository } from "../interface/PayrollCycleRepository";
import type { CreatePayrollCycleRequest } from "../../domain/req/CreatePayrollCycleRequest";
import type { UpdatePayrollCycleRequest } from "../../domain/req/UpdatePayrollCycleRequest";
import type { GetPayrollCyclesRequest } from "../../domain/req/GetPayrollCyclesRequest";
import type { GetPayrollCycleByIdRequest } from "../../domain/req/GetPayrollCycleByIdRequest";
import type { PayrollCycleResponse } from "../../domain/res/PayrollCycleResponse";
import type { PayrollCycleListResponse } from "../../domain/res/PayrollCycleListResponse";

export class PayrollCycleRepositoryImpl implements PayrollCycleRepository {
    async createPayrollCycle(request: CreatePayrollCycleRequest): Promise<PayrollCycleResponse> {
        return httpClient.post<PayrollCycleResponse>(API_ROUTES.payrollCycles.base, request);
    }

    async getPayrollCycles(request: GetPayrollCyclesRequest): Promise<PayrollCycleListResponse> {
        return httpClient.get<PayrollCycleListResponse>(API_ROUTES.payrollCycles.base, { params: request as any });
    }

    async getPayrollCycleById(request: GetPayrollCycleByIdRequest): Promise<PayrollCycleResponse> {
        return httpClient.get<PayrollCycleResponse>(API_ROUTES.payrollCycles.byId(request.id));
    }

    async updatePayrollCycle(request: UpdatePayrollCycleRequest): Promise<PayrollCycleResponse> {
        const { id, ...body } = request;
        return httpClient.patch<PayrollCycleResponse>(API_ROUTES.payrollCycles.byId(id), body);
    }

    async deletePayrollCycle(id: string): Promise<void> {
        return httpClient.del<void>(API_ROUTES.payrollCycles.byId(id));
    }
}
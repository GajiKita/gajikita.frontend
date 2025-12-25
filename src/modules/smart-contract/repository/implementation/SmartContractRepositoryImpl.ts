import { API_ROUTES } from "@/core/constant/api";
import { httpClient } from "@/core/utils/http/httpClient";
import type { SmartContractRepository } from "../interface/SmartContractRepository";
import type { CreateSmartContractRequest } from "../../domain/req/CreateSmartContractRequest";
import type { UpdateSmartContractRequest } from "../../domain/req/UpdateSmartContractRequest";
import type { GetSmartContractsRequest } from "../../domain/req/GetSmartContractsRequest";
import type { GetSmartContractByIdRequest } from "../../domain/req/GetSmartContractByIdRequest";
import type { SmartContractResponse } from "../../domain/res/SmartContractResponse";
import type { SmartContractListResponse } from "../../domain/res/SmartContractListResponse";

export class SmartContractRepositoryImpl implements SmartContractRepository {
    async createSmartContract(request: CreateSmartContractRequest): Promise<SmartContractResponse> {
        return httpClient.post<SmartContractResponse>(API_ROUTES.smartContracts.base, request);
    }

    async getSmartContracts(request: GetSmartContractsRequest): Promise<SmartContractListResponse> {
        return httpClient.get<SmartContractListResponse>(API_ROUTES.smartContracts.base, { params: request as any });
    }

    async getSmartContractById(request: GetSmartContractByIdRequest): Promise<SmartContractResponse> {
        return httpClient.get<SmartContractResponse>(API_ROUTES.smartContracts.byId(request.id));
    }

    async updateSmartContract(request: UpdateSmartContractRequest): Promise<SmartContractResponse> {
        const { id, ...body } = request;
        return httpClient.patch<SmartContractResponse>(API_ROUTES.smartContracts.byId(id), body);
    }

    async deleteSmartContract(id: string): Promise<void> {
        return httpClient.del<void>(API_ROUTES.smartContracts.byId(id));
    }
}
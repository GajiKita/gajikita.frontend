import { API_ROUTES } from "@/core/constant/api";
import { httpClient } from "@/core/utils/http/httpClient";
import type { AuthRepository } from "../interface/AuthRepository";
import type { SignInRequest } from "../../domain/req/SignInRequest";
import type { RegisterRequest } from "../../domain/req/RegisterRequest";
import type { SignInResponse } from "../../domain/res/AuthResponse";
import type { RegisterResponse } from "../../domain/res/AuthResponse";

export class AuthRepositoryImpl implements AuthRepository {
    async signIn(request: SignInRequest): Promise<SignInResponse> {
        return httpClient.post<SignInResponse>(API_ROUTES.auth.signIn, request);
    }

    async register(request: RegisterRequest): Promise<RegisterResponse> {
        return httpClient.post<RegisterResponse>(API_ROUTES.auth.register, request);
    }
}
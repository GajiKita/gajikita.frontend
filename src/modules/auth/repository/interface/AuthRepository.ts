import type { SignInRequest } from "../../domain/req/SignInRequest";
import type { RegisterRequest } from "../../domain/req/RegisterRequest";
import type { SignInResponse } from "../../domain/res/AuthResponse";
import type { RegisterResponse } from "../../domain/res/AuthResponse";

export interface AuthRepository {
    signIn(request: SignInRequest): Promise<SignInResponse>;
    register(request: RegisterRequest): Promise<RegisterResponse>;
}
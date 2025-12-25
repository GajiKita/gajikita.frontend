import type { RegisterRequest } from "../../domain/req/RegisterRequest";
import type { RegisterResponse } from "../../domain/res/AuthResponse";

export interface IAuthRegister {
    execute(request: RegisterRequest): Promise<RegisterResponse>;
}
import type { AuthRepository } from "../../repository/interface/AuthRepository";
import type { RegisterRequest } from "../../domain/req/RegisterRequest";
import type { RegisterResponse } from "../../domain/res/AuthResponse";
import type { IAuthRegister } from "../interface/IAuthRegister";

export class AuthRegister implements IAuthRegister {
    constructor(private repository: AuthRepository) {}

    async execute(request: RegisterRequest): Promise<RegisterResponse> {
        return this.repository.register(request);
    }
}
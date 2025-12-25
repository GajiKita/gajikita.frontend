import type { AuthRepository } from "../../repository/interface/AuthRepository";
import type { SignInRequest } from "../../domain/req/SignInRequest";
import type { SignInResponse } from "../../domain/res/AuthResponse";
import type { IAuthSignIn } from "../interface/IAuthSignIn";

export class AuthSignIn implements IAuthSignIn {
    constructor(private repository: AuthRepository) {}

    async execute(request: SignInRequest): Promise<SignInResponse> {
        return this.repository.signIn(request);
    }
}
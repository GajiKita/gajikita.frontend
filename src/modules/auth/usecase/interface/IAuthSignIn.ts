import type { SignInRequest } from "../../domain/req/SignInRequest";
import type { SignInResponse } from "../../domain/res/AuthResponse";

export interface IAuthSignIn {
    execute(request: SignInRequest): Promise<SignInResponse>;
}
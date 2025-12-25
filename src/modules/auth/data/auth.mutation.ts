import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { AuthRepositoryImpl } from "../repository/implementation/AuthRepositoryImpl";
import { AuthSignIn } from "../usecase/implementation/AuthSignIn";
import { AuthRegister } from "../usecase/implementation/AuthRegister";
import type { SignInRequest } from "../domain/req/SignInRequest";
import type { RegisterRequest } from "../domain/req/RegisterRequest";
import type { SignInResponse } from "../domain/res/AuthResponse";
import type { RegisterResponse } from "../domain/res/AuthResponse";
import { ApiError } from "@/core/utils/http/httpClient";

export const useSignInMutation = (
    options?: UseMutationOptions<SignInResponse, ApiError, SignInRequest>
) => {
    const repository = new AuthRepositoryImpl();
    const usecase = new AuthSignIn(repository);

    return useMutation<SignInResponse, ApiError, SignInRequest>({
        mutationFn: (request: SignInRequest) => usecase.execute(request),
        ...options,
    });
};

export const useRegisterMutation = (
    options?: UseMutationOptions<RegisterResponse, ApiError, RegisterRequest>
) => {
    const repository = new AuthRepositoryImpl();
    const usecase = new AuthRegister(repository);

    return useMutation<RegisterResponse, ApiError, RegisterRequest>({
        mutationFn: (request: RegisterRequest) => usecase.execute(request),
        ...options,
    });
};
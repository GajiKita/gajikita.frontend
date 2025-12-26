import { 
  useSignInMutation, 
  useRegisterMutation 
} from '../../data/auth.mutation';
import { SignInRequest } from '../../domain/req/SignInRequest';
import { RegisterRequest } from '../../domain/req/RegisterRequest';
import { SignInResponse, RegisterResponse } from '../../domain/res/AuthResponse';

export const useSignInPresentation = () => {
  const mutation = useSignInMutation();

  return {
    signIn: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};

export const useRegisterPresentation = () => {
  const mutation = useRegisterMutation();

  return {
    register: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};
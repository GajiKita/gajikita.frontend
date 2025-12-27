import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import {
  useSignInMutation,
  useRegisterMutation
} from '../../data/auth.mutation';
import { AuthRepositoryImpl } from '../../repository/implementation/AuthRepositoryImpl';

// Mock the repository
jest.mock('../../repository/implementation/AuthRepositoryImpl');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('Auth Data Layer Tests', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  describe('useSignInMutation', () => {
    it('should sign in user successfully', async () => {
      const mockRequest = {
        walletAddress: '0x123...',
        signature: '0xabc...',
        message: 'I am signing in on Kam, 25 Dec 2025 20:40',
      };
      const mockResponse = {
        access_token: 'jwt-token-here',
        refresh_token: 'refresh-token-here',
        user: {
          id: 'u-123',
          wallet_address: '0x123...',
          role: 'EMPLOYEE',
          email: 'user@example.com',
          created_at: '2025-01-15T10:00:00Z',
          updated_at: '2025-01-15T10:00:00Z',
        },
      };

      const mockRepository = {
        signIn: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as AuthRepositoryImpl;

      (AuthRepositoryImpl as jest.MockedClass<typeof AuthRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useSignInMutation(),
        { wrapper }
      );

      result.current.mutate(mockRequest);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockRepository.signIn).toHaveBeenCalledWith(mockRequest);
    });

    it('should handle error when signing in', async () => {
      const mockRequest = {
        walletAddress: '0x123...',
        signature: '0xabc...',
        message: 'I am signing in on Kam, 25 Dec 2025 20:40',
      };
      const mockError = new Error('Invalid signature or user not found');

      const mockRepository = {
        signIn: jest.fn().mockRejectedValue(mockError),
      } as unknown as AuthRepositoryImpl;

      (AuthRepositoryImpl as jest.MockedClass<typeof AuthRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useSignInMutation(),
        { wrapper }
      );

      result.current.mutate(mockRequest);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });

  describe('useRegisterMutation', () => {
    it('should register user successfully', async () => {
      const mockRequest = {
        walletAddress: '0x456...',
        signature: '0xdef...',
        message: 'I register as EMPLOYEE on Kam, 25 Dec 2025 20:40',
        email: 'newuser@example.com',
        role: 'EMPLOYEE',
      };
      const mockResponse = {
        access_token: 'jwt-token-here',
        refresh_token: 'refresh-token-here',
        user: {
          id: 'u-456',
          wallet_address: '0x456...',
          role: 'EMPLOYEE',
          email: 'newuser@example.com',
          created_at: '2025-01-15T10:00:00Z',
          updated_at: '2025-01-15T10:00:00Z',
        },
      };

      const mockRepository = {
        register: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as AuthRepositoryImpl;

      (AuthRepositoryImpl as jest.MockedClass<typeof AuthRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useRegisterMutation(),
        { wrapper }
      );

      result.current.mutate(mockRequest);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockRepository.register).toHaveBeenCalledWith(mockRequest);
    });

    it('should handle error when registering', async () => {
      const mockRequest = {
        walletAddress: '0x456...',
        signature: '0xdef...',
        message: 'I register as EMPLOYEE on Kam, 25 Dec 2025 20:40',
        email: 'newuser@example.com',
        role: 'EMPLOYEE',
      };
      const mockError = new Error('Invalid signature');

      const mockRepository = {
        register: jest.fn().mockRejectedValue(mockError),
      } as unknown as AuthRepositoryImpl;

      (AuthRepositoryImpl as jest.MockedClass<typeof AuthRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useRegisterMutation(),
        { wrapper }
      );

      result.current.mutate(mockRequest);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });
});
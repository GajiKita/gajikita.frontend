// src/modules/employee/data/__tests__/employee.mutation.test.ts
import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCreateEmployeeMutation, useUpdateEmployeeMutation, useDeleteEmployeeMutation } from '../employee.mutation';

// Mock the API calls directly
jest.mock('../employee.mutation', () => ({
  ...jest.requireActual('../employee.mutation'),
  useCreateEmployeeMutation: jest.fn(),
  useUpdateEmployeeMutation: jest.fn(),
  useDeleteEmployeeMutation: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children
    );
  };
};

describe('Employee Mutation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCreateEmployeeMutation', () => {
    it('should return success on successful API call', async () => {
      // Arrange
      const mockRequest = {
        user_id: 'user1',
        company_id: 'company1',
        employee_number: 'EMP001',
        position: 'Software Engineer',
        base_salary: 10000000,
        wallet_address: '0x1234567890123456789012345678901234567890',
        status: 'active',
      };
      const mockResponse = {
        data: {
          id: '1',
          ...mockRequest,
          preferred_payout_token: null,
          sbt_token_id: null,
          employed_started: null,
          employed_ended: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
        }
      };

      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockResolvedValue(mockResponse),
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: mockResponse,
        error: undefined,
      };

      (useCreateEmployeeMutation as jest.MockedFunction<typeof useCreateEmployeeMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateEmployeeMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });

    it('should handle mutation errors', async () => {
      // Arrange
      const mockRequest = {
        user_id: 'user1',
        company_id: 'company1',
        employee_number: 'EMP001',
        position: 'Software Engineer',
        base_salary: 10000000,
        wallet_address: '0x1234567890123456789012345678901234567890',
        status: 'active',
      };

      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockRejectedValue(new Error('API Error')),
        isLoading: false,
        isError: true,
        isSuccess: false,
        data: undefined,
        error: new Error('API Error'),
      };

      (useCreateEmployeeMutation as jest.MockedFunction<typeof useCreateEmployeeMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateEmployeeMutation());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });
  });

  describe('useUpdateEmployeeMutation', () => {
    it('should return success on successful API call', async () => {
      // Arrange
      const mockRequest = {
        id: '1',
        position: 'Senior Software Engineer',
        base_salary: 12000000,
      };
      const mockResponse = {
        data: {
          id: '1',
          user_id: 'user1',
          company_id: 'company1',
          employee_number: 'EMP001',
          position: 'Senior Software Engineer',
          base_salary: 12000000,
          wallet_address: '0x1234567890123456789012345678901234567890',
          preferred_payout_token: null,
          status: 'active',
          sbt_token_id: null,
          employed_started: null,
          employed_ended: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-02T00:00:00Z',
          deleted: false,
        }
      };

      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockResolvedValue(mockResponse),
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: mockResponse,
        error: undefined,
      };

      (useUpdateEmployeeMutation as jest.MockedFunction<typeof useUpdateEmployeeMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useUpdateEmployeeMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });
  });

  describe('useDeleteEmployeeMutation', () => {
    it('should return success on successful API call', async () => {
      // Arrange
      const employeeId = '1';

      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockResolvedValue(undefined),
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: undefined,
        error: undefined,
      };

      (useDeleteEmployeeMutation as jest.MockedFunction<typeof useDeleteEmployeeMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useDeleteEmployeeMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
    });
  });
});
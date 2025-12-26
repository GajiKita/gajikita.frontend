// src/modules/employee/data/__tests__/employee.query.test.ts
import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEmployeesQuery, useEmployeeQuery } from '../employee.query';

// Mock the API calls directly
jest.mock('../employee.query', () => ({
  ...jest.requireActual('../employee.query'),
  useEmployeesQuery: jest.fn(),
  useEmployeeQuery: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
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

describe('Employee Query Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useEmployeesQuery', () => {
    it('should return data on successful API call', async () => {
      // Arrange
      const mockData = {
        data: [
          {
            id: '1',
            user_id: 'user1',
            company_id: 'company1',
            employee_number: 'EMP001',
            position: 'Software Engineer',
            base_salary: 10000000,
            wallet_address: '0x1234567890123456789012345678901234567890',
            preferred_payout_token: 'ETH',
            status: 'active',
            sbt_token_id: null,
            employed_started: '2024-01-01',
            employed_ended: null,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            deleted: false,
          }
        ],
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1
      };

      const mockQueryResult = {
        data: mockData,
        isLoading: false,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
        queryKey: ['employees', 'list', { page: 1, limit: 10 }],
      };

      (useEmployeesQuery as jest.MockedFunction<typeof useEmployeesQuery>).mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useEmployeesQuery({ page: 1, limit: 10 }));

      // Assert
      expect(result.current.data).toEqual(mockData);
      expect(result.current.isSuccess).toBe(true);
    });

    it('should handle error states', () => {
      // Arrange
      const mockQueryResult = {
        data: undefined,
        isLoading: false,
        isError: true,
        isSuccess: false,
        error: new Error('API Error'),
        refetch: jest.fn(),
        queryKey: ['employees', 'list', { page: 1, limit: 10 }],
      };

      (useEmployeesQuery as jest.MockedFunction<typeof useEmployeesQuery>).mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useEmployeesQuery({ page: 1, limit: 10 }));

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });

    it('should use correct query key', () => {
      // Arrange
      const expectedQueryKey = ['employees', 'list', { page: 1, limit: 10 }];
      const mockQueryResult = {
        data: undefined,
        isLoading: false,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
        queryKey: expectedQueryKey,
      };

      (useEmployeesQuery as jest.MockedFunction<typeof useEmployeesQuery>).mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useEmployeesQuery({ page: 1, limit: 10 }));

      // Assert
      expect(result.current.queryKey).toEqual(expectedQueryKey);
    });
  });

  describe('useEmployeeQuery', () => {
    it('should return employee data on successful API call', () => {
      // Arrange
      const employeeId = '1';
      const mockData = {
        data: {
          id: '1',
          user_id: 'user1',
          company_id: 'company1',
          employee_number: 'EMP001',
          position: 'Software Engineer',
          base_salary: 10000000,
          wallet_address: '0x1234567890123456789012345678901234567890',
          preferred_payout_token: 'ETH',
          status: 'active',
          sbt_token_id: null,
          employed_started: '2024-01-01',
          employed_ended: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
        }
      };

      const mockQueryResult = {
        data: mockData,
        isLoading: false,
        isError: false,
        isSuccess: true,
        error: undefined,
        refetch: jest.fn(),
      };

      (useEmployeeQuery as jest.MockedFunction<typeof useEmployeeQuery>).mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useEmployeeQuery({ id: employeeId }));

      // Assert
      expect(result.current.data).toEqual(mockData);
      expect(result.current.isSuccess).toBe(true);
    });
  });
});
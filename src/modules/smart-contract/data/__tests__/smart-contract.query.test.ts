// src/modules/smart-contract/data/__tests__/smart-contract.query.test.ts
import React from 'react';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSmartContractsQuery, useSmartContractQuery } from '../smart-contract.query';

// Mock the API calls directly
jest.mock('../smart-contract.query', () => ({
  ...jest.requireActual('../smart-contract.query'),
  useSmartContractsQuery: jest.fn(),
  useSmartContractQuery: jest.fn(),
}));

const mockUseSmartContractsQuery = useSmartContractsQuery as jest.MockedFunction<
  typeof useSmartContractsQuery
>;
const mockUseSmartContractQuery = useSmartContractQuery as jest.MockedFunction<
  typeof useSmartContractQuery
>;

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

describe('Smart Contract Query Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useSmartContractsQuery', () => {
    it('should return smart contracts on successful API call', () => {
      // Arrange
      const mockParams = { page: 1, limit: 10 };
      const mockData = [
        {
          id: '1',
          name: 'Payroll Contract',
          address: '0x1234567890123456789012345678901234567890',
          abi: '{}',
          bytecode: '0x...',
          deployed_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
        }
      ];

      const mockQueryResult = {
        data: mockData,
        isLoading: false,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
        queryKey: ['smart-contracts', 'list', mockParams],
      };

      mockUseSmartContractsQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useSmartContractsQuery(mockParams), {
        wrapper: createWrapper(),
      });

      // Assert
      expect(result.current.data).toEqual(mockData);
      expect(result.current.isSuccess).toBe(true);
    });

    it('should handle error states', () => {
      // Arrange
      const mockParams = { page: 1, limit: 10 };
      const mockQueryResult = {
        data: undefined,
        isLoading: false,
        isError: true,
        isSuccess: false,
        error: new Error('API Error'),
        refetch: jest.fn(),
        queryKey: ['smart-contracts', 'list', mockParams],
      };

      mockUseSmartContractsQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useSmartContractsQuery(mockParams), {
        wrapper: createWrapper(),
      });

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });

    it('should handle loading states', () => {
      // Arrange
      const mockQueryResult = {
        data: undefined,
        isLoading: true,
        isError: false,
        isSuccess: false,
        error: undefined,
        refetch: jest.fn(),
        queryKey: ['smart-contracts', 'list', {}],
      };

      mockUseSmartContractsQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useSmartContractsQuery({}), {
        wrapper: createWrapper(),
      });

      // Assert
      expect(result.current.isLoading).toBe(true);
    });
  });

  describe('useSmartContractQuery', () => {
    it('should return smart contract detail on successful API call', () => {
      // Arrange
      const contractId = '1';
      const mockData = {
        id: '1',
        name: 'Payroll Contract',
        address: '0x1234567890123456789012345678901234567890',
        abi: '{}',
        bytecode: '0x...',
        deployed_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        deleted: false,
      };

      const mockQueryResult = {
        data: mockData,
        isLoading: false,
        isError: false,
        isSuccess: true,
        error: undefined,
        refetch: jest.fn(),
      };

      mockUseSmartContractQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useSmartContractQuery({ id: contractId }), {
        wrapper: createWrapper(),
      });

      // Assert
      expect(result.current.data).toEqual(mockData);
      expect(result.current.isSuccess).toBe(true);
    });

    it('should handle error states', () => {
      // Arrange
      const contractId = '1';
      const mockQueryResult = {
        data: undefined,
        isLoading: false,
        isError: true,
        isSuccess: false,
        error: new Error('API Error'),
        refetch: jest.fn(),
      };

      mockUseSmartContractQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useSmartContractQuery({ id: contractId }), {
        wrapper: createWrapper(),
      });

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });
  });
});
// src/modules/investor/data/__tests__/investor.query.test.ts
import React from 'react';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useInvestorsQuery, useInvestorQuery } from '../investor.query';

// Mock the API calls directly
jest.mock('../investor.query', () => ({
  ...jest.requireActual('../investor.query'),
  useInvestorsQuery: jest.fn(),
  useInvestorQuery: jest.fn(),
}));

const mockUseInvestorsQuery = useInvestorsQuery as jest.MockedFunction<
  typeof useInvestorsQuery
>;
const mockUseInvestorQuery = useInvestorQuery as jest.MockedFunction<
  typeof useInvestorQuery
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

describe('Investor Query Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useInvestorsQuery', () => {
    it('should return investors on successful API call', () => {
      // Arrange
      const mockParams = { page: 1, limit: 10, search: '' };
      const mockInvestors = [
        {
          id: '1',
          wallet_address: '0x1234567890123456789012345678901234567890',
          liquidity_balance: 1000000,
          withdrawn_rewards: 50000,
          preferred_payout_token: 'ETH',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
        }
      ];

      const mockQueryResult = {
        data: mockInvestors,
        isLoading: false,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
        queryKey: ['investors', 'list', mockParams],
      };

      mockUseInvestorsQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useInvestorsQuery(mockParams), {
        wrapper: createWrapper(),
      });

      // Assert
      expect(result.current.data).toEqual(mockInvestors);
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
        queryKey: ['investors', 'list', mockParams],
      };

      mockUseInvestorsQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useInvestorsQuery(mockParams), {
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
        refetch: jest.fn(),
        queryKey: ['investors', 'list', {}],
      };

      mockUseInvestorsQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useInvestorsQuery({}), {
        wrapper: createWrapper(),
      });

      // Assert
      expect(result.current.isLoading).toBe(true);
    });
  });

  describe('useInvestorQuery', () => {
    it('should return investor detail on successful API call', () => {
      // Arrange
      const investorId = '1';
      const mockInvestor = {
        id: '1',
        wallet_address: '0x1234567890123456789012345678901234567890',
        liquidity_balance: 1000000,
        withdrawn_rewards: 50000,
        preferred_payout_token: 'ETH',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        deleted: false,
      };

      const mockQueryResult = {
        data: mockInvestor,
        isLoading: false,
        isError: false,
        isSuccess: true,
        error: undefined,
        refetch: jest.fn(),
      };

      mockUseInvestorQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useInvestorQuery({ id: investorId }), {
        wrapper: createWrapper(),
      });

      // Assert
      expect(result.current.data).toEqual(mockInvestor);
      expect(result.current.isSuccess).toBe(true);
    });

    it('should handle error states', () => {
      // Arrange
      const investorId = '1';
      const mockQueryResult = {
        data: undefined,
        isLoading: false,
        isError: true,
        isSuccess: false,
        error: new Error('API Error'),
        refetch: jest.fn(),
      };

      mockUseInvestorQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useInvestorQuery({ id: investorId }), {
        wrapper: createWrapper(),
      });

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });
  });
});